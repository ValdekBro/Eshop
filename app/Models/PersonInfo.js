'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PersonInfo extends Model {
    orders () {
        return this.hasOne('App/Models/Order')
    }
    users () {
        return this.hasOne('App/Models/User')
    }
    companyRepresentatives () {
        return this.hasOne('App/Models/LegalEntityInfo', 'id', 'company_representative_id')
    }
    contactPersons () {
        return this.hasOne('App/Models/LegalEntityInfo', 'id', 'сontact person_id')
    }
}

module.exports = PersonInfo
