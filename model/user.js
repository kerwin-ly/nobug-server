const { query } =  require('../utils/sql/query');

module.exports = {
  login: async (loginInfo, ctx) => {
    const sql = 'SELECT user_id, user_name FROM user WHERE user_name = ? AND user_password = ?';
    const values = [loginInfo.username, loginInfo.password];
    const result = await query(sql, values);

    if ( Array.isArray(result) && result.length > 0 ) {
      ctx.session.user = result[0];
      return {
        status: 200,
        message: '操作成功',
        data: result[0]
      }
    }
    return {
      status: 402,
      message: '用户不存在'
    }
  },
  register: async (userInfo) => {
    const sql = 'INSERT INTO user (user_name, user_password, user_email, user_avatar) VALUES (?, ?, ?, ?)';
    const values = [userInfo.name, userInfo.password, userInfo.email, userInfo.avatar];
    const result = await query(sql, values);

    if ( Array.isArray(result) && result.length > 0 ) {
      ctx.session.user = result[0];
      return {
        status: 200,
        message: '操作成功'
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