'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Template = use('App/Models/Template');

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
	async index({ request, response, view }) {

		const templates = await Template
			.query()
			.with('templateProperties')
			.fetch()
			.catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to load templates");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
			
			view.render('admin.template.list', { templates : templates.toJSON() });
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
	async store({ request, response }) {
		let template = new Template;
		await template
			.save()
			.catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to create template");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
            });
		return response.status(202).send('Template successfully created');
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
	async update({ params, request, response }) {
		const { id, name } = request.all();

		if(!id || !name) {
			session.put('error_beauti_message', "Parameters not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send( session.get('error_beauti_message'));
		}

		let template = await Template.find(id);
		if(!template) {
			session.put('error_beauti_message', "Template not found");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send( session.get('error_beauti_message'));
		}

		template.name = name;
		await template
			.save()
			.catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to update template");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
			});
			
		return response.status(202).send('Template successfully updated');
	}

	/**
	 * Delete a template with id.
	 * DELETE templates/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const { id } = request.all();

		if(!id ) {
			session.put('error_beauti_message', "Parameters not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send( session.get('error_beauti_message'));
		}

		let template = await Template.find(id);
		if(!template) {
			session.put('error_beauti_message', "Template not founded");
            console.error(session.get('error_beauti_message'));
            return response.status(404).send( session.get('error_beauti_message'));
		}

		await template
			.delete()
			.catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to delete template");
                console.error(e);
                return response.status(404).send( session.get('error_beauti_message') + '. ' + session.get('error_message') )
			});
			
		return response.status(202).send('Template successfully deleted');

	}
}

module.exports = TemplateController
