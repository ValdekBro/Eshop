'use strict'

const User = use('App/Models/User')
const PersonInfo = use('App/Models/PersonInfo')
const DeliveryDetail = use('App/Models/DeliveryDetail')

class UserController {
    async store({ request, auth, session, response }) { try {
            const { type } = request.all();
            if (type == 'person') {
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
                    .catch(e => {
                        session.put('error_beauti_message', "Failed to save Delivery details data");
                        throw e;
                    });

                let person_info = new PersonInfo;
                person_info.name = name;
                person_info.surname = surname;
                person_info.middle_name = middle_name;
                person_info.phone_number = phone_number;
                person_info.address = address;
                await person_info
                    .save()
                    .catch(e => {
                        session.put('error_beauti_message', "Failed to save Person info data");
                        throw e;
                    });

                let user = new User;
                user.type = type;
                user.email = email;
                user.password = password;
                await delivery_detail
                    .user()
                    .save(user)
                    .catch(e => {
                        session.put('error_beauti_message', "Failed to save User data");
                        throw e;
                    });
                await person_info
                    .user()
                    .save(user)
                    .catch(e => {
                        session.put('error_beauti_message', "Failed to save User data");
                        throw e;
                    });

                await auth
                    .attempt(email, password)
                    .catch(e => {
                        session.put('error_beauti_message', "Failed to Authenficate User");
                        throw e;
                    });

            } else if (type == 'legal_entity') {

                // TODO : make legal entity store method
                session.put('error_beauti_message', "Legal entity registration is not allowed yet");
                return response.status(400).send(session.get('error_beauti_message'));

            }

            return response.status(202).redirect('/home');

        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).redirect('/');;
        }
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

    async login({ request, auth, session, response }) { try {
            const { email, password } = request.all();
            const success = await auth
                .attempt(email, password)
                .catch( e => {
                    session.put('error_beauti_message', "Failed to Authenficate User");
                    throw e;
                });
            if (success) {
                if (auth.user.type == 'person' || auth.user.type == 'legal_entity')
                    return response.redirect('/home');
                else
                    return response.redirect('/administration');
            }
            else
                return response.redirect('/');
        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).redirect('/');;
        }
    }

    async logout({ request, auth, session, response }) { try {
            await auth
                .logout()
                .catch( e => {
                    session.put('error_beauti_message', "Failed to Logout User");
                    throw e;
                });
            return response.redirect('/');
        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).redirect('/');;
        }
    }
}

module.exports = UserController
