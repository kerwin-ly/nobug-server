const Router = require('koa-router');
const router = new Router();
const user = require('./user');
const project = require('./project');

router.prefix('/api'); // add prefix for each route

module.exports = (app) => {
  router.use('/user', user.routes(), user.allowedMethods());
  router.use('/project', project.routes(), project.allowedMethods());

  app.use(router.routes());
  app.use(router.allowedMethods());
}
