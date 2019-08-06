'use strict'

const User = use('App/Models/User')
const PersonInfo = use('App/Models/PersonInfo')
const DeliveryDetail = use('App/Models/DeliveryDetail')

class UserController {
    async store({ request, auth, session, response }) {
        
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
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to save Delivery details data");
                    console.error(e);
                });
                
            let person_info = new PersonInfo;
            person_info.name = name;
            person_info.surname = surname;
            person_info.middle_name = middle_name;
            person_info.phone_number = phone_number;
            person_info.address = address;
            await person_info
                .save()
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to save Person info data");
                    console.error(e);
                });

            let user = new User;
            user.type=type;
            user.email=email;                         
            user.password = password;
            await delivery_detail
                .user()
                .save(user)
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to save User data");
                    console.error(e);
                });
            await person_info
                .user()
                .save(user)
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.sqlMessage);
                    session.put('error_beauti_message', "Failed to save User data");
                    console.error(e);
                });

            await auth
                .attempt(email, password)
                .catch( function(e) {
                    session.put('error', e.toString());
                    session.put('error_code', e.code);
                    session.put('error_message', e.massage);
                    session.put('error_beauti_message', "Failed to Authenficate User");
                    console.error(e);
                    response.redirect('/');
                });

        } else if(type == 'legal_entity') {

            // TODO : make legal entity store method
            return response.send('Legal entity registration is not allowed yet')

        }
        
        return response.redirect('/home');
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

    async login({ request, auth, session, response }) {
        const { email, password } = request.all();
        const success = await auth
            .attempt(email, password)
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.massage);
                session.put('error_beauti_message', "Failed to Authenficate User");
                console.error(e);
            });
        if(success) {
            if(auth.user.type == 'person' || auth.user.type == 'legal_entity') 
                return response.redirect('/home');
            else 
                return response.redirect('/administration');
        }
        else 
            return response.redirect('/');
    }

    async logout({ request, auth, session, response }) {
        await auth
            .logout()
            .catch( function(e) {
                session.put('error', e.toString());
                session.put('error_code', e.code);
                session.put('error_message', e.massage);
                session.put('error_beauti_message', "Failed to Logout User");
                console.error(e);
            });
        return response.redirect('/');
    }
}

module.exports = UserController
