const Redis = require("ioredis");
const { Store } = require("koa-session2");
const config = require('../config')
 
class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis(config.redis);
  }
 
  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }
 
  async set(session, { sid =  this.getID(24), maxAge = 1000 * 60 * 60 } = {}, ctx) {
    try {
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) {}
    return sid;
  }
 
  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}
 
module.exports = RedisStore;
