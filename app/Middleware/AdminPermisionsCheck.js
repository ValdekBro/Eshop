'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminPermisionsCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth, session }, next) {
    if(auth.user.type == 'person' || auth.user.type == 'legal_entity') {  
      session.put('error_beauti_message', "You are not allowed to access this resource");
      return response.status(401).redirect('/');
    }
    await next()
  }
}

module.exports = AdminPermisionsCheck
