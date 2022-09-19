import Router from 'koa-router'

import ProjectsController from '../controllers/projects-controller'

const router = new Router()

router.get('/users/:user_id/projects', ProjectsController.index)
router.get('/users/:user_id/projects/:project_id', ProjectsController.show)
router.post('/users/:user_id/projects', ProjectsController.store)
router.put('/users/:user_id/projects/:project_id', ProjectsController.update)
router.delete('/users/:user_id/projects/:project_id', ProjectsController.destroy)

export default router.routes()
