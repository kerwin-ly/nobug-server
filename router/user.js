var router = require('koa-router')();

router.get('/', function (ctx, next) {
  console.log(ctx);
  ctx.body = 'this a users response!';
});

module.exports = router;
