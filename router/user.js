const router = require('koa-router')();
const userController = require('../controller/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/list', userController.getUserList);
router.post('/update', userController.updateUserInfo);

module.exports = router;