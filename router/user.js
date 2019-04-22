const router = require('koa-router')();
const userController = require('../controller/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/list', userController.getUserList);

module.exports = router;