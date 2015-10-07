import raven from 'raven';

const { SENTRY_DSN } = process.env;

/**
 * ErrorHandler Module
 * @type {Object}
 */
let ErrorHandler = {

  /**
   * Initialize the ErrorHandler's client
   */
  init() {
    if (SENTRY_DSN) {
      ErrorHandler.client = new raven.Client(SENTRY_DSN);
    }
  },

  /**
   * Capture an error to exception handlers
   * @param  {Object}   error    Error Object
   * @param  {Function} callback Callback which gets the error
   */
  capture(error, callback) {
    ErrorHandler.print(error);

    if (ErrorHandler.client) {
      ErrorHandler.client.captureException(error);
    }

    if (typeof callback === 'function') {
      callback(error);
    }
  },

  /**
   * Print an error to the console
   * @param  {Object} error Error Object
   */
  print(error) {
    console.error('== Application Error ==');
    console.error(` Code: ${error.code}`);
    console.error(` ${error.stack}`);
  }

};

export default ErrorHandler;
