import mysql from 'mysql';
import debug from 'debug';
import ErrorHandler from '../error_handler';

const logger = debug('database');

class DatabaseHandler {

  /**
   * Initialize the database connection
   */
  init() {
    let { env } = process;
    let { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = env;

    // create database connection if params are defined
    if (MYSQL_HOST && MYSQL_USER && MYSQL_DB) {
      this.connection = mysql.createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB
      });

      // establish connection
      this.connection.connect(::this.handleConnection);
    }
  }

  /**
   * Execute a query on the database connection
   * @param  {params} ...params All params pased to the query function
   */
  query(...params) {
    this.connection.query(...params);
  }

  /**
   * Handle a database connection attempt
   * @param  {Object} err Error
   */
  handleConnection(err) {
    logger('attempting connection');

    // if connection refused or timed out, try again in 5000ms
    if (err && (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT')) {
      return setTimeout(::this.init, 5000);
    }

    // any other error gets captured
    if (err) {
      return ErrorHandler.capture(err);
    }

    logger('successfully connected to mysql server');
    this.connection.on('error', ::this.handleError);
  }

  /**
   * Handle errors thrown by mysql server
   * @param  {Object} err Error
   */
  handleError(err) {
    ErrorHandler.capture(err);

    // if the connection was lost, attempt reconnection in 5000ms
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      return setTimeout(::this.init, 5000);
    }
  }

}

export default new DatabaseHandler();
