/**
 * Application Router
 *
 * @description Points application routes to controllers
 */

import { join } from 'path';
import express from 'express';
import controllers from '../controllers';

let location = (l) => express.static(join(__dirname, l));

export default (app) => {

  app.use('/public', location('../../../public'));
  app.use('/public/img', location('../../client/img'));
  app.use('/public/fonts', location('../../client/fonts'));
  app.use('/public/templates', location('../../client/templates'));

  app.use('/', controllers.MainController);

};
