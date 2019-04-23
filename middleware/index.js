
const bodyParser = require('koa-bodyparser'); // get request params of 'POST' methods
const serve = require('koa-static'); // load static resources
const session = require('koa-session'); // session
const path = require('path');
const miSend = require('./send');
const checkLoginState = require('./checkLoginState');

module.exports = (app) => {
  app.keys = ['sessionID']; // close error. https://github.com/koajs/session/issues/55
  // other-middlewares
  app.use(bodyParser());
  app.use(serve(path.resolve(__dirname, './public')));
  app.use(session({
    key: 'sessionID', // default
    maxAge: 60 * 1000 * 60, // expire time
    overwrite: true,
    httpOnly: true, // only server get cookie
    signed: true, // default
    rolling: true, // force to update the session when server responsed
    renew: false // renew the session when session nearly expired, so we can keep the user still login in.
  }, app));

  // self-middlewares
  app.use(miSend());
  app.use(checkLoginState());
}
