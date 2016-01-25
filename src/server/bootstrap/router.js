/**
 * Application Router
 *
 * @description Points application routes to controllers
 */

import controllers from '../controllers';

export default (app) => {

  app.use('/', controllers.MainController);

};
