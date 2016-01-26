import { EventEmitter } from 'events';
import mysql from 'mysql';
import { logger, sentry } from '../util';

/**
 * Module Access
 * @public
 */

const { env } = process;
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = env;
let connection;

let MySQLHandler = {

  /**
   * Initialize the database connection
   */
  init() {
    if (!MYSQL_HOST) throw new Error('No MySQL Credentials');

    connection = mysql.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DB
    });

    logger.info('(mysql) connecting to mysql server...');
    connection.connect(::MySQLHandler.connectionHandler);
  },

  /**
   * Handle a database connection
   * @param  {Object} err Possible error
   */
  connectionHandler(err) {

    // retry connection if connection is refused or gets timed out
    if (err) {
      if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
        return setTimeout(::MySQLHandler.init, 5000);
      }

      // capture any other type of error
      return sentry.capture(err);
    }

    logger.info('(mysql) successfully connected to mysql server');
    MySQLHandler.emitter.emit('ready');
    connection.on('error', ::MySQLHandler.onError);
  },

  /**
   * Execute a query on the connection instance
   */
  query(...params) {
    connection.query(...params);
  },

  /**
   * Handle connection errors
   * @param  {Object} err Error object
   */
  onError(err) {
    switch (err.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        setTimeout(::MySQLHandler.init, 5000);
        break;
    }
  },

  emitter: new EventEmitter()

};

export default MySQLHandler;
