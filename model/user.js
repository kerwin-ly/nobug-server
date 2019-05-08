const { query } =  require('../utils/query');
const store = require("../utils/store.js"); //redis

module.exports = {
  login: async (loginInfo, ctx) => {
    const sql = `SELECT user_id as id, user_name as name, user_email as email, user_phone as phone FROM user WHERE user_email = "${loginInfo.email}" AND user_password = "${loginInfo.password}"`;

    try {
      const result = await query(sql);

      if (result.length > 0) {
        ctx.session.user = result[0];
        return {
          status: 200,
          message: '操作成功',
          data: result[0]
        }
      }
      return {
        status: 402,
        message: '邮箱或密码错误'
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  },
  register: async (userInfo) => {
    const checkExitUserSql = `SELECT user_id from user WHERE user_email= "${userInfo.email}"`;

    try {
      const exitUser = await query(checkExitUserSql);

      if (exitUser.length > 0) {
        return {
          status: 207,
          message: '当前用户已存在'
        }
      }

      const sql = `INSERT INTO user (user_name, user_email, user_password) VALUES (?, ?, ?)`;
      const values = [userInfo.name, userInfo.email, userInfo.password];
      const result = await query(sql, values);

      if (result && result.insertId >= 0) {
        return {
          status: 200,
          message: '注册成功'
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  },
  logout: async (ctx) => {
    let data;

    ctx.session = null;
    data = {
      status: 200,
      message: '注销成功'
    }
    return data;
  },
  getUserList: async () => {
    const sql = 'SELECT * FROM user';
    let data;

    try {
      data = {
        status: 200,
        message: 'success',
        data: await query(sql)
      }
    } catch (error) {
      data = {
        status: 500,
        message: JSON.stringify(error)
      }
    }
    return data;
  },
  updateUserInfo: async (userInfo, ctx) => {
    const redisData = await store.getRedisData(ctx);
    const sql = 'UPDATE user SET user_name = ?, user_phone = ? WHERE user_id = ?';
    const values = [userInfo.name, userInfo.phone, redisData.user.id];

    try {
      await query(sql, values);

      return {
        status: 200,
        message: '操作成功'
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  },
  updatePwd: async (pwd, ctx) => {
    const redisData = await store.getRedisData(ctx);
    const findUserSql = 'SELECT user_id FROM user WHERE user_id = ? AND user_password = ?';
    const findUserValues = [redisData.user.id, pwd.originPwd];

    try {
      const users = await query(findUserSql, findUserValues);

      if (users && users.length === 1) {
        const updatePwdSql = 'UPDATE user SET user_password = ? WHERE user_id = ?';
        const updatePwdValues = [pwd.newPwd, redisData.user.id];

        await query(updatePwdSql, updatePwdValues);

        return {
          status: 200,
          message: '操作成功'
        }
      }
      return {
        status: 207,
        message: '原密码错误'
      }
    } catch (error) {
      return {
        status: 500,
        message: JSON.stringify(error)
      }
    }
  }
}
