
const bodyParser = require('koa-bodyparser'); // get request params of 'POST' methods
const serve = require('koa-static'); // load static resources
const session = require('koa-session2'); // session
const path = require('path');
const miSend = require('./send');
const checkSession = require('./checkSession');
const store = require("../utils/store.js"); //redis

module.exports = (app) => {
  // other-middlewares
  app.use(bodyParser());
  app.use(serve(path.resolve(__dirname, './public')));
  app.use(session({
    key: 'SESSIONID', // default
    store: new store.RedisStore()
  }, app));

  // self-middlewares
  app.use(miSend());
  app.use(checkSession());
}
