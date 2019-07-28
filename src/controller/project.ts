import { ProjectModel } from '../model';
import { BaseContext } from 'koa';

export class ProjectController {
	private projectModel: any;
	constructor() {
		this.projectModel = new ProjectModel();
	}
	public async addProject(ctx: BaseContext) {
		ctx.response.body = await this.projectModel.addProject(
			ctx.request.body,
			ctx
		);
	}
	public async getProjects(ctx: BaseContext) {
		ctx.response.body = await this.projectModel.getProjects();
	}
	public async deleteProject(ctx: BaseContext) {
		ctx.response.body = await this.projectModel.deleteProject(ctx);
	}
	public async getProjectDetail(ctx: BaseContext) {
		ctx.response.body = await this.projectModel.getProjectDetail(ctx);
	}
}
