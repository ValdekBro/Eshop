'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ProductProperty = use('App/Models/ProductProperty');
const Product = use('App/Models/Product');
const Template = use('App/Models/Template');
const TemplateProperty = use('App/Models/TemplateProperty');
const ProductPropertyTransformer = use('App/Transformers/ProductPropertyTransformer')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {

	async index({ request, response, view }) {
	}

	async create({ request, response, view }) {
		try {
			return view.render('admin.product.form');
		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).redirect('administration/products');
		}
	}

	async store({ request, session, response, transform }) {
		try {

			const { category_id, template_id, code, name, price, description } = request.all();

			let product = new Product;
			if (category_id && code && price) {
				product.category_id = category_id;
			} else if (category_id) session.put('error_beauti_message', "Cant update category id without product code and price");
			if (code) product.code = code;
			if (price) product.price = price;
			if (name) product.name = name;
			if (description) product.description = description;

			await product
				.save()
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to create product");
					throw e;
				});

			if (template_id) {
				const template = await Template
					.findOrFail(template_id)
					.catch(function (e) {
						session.put('error_beauti_message', "Template not found");
						throw e;
					});

				const template_properties = await template
					.templateProperties()
					.fetch()
					.catch(function (e) {
						session.put('error_beauti_message', "Failed to load template properties");
						throw e;
					});
				
				// const properties = await transform
				// 	.collection(template_properties.toJSON(), 'ProductPropertyTransformer')
				// 	.catch(function (e) {
				// 		session.put('error_beauti_message', "Failed to transform template properties");
				// 		throw e;
				// 	});	
				let properties = template_properties.rows.map( property => {
					return property.makeProductProperty();
				})
				
				await product
					.properties()
					.saveMany(properties)
					.catch(function (e) {
						session.put('error_beauti_message', "Failed to save product properties");
						throw e;
					});
			}

			response.status(202).send('Product successfully created');

		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async copy({ params, request, session, response, transform }) {
		try {

			const id = params.id;
			if (!id) {
				session.put('error_beauti_message', "Parameter ID, not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let product = await Product
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product not found");
					throw e;
				});
			product.id = undefined;
			let new_product = new Product;
			new_product.merge(product.toJSON());

			await new_product
				.save()
				.catch(e => {
					session.put('error_beauti_message', "Failed to save new product");
					throw e;
				});
		
			return response.status(202).redirect(`/administration/product/${new_product.id}/edit`);

		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async show({ params, request, session, response, view }) {
		try {
			const id = params.id;
			if (!id) {
				session.put('error_beauti_message', "Parameter ID, not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const product = await Product
				.query()
				.where('id', id)
				.with('properties')
				.first()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load product data");
					throw e;
				});
			return view.render('admin.product.card', { product : product.toJSON() });
		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).redirect('/administration/products');
		}
	}

	async edit({ params, request, response, view }) {
		try {
			const id = params.id;
			if (!id) {
				session.put('error_beauti_message', "Parameter ID, not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const product = await Product
				.query()
				.where('id', id)
				.with('properties')
				.first()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load product data");
					throw e;
				});
			return view.render('admin.product.form', { product : product.toJSON() });
		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).redirect('/administration/products');
		}
	}

	async update({ params, request, session, response }) {
		try {
			const { id, category_id, code, name, price, description } = request.all();

			if (!id) {
				session.put('error_beauti_message', "Parameter ID, not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let product = await Product
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product not found");
					throw e;
				});

			if (code) product.code = code;
			if (price) product.price = price;
			if (category_id) {
				if (product.code && product.price) product.category_id = category_id;
				else session.put('error_beauti_message',
					"Cant update category id without product code and price");
			}
			if (name) product.name = name;
			if (description) product.description = description;

			await product
				.save()
				.catch(e => {
					session.put('error_beauti_message', "Failed to update product");
					throw e;
				});

			return response.status(202).send('Product successfully updated');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400)
				.send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	async destroy({ params, request, session, response }) {
		try {

			const { id } = request.all();

			if (!id) {
				session.put('error_beauti_message', "Parameter ID not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let product = await Product
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product not found");
					throw e;
				});

			await product
				.delete()
				.catch( e => {
					session.put('error_beauti_message', "Failed to delete product");
					throw e;
				});

			return response.status(202).send('Product successfully deleted');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400)
				.send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}
}

module.exports = ProductController
