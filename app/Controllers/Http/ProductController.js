'use strict'

class ProductController {
    async index({ request, view, response }) {

        return view.render('in_developing');
    }
    async show({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = ProductController
