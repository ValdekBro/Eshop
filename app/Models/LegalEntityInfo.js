'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LegalEntityInfo extends Model {
	foundingDocuments () {
		return this.hasMany('App/Models/FoundingDocument')
	}
	user () {
		return this.hasOne('App/Models/User')
	}
	companyRepresentative () {
		return this.belongsTo('App/Models/PersonInfo', 'company_representative_id')
	}
	contactPerson () {
		return this.belongsTo('App/Models/PersonInfo', 'сontact person_id')
	}
}

module.exports = LegalEntityInfo
