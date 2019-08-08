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
				
				let properties = await transform
					.collection(template_properties.toJSON(), 'ProductPropertyTransformer')
					.catch(function (e) {
						session.put('error_beauti_message', "Failed to transform template properties");
						throw e;
					});	

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

	async show({ params, request, response, view }) {
	}

	async edit({ params, request, response, view }) {
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

			return response.status(202).send('Template successfully updated');

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
