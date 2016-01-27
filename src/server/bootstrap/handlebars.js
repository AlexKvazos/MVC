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

  // livereload helper, only renders when NODE_ENV is 'development'
  hbs.registerHelper('livereload', () => {
    if (process.env.NODE_ENV !== 'development') return '';

    return `<script>
      document.write('<script src="http://' +
      (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>')
      </script>`;
  });

};
