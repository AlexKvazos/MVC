/**
 * Sample Middleware
 *
 * @description Example middleware
 */

export default {

  /**
   * Apply middleware to all routes
   * @type {Boolean}
   */
  global: false,


  handler(req, res, next) {
    // do something with the request...
    next();
  }

};
