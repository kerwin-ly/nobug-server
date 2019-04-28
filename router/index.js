const Router = require('koa-router');
const router = new Router();
const user = require('./user');

router.prefix('/api'); // add prefix for each route

module.exports = (app) => {
  router.use('/user', user.routes(), user.allowedMethods());

  app.use(router.routes());
  app.use(router.allowedMethods());
}
