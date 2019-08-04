'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DeliveryDetail extends Model {
    order () {
        return this.hasOne('App/Models/Order')
    }

    user () {
        return this.hasOne('App/Models/User', 'id', 'delivery_details_id')
    }
}

module.exports = DeliveryDetail
