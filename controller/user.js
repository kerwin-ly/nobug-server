const userModel = require('../model/user');
const miSend = require('../middleware/send');

module.exports = {
	index: async(ctx, next) => {
		// let {
		// 	name,
		// 	password
		// } = ctx.request.body;
		const userInfo = {
			name: 'kerwin',
			telephone: '18180544526',
			email: '879688355@qq.com',
			avatar: null,
			fansNum: 0
		}
		let data = await userModel.register(userInfo);
		if (data) {
			ctx.body = data;
		}

		console.log(data);
	},
	home: async(ctx, next) => {
		console.log(ctx.request.query)
		console.log(ctx.request.querystring)
		ctx.response.body = '<h1>HOME page</h1>'
	},
	homeParams: async(ctx, next) => {
		console.log(ctx.params)
		ctx.response.body = '<h1>HOME page /:id/:name</h1>'
	},
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
		let {
			name,
			password
		} = ctx.request.body;
		let data = await userModel.register(name, password);
		ctx.body = data;
	}
}
