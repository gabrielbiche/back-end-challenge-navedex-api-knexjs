import Project from '../models/Project'
import { NotFound, Unauthorized } from '../helpers'

export const index = async (ctx) => {
  const { name } = ctx.query
  const projects = await Project.query()
    .where((builder) => {
      builder.where('user_id', ctx.params.user_id)
      if (name) builder.where('name', 'ilike', `%${name}%`)
    })
    .modify('defaultSelects')
  return (ctx.body = projects)
}

export const show = async (ctx) => {
  const projectAndNavers = await Project.query()
    .findOne({
      id: ctx.params.project_id,
      user_id: ctx.params.user_id,
    })
    .modify('defaultSelects')
    .withGraphFetched('navers(defaultSelects)')
    .throwIfNotFound()
    .catch(() => {
      throw new Unauthorized(
        `User id ${ctx.params.user_id} does not have this project`
      )
    })

  return (ctx.body = projectAndNavers)
}

export const store = async (ctx) => {
  const { body } = ctx.request

  const createProject = await Project.transaction(async (trx) => {
    let project = await Project.query(trx).insert({
      name: body.name,
      user_id: parseInt(ctx.params.user_id),
    })

    if (body.navers) {
      await project
        .$relatedQuery('navers', trx)
        .relate(body.navers)
        .catch(() => {
          throw new NotFound('Naver(s) not found')
        })
    }

    project = await project
      .$query(trx)
      .modify('defaultSelects')
      .withGraphFetched('navers(defaultSelects)')

    return project
  })
  return (ctx.status = 201), (ctx.body = createProject)
}

export const update = async (ctx) => {
  const { body } = ctx.request

  const updateProject = await Project.transaction(async (trx) => {
    let project = await Project.query(trx)
      .findOne({
        id: ctx.params.project_id,
        user_id: ctx.params.user_id,
      })
      .throwIfNotFound()
      .catch(() => {
        throw new Unauthorized(
          `User id ${ctx.params.user_id} does not have this project`
        )
      })

    await project.$relatedQuery('navers', trx).unrelate()

    await project
      .$relatedQuery('navers', trx)
      .relate(body.navers)
      .catch(() => {
        throw new NotFound('Naver(s) not found')
      })

    await project.$query(trx).patch({
      name: body.name,
    })

    project = await project
      .$query(trx)
      .modify('defaultSelects')
      .withGraphFetched('navers(defaultSelects)')

    return project
  })

  return (ctx.body = updateProject)
}

export const destroy = async (ctx) => {
  const project = await Project.query()
    .findOne({
      id: ctx.params.project_id,
      user_id: ctx.params.user_id,
    })
    .throwIfNotFound()
    .catch(() => {
      throw new Unauthorized(
        `User id ${ctx.params.user_id} does not have this project`
      )
    })

  await project.$query().delete()

  return (ctx.status = 204)
}

export default {
  index,
  show,
  store,
  update,
  destroy,
}
