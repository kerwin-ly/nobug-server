import * as Router from 'koa-router';
import { ProjectController } from '../controller';

const router = new Router();
const projectController = new ProjectController();

router.post('/add', projectController.addProject);
router.get('/list', projectController.getProjects);
router.get('/delete', projectController.deleteProject);
router.get('/detail', projectController.getProjectDetail);

export const projectRouter = router;
