// 判断用户是否session超时
module.exports = () => {
  function ignoreUrl() {
    const ignoreUrlList = ['/api/user/login', '/api/user/register'];
    return ignoreUrlList.includes(this.url);
  }

  return async (ctx, next) => {
    const isIgnoreSession = ignoreUrl.call(ctx);
    
    if (!isIgnoreSession) {
      if (ctx.session.user) {
        ctx.request.body = Object.assign(ctx.session.user, ctx.request.body);
      } else {
        ctx.response.body = {
          status: 401,
          message: '用户未登录'
        }
      }
    }
    await next();
  }
}