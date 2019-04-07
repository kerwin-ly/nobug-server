
const bodyParser = require('koa-bodyparser'); // get request params of 'POST' methods
const serve = require('koa-static'); // load static resources
const session = require('koa-session'); // session
const path = require('path');
const miSend = require('./mi-send');

module.exports = (app) => {
  // set a interceptor for every http request
  app.use(async (req, res, next) => {
    // proxy setting
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.send(200); // quickly response if 'OPTIONS' request
    } else {
      next();
    }
  })

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
  app.use(miSend())
}
