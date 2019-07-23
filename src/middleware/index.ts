import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as path from 'path';
import session from 'koa-session2';
import { miSend } from './send';
import { checkSession } from './checkSession';
import { store } from '../utils/store';

export const middlewares = app => {
	// other-middlewares
	app.use(bodyParser());
	app.use(serve(path.resolve(__dirname, './public')));
	app.use(
		session(
			{
				key: 'SESSIONID', // default
				store: new store.RedisStore()
			},
			app
		)
	);

	// self-middlewares
	app.use(miSend());
	app.use(checkSession());
};
