const router = require('koa-router')();
const projectController = require('../controller/project');

router.post('/add', projectController.addProject);
router.get('/list', projectController.getProjects);
router.get('/delete', projectController.deleteProject);

module.exports = router;