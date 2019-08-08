'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TemplateProperty = use('App/Models/TemplateProperty');
const Template = use('App/Models/Template');


/**
 * Resourceful controller for interacting with templateproperties
 */
class TemplatePropertyController {
	/**
	 * Show a list of all templateproperties.
	 * GET templateproperties
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
	}

	/**
	 * Render a form to be used for creating a new templateproperty.
	 * GET templateproperties/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async create({ request, response, view }) {
	}

	/**
	 * Create/save a new templateproperty.
	 * POST templateproperties
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, session, response }) {

		try {
			const { id } = request.all();
			if (!id) {
				session.put('error_beauti_message', "Parameters not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			const template = await Template
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Template not found");
					throw e;
				});

			let property = new TemplateProperty;

			await template
				.templateProperties()
				.save(property)
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to save template property");
					throw e;
				});

			response.status(202).send('Template property successfully created');
		}
		catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	/**
	 * Display a single templateproperty.
	 * GET templateproperties/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
	}

	/**
	 * Render a form to update an existing templateproperty.
	 * GET templateproperties/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async edit({ params, request, response, view }) {
	}

	/**
	 * Update templateproperty details.
	 * PUT or PATCH templateproperties/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, session, response }) {
		try {
			const { id, caption } = request.all();

			if (!id || !caption) {
				session.put('error_beauti_message', "Parameters not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let property = await TemplateProperty
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Template property not found");
					throw e;
				});

			property.caption = caption;
			await property
				.save()
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to update template");
					throw e;
				});

			return response.status(202).send('Template property successfully updated');

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}

	}

	/**
	 * Delete a templateproperty with id.
	 * DELETE templateproperties/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, session, response }) {
		try {
			const { id } = request.all();

			if (!id) {
				session.put('error_beauti_message', "Parameters not founded");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let property = await TemplateProperty
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Template property not found");
					throw e;
				});

			await property
				.delete()
				.catch(function (e) {
					session.put('error_beauti_message', "Failed to delete template property");
					throw e;
				});

			return response.status(202).send('Template property successfully deleted');
		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400).send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}

	}
}

module.exports = TemplatePropertyController
