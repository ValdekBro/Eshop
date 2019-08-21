'use strict'

const ProductProperty = use('App/Models/ProductProperty');
const TempalteProperty = use('App/Models/TempalteProperty');

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

		Model.prototype.makeTemplateProperty = function () {
			let template_property = new TempalteProperty;
			
			template_property.template_id = this.template_id || null;
			template_property.caption = this.caption || null;
			template_property.created_at = null;
			template_property.updated_at = null;
			
			return template_property;
		}

	}
}

module.exports = Transformer
