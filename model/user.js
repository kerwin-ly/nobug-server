const { query } =  require('../utils/sql/query');

module.exports = {
  register: async(userInfo) => {
    let sql = 'INSERT INTO user (user_name, user_password, user_email, user_avatar) VALUES (?, ?, ?, ?)';
    let values = [userInfo.name, userInfo.password, userInfo.email, userInfo.avatar];
    let data = await query(sql, values);
    return data;
  }
}