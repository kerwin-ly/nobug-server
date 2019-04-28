const userModel = require('../model/user');

module.exports = {
	login: async(ctx, next) => {
		console.log(1)
		ctx.response.body = await userModel.login(ctx.request.body, ctx);
	},
	register: async(ctx, next) => {
		ctx.response.body = await userModel.register(ctx.request.body);
	},
	getUserList: async(ctx, next) => {
		ctx.response.body = await userModel.getUserList();
	}
}
