const store = require("../utils/store.js"); //redis

// 判断用户是否session超时
module.exports = () => {
  function ignoreRoute() {
    const ignoreRouteList = ['/api/user/login', '/api/user/register', '/api/user/logout'];
    return ignoreRouteList.includes(this.url);
  }

  return async (ctx, next) => {
    const isIgnoreSession = ignoreRoute.call(ctx);
    
    if (!isIgnoreSession) {
      if (store.getRedisData(ctx)) {
        ctx.session.refresh(); // refresh session if set maxAge
        await next();
      } else {
        ctx.response.body = {
          status: 401,
          message: '用户未登录'
        }
      }
    } else {
      await next();
    }
  }
}
