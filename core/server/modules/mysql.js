/**
 * MySQL Module
 *
 * @description: Used to make queries
 * to the mysql database.
 */

import mysql         from 'mysql';
import ErrorHandler  from '../error_handler';

let Database    = {};
let connection  = null;

// connection parameters
let host = process.env.MYSQL_HOST;
let user = process.env.MYSQL_USER;
let pass = process.env.MYSQL_PASS;
let db   = process.env.MYSQL_DB;


Database.init = () => {

  // do not initialize if connection params are not set
  if (!host || !user || !pass || !db) return;

  // create database connection
  connection = mysql.createConnection({
    host        : host,
    user        : user,
    password    : pass,
    database    : db
  });

  // establish connection
  connection.connect(handleConnection.bind(this));

};




/**
 * Execute a query on the connection
 * @param  {String}   sql      SQL query
 * @param  {Array}   params    Parameters array
 * @param  {Function} callback Callback that gets (err, rows)
 */
Database.query = (sql, params, callback) => {
  connection.query(sql, params, callback);
};




// handle connection events
function handleConnection(err) {

  // capture any errors
  if (err) { ErrorHandler.capture(err); }

  // re-attempt connection in 5000ms if the connection was refused or timed out
  if (err && (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT')) {
    return setTimeout(() => {
      Database.init();
    }, 5000);
  }

  // listen to error events on connection object
  connection.on('error', handleError);

}




// handle error events
function handleError(err) {

  // capture errors
  ErrorHandler.capture(err);

  // re-attempt connection in 5000ms if connection was lost
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    return setTimeout(() => {
      Database.init();
    });
  }

}

export default Database;
