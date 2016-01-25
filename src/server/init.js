import http             from 'http';
import express          from 'express';
import { sentry }       from './modules/util';
import { mysql }        from './modules/database';
import middlewares      from './middleware';
import routers          from './routers';

// create express application
let app = express();

// initialize mysql server
mysql.init();

// use all the middleware
for (let middleware in middlewares) {
  app.use(middlewares[middleware]);
}

// register application routes
routers(app);

// use the error handler middleware
app.use(sentry.express);
app.set('port', process.env.PORT || 3000);

// create and start http server
http.createServer(app).listen(app.get('port'), () => {
  console.log('http server running on port %s', app.get('port'));
});
