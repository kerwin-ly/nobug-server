import * as Koa from 'koa';
import { routers } from './router';
import { middlewares } from './middleware';

const app = new Koa();

middlewares(app);
routers(app);

module.exports = app;
