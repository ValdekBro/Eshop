'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PersonInfo extends Model {
    order () {
        return this.hasOne('App/Models/Order')
    }
    user () {
        return this.hasOne('App/Models/User', 'id', 'person_info_id')
    }
    companyRepresentative () {
        return this.hasOne('App/Models/LegalEntityInfo', 'id', 'company_representative_id')
    }
    contactPerson () {
        return this.hasOne('App/Models/LegalEntityInfo', 'id', 'сontact person_id')
    }
}

module.exports = PersonInfo
