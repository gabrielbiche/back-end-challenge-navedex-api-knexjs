import bcrypt from 'bcrypt'

import User from '../models/User'
import { BadRequest, generateJWTToken, Unauthorized } from '../helpers'

export const signup = async (ctx) => {
  const { body } = ctx.request

  const userExists = await User.query().findOne({ email: body.email })

  if (userExists)
    throw new BadRequest('There is already a user registered with this email')

  const hashPassword = await bcrypt.hash(body.password, 12)

  let user = await User.query().insert({
    email: body.email,
    password: hashPassword,
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
      throw new Unauthorized('Incorrect email or password')
    })

  const verifyPassword = await bcrypt.compare(body.password, user.password)

  if (!verifyPassword) throw new Unauthorized('Incorrect email or password')

  const token = generateJWTToken( user.id )

  return ctx.set('Authorization', token), (ctx.status = 204)
}

export default {
  signup,
  login,
}
