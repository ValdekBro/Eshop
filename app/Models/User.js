'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
	super.boot()

	this.addHook('beforeSave', async (userInstance) => {
	  if (userInstance.dirty.password) {
		userInstance.password = await Hash.make(userInstance.password)
	  }
	})
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
	tokens () {	
		return this.hasMany('App/Models/Token')
	}

	orders () {
		return this.hasMany('App/Models/Order')
	}
	products () {
                return this
                .belongsToMany('App/Models/Product', 'user_id', 'product_id', 'id', 'id')
                .pivotModel('App/Models/UserProduct')
        }
	userNews () {
        return this.hasMany('App/Models/UserNew')
	}
	personInfo () {
        return this.belongsTo('App/Models/PersonInfo', 'person_info_id')
	}
	legalEntityInfo () {
        return this.belongsTo('App/Models/LegalEntityInfo', 'legal_entity_info_id')
	}
	deliveryDetail () {
        return this.belongsTo('App/Models/DeliveryDetail', 'delivery_details_id')
        }
}

module.exports = User
