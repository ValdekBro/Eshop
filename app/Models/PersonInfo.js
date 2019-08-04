'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PersonInfo extends Model {
    orders () {
        return this.hasMany('App/Models/Order')
    }
    users () {
        return this.hasMany('App/Models/User')
    }
    companyRepresentative () {
        return this.hasMany('App/Models/LegalEntityInfo', 'id', 'company_representative_id')
    }
    contactPerson () {
        return this.hasMany('App/Models/LegalEntityInfo', 'id', 'сontact person_id')
    }
}

module.exports = PersonInfo
