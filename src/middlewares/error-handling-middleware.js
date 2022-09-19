import {
  ValidationError,
  UniqueViolationError,
  ForeignKeyViolationError,
} from 'objection'
import { JsonWebTokenError } from 'jsonwebtoken'

import { BadRequest, Unauthorized, NotFound } from '../helpers'

export const errorHandlingMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof BadRequest) {
      ctx.status = err.status
      ctx.body = {
        error: err.name,
        message: err.message,
      }
    } else if (err instanceof Unauthorized) {
      ctx.status = err.status
      ctx.body = {
        error: err.name,
        message: err.message,
      }
    } else if (err instanceof NotFound) {
      ctx.status = err.status
      ctx.body = {
        error: err.name,
        message: err.message,
      }
    } else if (err instanceof UniqueViolationError) {
      ctx.status = 409
      ctx.body = {
        error: 'UniqueViolation',
        constraint: err.constraint,
        message: err.message,
      }
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.status = 409
      ctx.body = {
        error: 'ForeignKeyViolationError',
        constraint: err.constraint,
        message: err.message,
      }
    } else if (err instanceof SyntaxError) {
      ctx.status = err.status
      ctx.body = {
        error: err.name,
        message: err.message,
      }
    } else if (err instanceof JsonWebTokenError) {
      ctx.status = 401
      ctx.body = {
        error: 'JsonWebTokenError',
        message: err.message,
      }
    } else if (err instanceof ValidationError) {
      switch (err.type) {
        case 'ModelValidation':
          ctx.status = 400
          ctx.body = {
            error: 'ValidationError',
            type: err.type,
            description: err.data,
          }
          break
        case 'RelationExpression':
          ctx.status = 400
          ctx.body = {
            error: 'RelationExpression',
            message: err.message,
            type: 'RelationExpression',
          }
          break
        case 'UnallowedRelation':
          ctx.status = 400
          ctx.body = {
            error: 'UnallowedRelation',
            message: err.message,
            type: err.type,
          }
          break
        case 'InvalidGraph':
          ctx.status = 400
          ctx.body = {
            error: 'InvalidGraph',
            message: err.message,
            type: err.type,
          }
          break
        default:
          ctx.status = 400
          ctx.body = {
            message: err.message,
            type: err.type,
          }
          break
      }
    } else {
      ctx.status = 500
      ctx.body = {
        error: 'InternalServerError',
        message: err.message || {},
      }
    }
  }
}
