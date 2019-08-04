'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTimestampsSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.timestamps();
    });
    this.alter('user_products', (table) => {
      table.timestamps();
    });
    this.alter('user_news', (table) => {
      table.timestamps();
    });
    this.alter('templates', (table) => {
      table.timestamps();
    });
    this.alter('template_properties', (table) => {
      table.timestamps();
    });
    this.alter('shop_news', (table) => {
      table.timestamps();
    });
    this.alter('product_template_properties', (table) => {
      table.timestamps();
    });
    this.alter('products', (table) => {
      table.timestamps();
    });
    this.alter('product_images', (table) => {
      table.timestamps();
    });
    this.alter('person_infos', (table) => {
      table.timestamps();
    });
    this.alter('orders', (table) => {
      table.timestamps();
    });
    this.alter('order_products', (table) => {
      table.timestamps();
    });
    this.alter('new_news', (table) => {
      table.timestamps();
    });
    this.alter('legal_entity_infos', (table) => {
      table.timestamps();
    });
    this.alter('infos', (table) => {
      table.timestamps();
    });
    this.alter('founding_documents', (table) => {
      table.timestamps();
    });
    this.alter('faq_units', (table) => {
      table.timestamps();
    });
    this.alter('discount_news', (table) => {
      table.timestamps();
    });
    this.alter('delivery_details', (table) => {
      table.timestamps();
    });
    this.alter('categories', (table) => {
      table.timestamps();
    });
  }

  down () {
    this.table('timestamps', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CreateTimestampsSchema
