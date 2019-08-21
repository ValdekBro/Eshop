'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Template = use('App/Models/Template');
const Product = use('App/Models/Product');

/**
 * Resourceful controller for interacting with templates
 */
class TemplateController {
	/**
	 * Show a list of all templates.
	 * GET templates
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, session, view }) {
		try {

			const templates = await Template
				.query()
				.with('templateProperties')
				.fetch()
				.catch(e => {
					session.put('error_beauti_message', "Failed to load templates");
					throw e;
				});

			if (request.ajax())
				return response.send(templates.toJSON());
			else
				return view.render('admin.template.list', { templates: templates.toJSON() });

		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);

			if (request.ajax())
				return response.status(400)
					.send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
			else
				return response.status(400)
					.send(session.get('error_beauti_message') + '. ' + session.get('error_message'))
					.redirect('/administration');

		}

	}

	/**
	 * Render a form to be used for creating a new template.
	 * GET templates/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async create({ request, response, view }) {
	}

	/**
	 * Create/save a new template.
	 * POST templates
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, session, response }) {
		try {
			const { category_id, product_id } = request.all();

			let template = new Template;
			if (category_id) template.category_id = category_id;

			await template
				.save()
				.catch(e => {
					session.put('error_beauti_message', "Failed to create template");
					throw e;
				});

			if (product_id) {
				const product = await Product
					.findOrFail(product_id)
					.catch(function (e) {
						session.put('error_beauti_message', "Product not found");
						throw e;
					});

				const product_properties = await product
					.properties()
					.fetch()
					.catch(function (e) {
						session.put('error_beauti_message', "Product properties not found");
						throw e;
					});

				const template_properties = product_properties.rows.map(property => {
					return property.makeTemplateProperty();
				})
				
				await template
					.templateProperties()
					.saveMany(template_properties)
					.catch(function (e) {
						session.put('error_beauti_message', "Failed to save template properties");
						throw e;
					});

			}

			return response.status(202).send('Template successfully created');
		} catch (e) {
			session.put('error', e.toString());
			session.put('error_code', e.code);
			session.put('error_message', e.sqlMessage);
			console.error(e);
			return response.status(400)
				.send(session.get('error_beauti_message') + '. ' + session.get('error_message'));
		}
	}

	/**
	 * Display a single template.
	 * GET templates/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
	}

	/**
	 * Render a form to update an existing template.
	 * GET templates/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async edit({ params, request, response, view }) {
	}

	/**
	 * Update template details.
	 * PUT or PATCH templates/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, session, response }) {
		try {
			const { id, name } = request.all();

			if (!id || !name) {
				session.put('error_beauti_message', "Parameters not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
			}

			let template = await Template
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Template not found");
					throw e;
				});

			template.name = name;
			await template
				.save()
				.catch(e => {
					session.put('error_beauti_message', "Failed to update template");
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

	/**
	 * Delete a template with id.
	 * DELETE templates/:id
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

			let template = await Template
				.findOrFail(id)
				.catch(function (e) {
					session.put('error_beauti_message', "Template not found");
					throw e;
				});

			await template
				.delete()
				.catch(e => {
					session.put('error_beauti_message', "Failed to delete template");
					throw e;
				});

			return response.status(202).send('Template successfully deleted');
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

module.exports = TemplateController
