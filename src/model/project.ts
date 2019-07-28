import { store } from '../utils/store';
import { query } from '../utils/query';
import { IProjectModel, IResponse } from '../entity';
import { BaseContext } from 'koa';

export class ProjectModel implements IProjectModel {
	constructor() {}

	public async addProject(project: any, ctx: BaseContext): Promise<IResponse> {
		const redisData = await store.getRedisData(ctx);
		const sql = `INSERT INTO project (project_name, project_color, project_desc, project_creator_id) VALUES (?, ?, ?, ?)`;
		const values = [
			project.name,
			project.backgroundColor,
			project.description,
			redisData.user.id
		];

		try {
			const result = (await query(sql, values)) as any;

			if (result && result.insertId >= 0) {
				const userProjectSql = `INSERT INTO user_project (user_id, project_id) VALUES (?, ?)`;
				const userProjectResult = (await query(userProjectSql, [
					redisData.user.id,
					result.insertId
				])) as any;

				if (userProjectResult && userProjectResult.insertId >= 0) {
					return {
						status: 200,
						message: '操作成功'
					};
				}
			}
		} catch (error) {
			return {
				status: 500,
				message: JSON.stringify(error)
			};
		}
	}

	public async getProjects(): Promise<IResponse> {
		const sql = `
      SELECT
      p.project_id as projectId, p.project_name as projectName, p.project_desc as projectDescription, p.project_color as projectColor, u.user_name as projectCreator, COUNT(up.user_id) as userCount
      FROM
      (project p LEFT JOIN user_project up ON p.project_id = up.project_id)
      LEFT JOIN user u ON p.project_creator_id = u.user_id
      GROUP BY p.project_id
    `;
		try {
			const result = (await query(sql)) as any;

			if (result && result.length >= 0) {
				return {
					status: 200,
					message: '操作成功',
					data: result
				};
			}
		} catch (error) {
			return {
				status: 500,
				message: JSON.stringify(error)
			};
		}
	}

	public async deleteProject(ctx: BaseContext): Promise<IResponse> {
		const requestData = ctx.request.query;
		const sql =
			'DELETE FROM project WHERE project_id = ? AND project_creator_id = ?';
		const relationSql = 'DELETE FROM user_project WHERE project_id = ?';
		const redisData = await store.getRedisData(ctx);
		const values = [requestData.data, redisData.user.id];
		const relationValues = [requestData.data];

		try {
			const result = (await query(sql, values)) as any;
			const relationResult = (await query(relationSql, relationValues)) as any;

			if (result.affectedRows > 0 && relationResult.affectedRows > 0) {
				return {
					status: 200,
					message: '删除成功'
				};
			} else {
				return {
					status: 403,
					message: '无操作权限'
				};
			}
		} catch (error) {
			return {
				status: 500,
				message: JSON.stringify(error)
			};
		}
	}

	public async getProjectDetail(ctx: BaseContext): Promise<IResponse> {
		const requestData = ctx.request.query;
		const sql = `
      SELECT
      project_id AS projectId, project_name AS projectName, project_desc AS projectDesc, project_color AS projectColor, user_name AS projectCreator
      FROM project p
      LEFT JOIN user u ON p.project_creator_id = u.user_id
      WHERE p.project_id = ?
    `;
		const values = [requestData.data];

		try {
			const result = (await query(sql, values)) as any;

			if (result && result.length > 0) {
				return {
					status: 200,
					message: '操作成功',
					data: result[0]
				};
			}
		} catch (error) {
			return {
				status: 500,
				message: JSON.stringify(error)
			};
		}
	}
}
