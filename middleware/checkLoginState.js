const Store = require("./store.js"); //redis
const redis = new Store();

// 判断用户是否session超时
module.exports = () => {
  function ignoreRoute() {
    const ignoreRouteList = ['/api/user/login', '/api/user/register'];
    return ignoreRouteList.includes(this.url);
  }

  return async (ctx, next) => {
    const isIgnoreSession = ignoreRoute.call(ctx);
    
    if (!isIgnoreSession) {
      const SESSIONID = ctx.cookies.get('SESSIONID'); // 判断用户是否登录，获取cookie里的SESSIONID

      if (!SESSIONID) {
        ctx.response.body = {
          status: 401,
          message: '用户未登录'
        }
      } else {
        const redisData = await redis.get(SESSIONID); // 如果有SESSIONID，就去redis里拿数据

        if (redisData) {
          ctx.session.refresh(); // refresh session if set maxAge
          await next();
        } else {
          ctx.response.body = {
            status: 401,
            message: '用户未登录'
          }
        }
      }
    } else {
      await next();
    }
  }
}