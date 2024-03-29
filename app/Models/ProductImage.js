'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductImage extends Model {
    product () {
        return this.belongsTo('App/Models/Product', 'product_id')
    }
}

module.exports = ProductImage
