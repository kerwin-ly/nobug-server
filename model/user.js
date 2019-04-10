const { query } =  require('../utils/sql/query');

module.exports = {
  register: async(userInfo) => {
    let sql = 'INSERT INTO user (user_name, user_telephone, user_email, user_avatar, user_fans_num) VALUES (?, ?, ?, ?, ?)';
    let values = [userInfo.name, userInfo.telephone, userInfo.email, userInfo.avatar, userInfo.fansNum];
    let data = await query(sql, values);
    return data;
  }
}