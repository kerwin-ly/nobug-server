const userModel = require('../model/user');

module.exports = {
	login: async(ctx) => {
		ctx.response.body = await userModel.login(ctx.request.body, ctx);
	},
	register: async(ctx) => {
		ctx.response.body = await userModel.register(ctx.request.body);
	},
	logout: async(ctx) => {
		ctx.response.body = await userModel.logout(ctx);
	},
	getUserList: async(ctx) => {
		ctx.response.body = await userModel.getUserList();
	},
	updateUserInfo: async(ctx) => {
		ctx.response.body = await userModel.updateUserInfo(ctx.request.body, ctx);
	}
}
