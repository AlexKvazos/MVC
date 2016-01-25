/**
 * MainController
 *
 * @description handles main routes
 */

import { Router } from 'express';

const MainController = Router();

MainController.get('/', (req, res) => {
  res.send('Here starts a new application.');
});

export default MainController;
