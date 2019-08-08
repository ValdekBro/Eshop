'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index({ request, view, session, response }) {
        try {
            const categories = await Category.all()
                .catch( e => {
                    session.put('error_beauti_message', "Failed to load Categories data");
                    throw e;
                });
            return view.render('product.catalog', { categories: categories.toJSON() });
        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).rendirect('/home');
        }

    }
}
module.exports = CategoryController
