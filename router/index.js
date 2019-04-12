const router = require('koa-router')();
const userController = require('../controller/user');

module.exports = (app) => {
  router.post('/user/register', userController.register);
  // router.get('/home', userController.home);

  app.use(router.routes());
  app.use(router.allowedMethods());
}
