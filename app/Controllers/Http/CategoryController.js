'use strict'

class CategoryController {
    async index({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = CategoryController
