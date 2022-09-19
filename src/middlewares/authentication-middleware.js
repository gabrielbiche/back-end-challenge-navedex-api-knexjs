import jwt from 'koa-jwt'

import { ACCESS_SECRET } from '../config'
import { Unauthorized, verifyToken } from '../helpers'

export const getToken = ({ headers }) => {
  if (!headers.authorization) {
    throw new Unauthorized('You need to submit a token')
  }

  const [bearer, token] = headers.authorization.split(' ')

  verifyToken(token)

  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token')
  }

  return token
}

export const authenticationMiddleware = jwt({
  secret: ACCESS_SECRET,
  getToken,
}).unless({
  path: ['/users/signup', '/users/login'],
})
