import bcrypt from 'bcrypt'

import User from '../models/User'
import { generateJWTToken, Unauthorized } from '../helpers'

export const signup = async (ctx) => {
  const { body } = ctx.request

  let user = await User.query().insert({
    email: body.email,
    password: body.password,
  })

  user = await user.$query().modify('defaultSelects')

  return (ctx.status = 201), (ctx.body = user)
}

export const login = async (ctx) => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({ email: body.email })
    .throwIfNotFound()
    .catch(() => {
      throw new Unauthorized('User not found')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw new Unauthorized('Incorrect email or password')
  }

  const parsedUser = user.toJSON()

  const token = generateJWTToken({ id: parsedUser.id })

  return ctx.set('Authorization', token), (ctx.status = 204)
}

export default {
  signup,
  login,
}
