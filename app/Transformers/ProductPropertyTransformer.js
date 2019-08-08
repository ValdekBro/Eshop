'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ProductProperty = use('App/Models/ProductProperty');
/**
 * ProductPropertyTransformer class
 *
 * @class ProductPropertyTransformer
 * @constructor
 */
class ProductPropertyTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    let product_porperty = new ProductProperty;
    product_porperty.product_id = model.product_id || null;
    product_porperty.caption = model.caption || null;
    product_porperty.value = model.value || null;
    product_porperty.created_at = null;
    product_porperty.updated_at = null;
    
    return product_porperty;
  }
}

module.exports = ProductPropertyTransformer
