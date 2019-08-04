'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderProduct extends Model {
    order () {
        return this.belongsTo('App/Models/Order', 'order_id')
    }
    product () {
        return this.belongsTo('App/Models/Product', 'product_id')
    }
}

module.exports = OrderProduct
