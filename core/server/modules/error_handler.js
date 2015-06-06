/**
 * ErrorHandler Module
 *
 * @description Used to capture errors into an exception logger, database
 * or any service.
 */

import raven from 'raven';

let ravenClient = null;

// initialize raven client if key is provided
if (process.env.SENTRY_DSN) {
  ravenClient = new raven.Client(process.env.SENTRY_DSN);
}



// export the ErrorHandler object
let ErrorHandler = {};



/**
 * Capture an error to the sentry service
 * @param  {Object}   error    Error object
 * @param  {Function} callback Callback to execute and pass error
 */
ErrorHandler.capture = (error, callback) => {

  // print the error to console
  ErrorHandler.print(error);

  // capture error to ravenClient
  if (ravenClient) ravenClient.captureError(error);

  // if callback is sent, call it and pass error
  if (typeof callback === 'function') { callback(error); }

};




/**
 * Print an error to the console
 * @param  {Object} error Error object
 */
ErrorHandler.print = (error) => {
  console.error('== Application Error ==');
  console.error(' Code: ' + error.code);
  console.error(' ' + error.stack);
};




/**
 * Express error handler
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @param  {Function} next Call next middleware function
 * @param  {Object}   err  Error object
 */
ErrorHandler.express = (err, req, res, next) => {

  // send error information to the client
  res.status(500);
  res.send(JSON.stringify(err));

  // capture the error to exception registry
  ErrorHandler.capture(err);
  return next;

};




// handle uncaught exceptions and send them to sentry
process.on('uncaughtException', (error) => {
  ErrorHandler.print(error);
  if (ravenClient) {
    ravenClient.captureError(error, { extra: { type: 'UNCAUGHT_EXCEPTION' } });
  }
});




export default ErrorHandler;
