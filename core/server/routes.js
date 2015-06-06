import routers from './routers';

export default (app) => {

  app.use('/', routers.main);

};
