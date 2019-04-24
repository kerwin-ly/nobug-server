const { query } =  require('../utils/sql/query');

module.exports = {
  login: async (loginInfo, ctx) => {
    const sql = `SELECT user_id, user_name, user_email FROM user WHERE user_email = "${loginInfo.email}" AND user_password = "${loginInfo.password}"`;
    const result = await query(sql);

    console.log(result);

    if ( Array.isArray(result) && result.length > 0 ) {
      ctx.session.user = result[0];
      return {
        status: 200,
        message: '操作成功',
        data: {
          name: result[0].user_name,
          email: result[0].user_email
        }
      }
    }
    return {
      status: 402,
      message: '邮箱或密码错误'
    }
  },
  register: async (userInfo) => {
    const checkExitUserSql = `SELECT user_id from user WHERE user_email= "${userInfo.email}"`;
    const exitUser = await query(checkExitUserSql);

    if (Array.isArray(exitUser) && exitUser.length > 0) {
      return {
        status: 207,
        message: '当前用户已存在'
      }
    }

    const sql = `INSERT INTO user (user_name, user_email, user_password) VALUES ("${userInfo.name}", "${userInfo.email}", "${userInfo.password}")`;
    const result = await query(sql);

    if (result && result.insertId >= 0) {
      return {
        status: 200,
        message: '注册成功'
      }
    }
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
        message: '内部错误'
      }
    }
    return data;
  }
}