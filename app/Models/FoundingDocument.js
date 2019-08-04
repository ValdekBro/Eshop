'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FoundingDocument extends Model {
    legalEntityInfo () {
        return this.belongsTo('App/Models/LegalEntityInfo', 'legal_entity_info_id')
    }
}

module.exports = FoundingDocument
