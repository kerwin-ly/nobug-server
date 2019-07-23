import * as Router from 'koa-router';
import { projectController } from '../controller';

const router = new Router();

router.post('/add', projectController.addProject);
router.get('/list', projectController.getProjects);
router.get('/delete', projectController.deleteProject);
router.get('/detail', projectController.getProjectDetail);

export const projectRouter = router;
