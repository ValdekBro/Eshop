'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    productImages () {
        return this.hasMany('App/Models/ProductImage')
    }
    newNews () {
        return this.hasMany('App/Models/NewNew')
    }
    users () {
        return this
            .belongsToMany('App/Models/User')
            .pivotModel('App/Models/UserProduct')
    }
    orders () {
        return this
            .belongsToMany('App/Models/Order')
            .pivotModel('App/Models/OrderProduct')
    }
    properties () {
        return this.hasMany('App/Models/ProductProperty')
    }
    category () {
        return this.belongsTo('App/Models/Category', 'category_id')
    }
}

module.exports = Product
