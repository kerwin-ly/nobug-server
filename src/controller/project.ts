import { ProjectModel } from '../model';
import { BaseContext } from 'koa';

const projectModel = new ProjectModel();

export class ProjectController {
	constructor() {}
	public async addProject(ctx: BaseContext) {
		ctx.response.body = await projectModel.addProject(ctx.request.body, ctx);
	}
	public async getProjects(ctx: BaseContext) {
		ctx.response.body = await projectModel.getProjects();
	}
	public async deleteProject(ctx: BaseContext) {
		ctx.response.body = await projectModel.deleteProject(ctx);
	}
	public async getProjectDetail(ctx: BaseContext) {
		ctx.response.body = await projectModel.getProjectDetail(ctx);
	}
}
