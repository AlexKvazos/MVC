import http         from 'http';
import express      from 'express';
import ErrorHandler from './server/modules/error_handler';
import middlewares  from './server/middleware';
import routes       from './server/routes';
import configs      from '../config';


// create express application
let app = express();


// use all the middleware
for (let middleware in middlewares) {
  app.use(middlewares[middleware]);
}


// run all the configs
for (let config in configs) {
  configs[config](app);
}


// register application routes
routes(app);


// use the error handler middleware
app.use(ErrorHandler.express);


// create and start http server
http.createServer(app).listen(app.get('port'), () => {
  console.log('http server running on port %s', app.get('port'));
});
