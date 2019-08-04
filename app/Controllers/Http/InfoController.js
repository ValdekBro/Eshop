'use strict'

const User = use('App/Models/User');

class InfoController {
    async index({ request, view, response }) {
        // const user = await User.find(2);
        // console.log( (await user.products().withPivot('quantity').fetch()).toJSON() );
        return view.render('in_developing');
    }
}

module.exports = InfoController
