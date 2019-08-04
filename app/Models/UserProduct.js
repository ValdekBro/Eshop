'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserProduct extends Model {
    user () {
        return this.belongsTo('App/Models/User','user_id')
    }
    product () {
        return this.belongsTo('App/Models/Product', 'product_id')
    }
}

module.exports = UserProduct
