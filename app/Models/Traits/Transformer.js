'use strict'

const ProductProperty = use('App/Models/ProductProperty');

class Transformer {
	register(Model, customOptions = {}) {
		const defaultOptions = {}
		const options = Object.assign(defaultOptions, customOptions)

		Model.prototype.makeProductProperty = function () {
			let product_porperty = new ProductProperty;
			
			product_porperty.product_id = this.product_id || null;
			product_porperty.caption = this.caption || null;
			product_porperty.value = this.value || null;
			product_porperty.created_at = null;
			product_porperty.updated_at = null;
			
			return product_porperty;
		}

	}
}

module.exports = Transformer
