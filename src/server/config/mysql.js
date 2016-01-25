/**
 * Mysql Configuration
 */

import { mysql } from '../modules/database';

export default (app) => {

  mysql.init();

};
