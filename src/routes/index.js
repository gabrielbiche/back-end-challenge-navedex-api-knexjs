import Router from 'koa-router'

import users from './users-router'
import navers from './navers-router'
import projects from './projects-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(navers)
api.use(projects)

router.use(api.routes())

export default router
