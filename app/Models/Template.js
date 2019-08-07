'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Template extends Model {
    templateProperties () {
        return this.hasMany('App/Models/TemplateProperty', 'id', 'template_id')
    }
    category () {
        return this.belongsTo('App/Models/Category', 'category_id')
    }
}

module.exports = Template
