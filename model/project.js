const { query } =  require('../utils/query');
const Store = require("../middleware/store.js"); //redis
const redis = new Store();

module.exports = {
  add: async (project, ctx) => {
    const SESSIONID = ctx.cookies.get('SESSIONID')
    const redisData = await redis.get(SESSIONID);
    console.log(redisData)
    const sql = `INSERT INTO project (project_name, project_color, project_desc, project_creator_id) VALUES (?, ?, ?, ?)`;
    const values = [project.name, project.backgroundColor, project.description, redisData.user.user_id];
    const result = await query(sql, values);


    if (result && result.insertId >= 0) {
      return {
        status: 200,
        message: '操作成功'
      }
    }
    return {
      status: 207,
      message: '未知错误'
    }
  },
  getProjects: async (ctx) => {
    const sql = `
      SELECT
      project_id as projectId, project_name as projectName, project_desc as projectDescription, project_color as projectColor, user_name as projectCreator
      FROM project
      LEFT JOIN user
      ON project.project_creator_id = user.user_id
    `;
    const result = await query(sql);

    if (result && result.length >= 0) {
      return {
        status: 200,
        message: '操作成功',
        data: result
      }
    }
    return {
      status: 207,
      message: '未知错误'
    }
  }
}