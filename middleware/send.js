// middleware-send: response json
module.exports = () => {
  function setRequestHeader(json) {
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    this.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (this.request.method == 'OPTIONS') {
      this.response.status = 200; // quickly response if 'OPTIONS' request
    }
    this.set("Content-Type", "application/json");
    this.body = JSON.stringify(json);
  }

  return async (ctx, next) => {
    ctx.send = setRequestHeader.bind(ctx);
    await next();
  }
}