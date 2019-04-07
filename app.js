const Koa = require('koa');
const app = new Koa();
const middleware = require('./middleware');
const router = require('./router');

middleware(app);
router(app);

module.exports = app;
