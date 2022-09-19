import jwt from 'jsonwebtoken'

import { ACCESS_SECRET } from '../config'

export const generateJWTToken = (tokenData) => {
  const token = jwt.sign(tokenData, ACCESS_SECRET, {
    expiresIn: '15m',
  })

  return token
}

export const verifyToken = (token) => jwt.verify(token, ACCESS_SECRET)
