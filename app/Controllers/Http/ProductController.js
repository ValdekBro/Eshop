'use strict'

const Category = use('App/Models/Category');


class ProductController {
    async index({ request, params, view, session, response }) { try {
            const category = await Category.find(params.category)
            if (!category) {
                session.put('error_beauti_message', "Category not found");
				console.error(session.get('error_beauti_message'));
				return response.status(404).send(session.get('error_beauti_message'));
            }

            const products = await category
                .products()
                .fetch()
                .catch( e => {
                    session.put('error_beauti_message', "Failed to load Products data");
                    throw e;
                });

            return view.render('product.list', {
                category: category.toJSON(),
                products: products.toJSON()
            });

        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).redirect('/catalog');
        }
    }
    async show({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = ProductController
