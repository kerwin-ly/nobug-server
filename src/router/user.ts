import * as Router from 'koa-router';
import { UserController } from '../controller';

const router = new Router();
const userController = new UserController();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);
router.get('/list', userController.getUserList);
router.post('/update', userController.updateUserInfo);
router.post('/pwd/u', userController.updatePwd);

export const userRouter = router;
