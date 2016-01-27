import http                from 'http';
import express             from 'express';
import { sentry, logger }  from '../modules/util';
import { mysql }           from '../modules/database';
import middlewares         from '../middleware';
import router              from './router';
import handlebars          from './handlebars';

// create express application
let app = express();

// initialize mysql server
mysql.init();

// run handlebars configuration
handlebars(app);

// use all the middleware
for (let middleware in middlewares) {
  let m = middlewares[middleware];
  if (m.global) {
    app.use(m.handler);
  }
}

// register application routes
router(app);

// use the error handler middleware
app.use(sentry.express);
app.set('port', process.env.PORT || 3000);


// wait for mysql to be ready to start web server
mysql.emitter.once('ready', () => {

  // create and start http server
  http.createServer(app).listen(app.get('port'), () => {
    logger.info('(http) web server running on port %s', app.get('port'));
  });

});
