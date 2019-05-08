const { query } =  require('../utils/query');
const store = require("../utils/store.js"); //redis

module.exports = {
  addProject: async (project, ctx) => {
    const redisData = await store.getRedisData(ctx);
    const sql = `INSERT INTO project (project_name, project_color, project_desc, project_creator_id) VALUES (?, ?, ?, ?)`;
    const values = [project.name, project.backgroundColor, project.description, redisData.user.id];
    
    try {
      const result = await query(sql, values);

      if (result && result.insertId >= 0) {
        const userProjectSql = `INSERT INTO user_project (user_id, project_id) VALUES (?, ?)`;
        const userProjectResult = await query(userProjectSql, [redisData.user.id, result.insertId]);
  
        if (userProjectResult && userProjectResult.insertId >= 0) {
          return {
            status: 200,
            message: '操作成功'
          }
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  },
  getProjects: async () => {
    const sql = `
      SELECT
      p.project_id as projectId, p.project_name as projectName, p.project_desc as projectDescription, p.project_color as projectColor, u.user_name as projectCreator, COUNT(up.user_id) as userCount
      FROM
      (project p LEFT JOIN user_project up ON p.project_id = up.project_id)
      LEFT JOIN user u ON p.project_creator_id = u.user_id
      GROUP BY p.project_id
    `;
    try {
      const result = await query(sql);

      if (result && result.length >= 0) {
        return {
          status: 200,
          message: '操作成功',
          data: result
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  },
  deleteProject: async (ctx) => {
    const requestData = ctx.request.query;
    const sql = 'DELETE FROM project WHERE project_id = ? AND project_creator_id = ?';
    const relationSql = 'DELETE FROM user_project WHERE project_id = ?';
    const redisData = await store.getRedisData(ctx);
    const values = [requestData.data, redisData.user.id];
    const relationValues = [requestData.data];

    try {
      const result = await query(sql, values);
      const relationResult = await query(relationSql, relationValues);

      if (result.affectedRows > 0 && relationResult.affectedRows > 0) {
        return {
          status: 200,
          message: '删除成功'
        }
      } else {
        return {
          status: 403,
          message: '无操作权限'
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
    
  }
}
