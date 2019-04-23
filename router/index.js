const router = require('koa-router')();
const user = require('./user');

module.exports = (app) => {
  router.use('/api/user', user.routes(), user.allowedMethods());

  app.use(router.routes());
  app.use(router.allowedMethods());
}
