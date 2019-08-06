'use strict'

class NewsController {
    async index({ request, view, session, response }) {

        return view.render('home');
    }
}

module.exports = NewsController
