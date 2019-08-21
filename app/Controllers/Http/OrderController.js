'use strict'

const User = use('App/Models/User');
const Database = use('Database')

class OrderController {
    async index({ request, view, session, response }) {

        return view.render('in_developing');
    }
    async edit({ request, view, auth, session, response }) {
        try {

            const user = await User
                .findOrFail(auth.user.id)
                .catch(function (e) {
                    session.put('error_beauti_message', "User not found");
                    throw e;
                });

            const delivery_details = await user
                .deliveryDetail()
                .fetch()
                .catch(function (e) {
                    session.put('error_beauti_message', "User delivery details not founded");
                    throw e;
                });

            const legal_entity_data = await user
                .legalEntityInfo()
                .fetch();
            const company_representative = null;
            if (legal_entity_data) {
                company_representative = await legal_entity_data
                    .companyRepresentative()
                    .fetch()
                    .catch(function (e) {
                        session.put('error_beauti_message', "Company representative not founded");
                        throw e;
                    });
            }

            return view.render('order.form', {
                user_type: user.type,
                delivery_details: delivery_details.toJSON(),
                company_representative: company_representative ? company_representative.toJSON() : null
            });

        } catch (e) {
            session.put('error', e.toString());
            session.put('error_code', e.code);
            session.put('error_message', e.sqlMessage);
            console.error(e);
            return response.status(400).rendirect('/cart');
        }
    }
    async show({ request, view, response }) {

        return view.render('in_developing');
    }
    async store({ request, view, response }) {

        return view.render('in_developing');
    }
    async copy({ request, view, response }) {

        return view.render('in_developing');
    }
}

module.exports = OrderController
