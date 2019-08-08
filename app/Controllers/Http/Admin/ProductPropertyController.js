'use strict'

const ProductProperty = use('App/Models/ProductProperty');
const Product = use('App/Models/Product');

class AdminController {

	async index({ request, response, view }) {
	}

	async create({ request, response, view }) {
	}

	async store({ request, session, response }) {

		try {
			const { id, caption, value } = request.all();
			if (!id) {
				session.put('error_beauti_message', "Parameters not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let product = await Product
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product not found");
					throw e;
				});

			let property = new ProductProperty;
			if(caption) property.caption = caption;
			if(value) property.value = value;

			await product
				.properties()
				.save(property)
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to save product property");
					throw e;
				});

			response.status(202).send('Product property successfully created');
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
			const { id, caption, value } = request.all();

			if (!id) {
				session.put('error_beauti_message', "Parameters not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let property = await ProductProperty
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Product property not found");
					throw e;
				});

			if(caption) property.caption = caption;
			if(value) property.value = value;
			await property
				.save()
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to update product property");
					throw e;
				});

			return response.status(202).send('Product property successfully updated');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}

	}


	async destroy({ params, request, session, response }) {
		try {
			const { id } = request.all();

			if (!id) {
				session.put('error_beauti_message', "Parameters not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let property = await ProductProperty.find(id);
			if (!property) {
				session.put('error_beauti_message', "Product Property not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			await property
				.delete()
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to delete product property");
					throw e;
				});

			return response.status(202).send('Product property successfully deleted');
		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}

	}

}

module.exports = AdminController
