'use strict'

class CartController {
    async index({ request, view, response }) {

        return view.render('in_developing');
    }
    async insert({ request, response }) {

        return response.send('In delevoping');
    }
    async remove({ request, response }) {

        return response.send('In delevoping');
    }
    async increase({ request, response }) {

        return response.send('In delevoping');
    }
    async reduce({ request, response }) {

        return response.send('In delevoping');
    }
}

module.exports = CartController
