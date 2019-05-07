const { query } =  require('../utils/query');
const Store = require("../middleware/store.js"); //redis
const redis = new Store();

module.exports = {
  addProject: async (project, ctx) => {
    const SESSIONID = ctx.cookies.get('SESSIONID')
    const redisData = await redis.get(SESSIONID);
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
        message: error
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
  }
}