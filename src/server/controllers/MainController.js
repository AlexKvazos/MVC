/**
 * MainController
 *
 * @description handles main routes
 */

import { Router } from 'express';

const MainController = Router();

MainController.get('/', (req, res) => {
  res.render('main');
});

export default MainController;
