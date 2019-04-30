const projectModel = require('../model/project');

module.exports = {
	add: async(ctx, next) => {
		ctx.response.body = await projectModel.add(ctx.request.body, ctx);
	},
	getProjects: async(ctx, next) => {
		ctx.response.body = await projectModel.getProjects(ctx);
	},
}
