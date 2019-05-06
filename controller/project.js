const projectModel = require('../model/project');

module.exports = {
	addProject: async(ctx, next) => {
		ctx.response.body = await projectModel.addProject(ctx.request.body, ctx);
	},
	getProjects: async(ctx, next) => {
		ctx.response.body = await projectModel.getProjects(ctx);
	},
}
