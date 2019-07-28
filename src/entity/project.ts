import { BaseContext } from 'koa';
import { IResponse } from './common';

export interface IProjectModel {
	addProject(project: any, ctx: BaseContext): Promise<IResponse>;
	getProjects(): Promise<IResponse>;
	deleteProject(ctx: BaseContext): Promise<IResponse>;
	getProjectDetail(ctx: BaseContext): Promise<IResponse>;
}
