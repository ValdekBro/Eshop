'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductTemplateProperty extends Model {
    templateProperty () {
        return this.belongsTo('App/Models/TemplateProperty', 'template_property_id')
    }
    product () {
        return this.belongsTo('App/Models/Product', 'product_id')
    }
}

module.exports = ProductTemplateProperty
