import 'dotenv/config'
import Koa from 'koa'
import koaBody from 'koa-body'

import routes from './routes'
import {
  errorHandlingMiddleware,
  authenticationMiddleware,
} from './middlewares'

const app = new Koa()

app.use(koaBody())
app.use(errorHandlingMiddleware)
app.use(authenticationMiddleware)
app.use(routes.routes())

export default app
