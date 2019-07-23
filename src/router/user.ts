import * as Router from 'koa-router';
import { userController } from '../controller';

const router = new Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/list', userController.getUserList);
router.post('/update', userController.updateUserInfo);
router.post('/pwd/u', userController.updatePwd);

export const userRouter = router;
