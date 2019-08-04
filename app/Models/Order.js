'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    products () {
        return this
            .belongsToMany('App/Models/Product')
            .pivotModel('App/Models/OrderProduct')
    }
    user () {
        return this.belongsTo('App/Models/User', 'user_id')
    }
    deliveryDetails () {
        return this.belongsTo('App/Models/DeliveryDetails', 'delivery_details_id')
    }
    personInfo () {
        return this.belongsTo('App/Models/PersonInfo', 'person_info_id')
    }
}

module.exports = Order
