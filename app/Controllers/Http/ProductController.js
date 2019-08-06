'use strict'

const Category = use('App/Models/Category');


class ProductController {
    async index({ request, params, view, session, response }) {
        const category = await Category
            .find(params.category)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to find Category data");
                console.error(e);
                response.redirect('/catalog');
            });
        if(!category) return response.status(404).send('Failed to find Category data')   

        const products = await category
            .products()
            .fetch()
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.sqlMessage);
                session.put('error_beauti_message', "Failed to load Products data");
                console.error(e);
                response.redirect('/catalog');
            }); 
            
        // return view.render('product.catalog', { categories : categories.toJSON() });
        return view.render('product.list',  { 
            category : category.toJSON(),
            products : products.toJSON()
        });
    }
    async show({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = ProductController
