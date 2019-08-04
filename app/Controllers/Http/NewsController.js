'use strict'

class NewsController {
    async index({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = NewsController
