const projectModel = require('../model/project');

module.exports = {
	addProject: async(ctx) => {
		ctx.response.body = await projectModel.addProject(ctx.request.body, ctx);
	},
	getProjects: async(ctx) => {
		ctx.response.body = await projectModel.getProjects(ctx);
	},
	deleteProject: async(ctx) => {
		ctx.response.body = await projectModel.deleteProject(ctx);
	}
}
