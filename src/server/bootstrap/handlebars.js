/**
 * Handlebars Configuration
 */

import path from 'path';
import hbs from 'hbs';

export default (app) => {

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views'));
  hbs.registerPartials(path.join(__dirname, '../views'));
  hbs.localsAsTemplateData(app);

};
