const path = require('path');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')(); // route modules
const bodyParser = require('koa-bodyparser'); // get request params of 'POST' methods
const serve = require('koa-static'); // load static resources

const user = require('./router/user');

// route modules
router.use('/user', user.routes(), user.allowedMethods()); // user route
app.use(router.routes(), router.allowedMethods());

// middlewares
app.use(bodyParser());
app.use(serve(path.join(__dirname, './public')));

module.exports = app;
