'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductProperty extends Model {
    static boot() {
        super.boot()
        this.addTrait('Transformer')
    }
    
    product() {
        return this.belongsTo('App/Models/Product', 'product_id')
    }
}

module.exports = ProductProperty
