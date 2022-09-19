import Router from 'koa-router'

import UsersController from '../controllers/users-controller'

const router = new Router()

router.post('/users/signup', UsersController.signup)
router.post('/users/login', UsersController.login)

export default router.routes()
