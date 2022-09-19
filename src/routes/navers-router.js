import Router from 'koa-router'

import NaversController from '../controllers/navers-controller'

const router = new Router()

router.get('/users/:user_id/navers', NaversController.index)
router.get('/users/:user_id/navers/:naver_id', NaversController.show)
router.post('/users/:user_id/navers', NaversController.store)
router.put('/users/:user_id/navers/:naver_id', NaversController.update)
router.delete('/users/:user_id/navers/:naver_id', NaversController.destroy)

export default router.routes()
