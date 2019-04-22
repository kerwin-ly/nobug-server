const { query } =  require('../utils/sql/query');

module.exports = {
  register: async(userInfo) => {
    const sql = 'INSERT INTO user (user_name, user_password, user_email, user_avatar) VALUES (?, ?, ?, ?)';
    let values = [userInfo.name, userInfo.password, userInfo.email, userInfo.avatar];
    let data;

    try {
      await query(sql, values);
      data = {
        status: 200,
        message: 'success'
      }
    } catch (error) {
      data = {
        status: 500,
        message: error
      }
    }
    return data;
  },
  login: async (loginInfo) => {
    const sql = 'SELECT * FROM user WHERE user_name = ? AND user_password = ?';
    let values = [loginInfo.username, loginInfo.password];
    let data;

    try {
      await query(sql, values);
      data = {
        status: 200,
        message: '登录成功'
      }
    } catch (error) {
      data = {
        status: 500,
        message: error
      }
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
        message: '内部错误'
      }
    }
    return data;
  }
}