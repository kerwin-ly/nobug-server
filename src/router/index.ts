import * as Router from 'koa-router';
import { userRouter } from './user';
import { projectRouter } from './project';

const router = new Router();

router.prefix('/api'); // add prefix for each route

export const routers = app => {
	router.use('/user', userRouter.routes(), userRouter.allowedMethods());
	router.use(
		'/project',
		projectRouter.routes(),
		projectRouter.allowedMethods()
	);

	app.use(router.routes());
	app.use(router.allowedMethods());
};
