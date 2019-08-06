'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index({ request, view, session, response }) {
        const categories = await Category.all()
        .catch( function(e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            session.put('error_beauti_message', "Failed to load Categories data");
            console.error(e);
            response.redirect('/');
        });
    return view.render('product.catalog', { categories : categories.toJSON() });
    }
}

module.exports = CategoryController
