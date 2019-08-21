'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TemplateProperty extends Model {
    static boot() {
        super.boot()
        this.addTrait('Transformer')
    }

    products() {
        return this
            .belongsToMany('App/Models/Product')
            .pivotModel('App/Models/ProductTemplateProperty')
    }
    template() {
        return this.belongsTo('App/Models/Template', 'template_id')
    }
}

module.exports = TemplateProperty
