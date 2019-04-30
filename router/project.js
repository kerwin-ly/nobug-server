const router = require('koa-router')();
const projectController = require('../controller/project');

router.post('/add', projectController.add);
router.get('/list', projectController.getProjects);

module.exports = router;