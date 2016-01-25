import http             from 'http';
import express          from 'express';
import { sentry }       from '../modules/util';
import { mysql }        from '../modules/database';
import middlewares      from '../middleware';
import router          from './router';

// create express application
let app = express();

// initialize mysql server
mysql.init();

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

// create and start http server
http.createServer(app).listen(app.get('port'), () => {
  console.log('http server running on port %s', app.get('port'));
});
