import { UserModel } from '../model';
import { BaseContext } from 'koa';

const userModel = new UserModel();

export class UserController {
	constructor() {}

	public async login(ctx: BaseContext) {
		console.log(ctx);
		ctx.response.body = await userModel.login(ctx.request.body, ctx);
	}
	public async register(ctx: BaseContext) {
		ctx.response.body = await userModel.register(ctx.request.body);
	}
	public async logout(ctx: BaseContext) {
		ctx.response.body = await userModel.logout(ctx);
	}
	public async getUserList(ctx: BaseContext) {
		ctx.response.body = await userModel.getUserList();
	}
	public async updateUserInfo(ctx: BaseContext) {
		ctx.response.body = await userModel.updateUserInfo(ctx.request.body, ctx);
	}
	public async updatePwd(ctx: BaseContext) {
		ctx.response.body = await userModel.updatePwd(ctx.request.body, ctx);
	}
}