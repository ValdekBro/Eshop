'use strict'

const User = use('App/Models/User');

class InfoController {
    async index({ request, view, response }) {

        if (request.url() =='/FAQ') {



        } else if(request.url() =='/info') {

            

        }

        return view.render('in_developing');
    }
}

module.exports = InfoController
