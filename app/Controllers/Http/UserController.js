'use strict'

const User = use('App/Models/User')
const PersonInfo = use('App/Models/PersonInfo')
const DeliveryDetail = use('App/Models/DeliveryDetail')

class UserController {
    async store({ request, view, response }) {
        const { type } = request.all();
        if(type == 'person') {
            const { 
                email, password, name, surname, middle_name, phone_number, address, region, 
                service, post_office, large_order_post_office, delivery_by_address 
            } = request.all();
            
            let delivery_detail = new DeliveryDetail;
            delivery_detail.region = region;
            delivery_detail.service = service;
            delivery_detail.post_office = post_office;
            delivery_detail.large_order_post_office = large_order_post_office;
            delivery_detail.delivery_by_address = delivery_by_address;
            await delivery_detail
                .save()
                // .catch( err => { return response.status(err.status).send(err.message) });
                
            let person_info = new PersonInfo;
            person_info.name = name;
            person_info.surname = surname;
            person_info.middle_name = middle_name;
            person_info.phone_number = phone_number;
            person_info.address = address;
            await person_info
                .save()

            let user = new User;
            user.type=type;
            user.email=email;                         
            user.password = password;
            await delivery_detail
                .user()
                .save(user);
            await person_info
                .user()
                .save(user);


        } else if(type == 'legal_entity') {
            // TODO : make legal entity store method
        } else {

        }
        response.redirect('/login');
    }
    async show({ request, view, response }) {

        return view.render('in_developing');
    }
    async edit({ request, view, response }) {

        return view.render('in_developing');
    }
    async update({ request, view, response }) {

        return view.render('in_developing');
    }
    async login({ request, auth, response }) {
        const { email, password } = request.all();
        try { await auth.attempt(email, password); } catch(e) { return response.send('Error' + e.message) }
        return response.redirect('/home');
    }
    async logout({ request, auth, response }) {
        await auth.logout();
        return response.redirect('/');
        // return response.send('OK');
    }
}

module.exports = UserController
