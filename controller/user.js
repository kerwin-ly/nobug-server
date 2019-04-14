const userModel = require('../model/user');
const miSend = require('../middleware/send');

module.exports = {
	login: async(ctx, next) => {
		ctx.response.body =
			`
			<form action="/user/register" method="post">
				<input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
				<br/>
				<input name="password" type="text" placeholder="请输入密码：123456"/>
				<br/> 
				<button>GoGoGo</button>
			</form>
		`
	},
	register: async(ctx, next) => {
		ctx.response.body = await userModel.register(ctx.request.body);
	},
	getUserList: async(ctx, next) => {
		ctx.response.body = await userModel.getUserList();
	}
}
