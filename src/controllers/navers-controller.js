import Naver from '../models/Naver'
import { NotFound, Unauthorized } from '../helpers'

export const index = async (ctx) => {
  const { name, admission_date, job_role } = ctx.query
  const navers = await Naver.query()
    .where((builder) => {
      builder.where('user_id', ctx.params.user_id)
      if (name) builder.where('name', 'ilike', `%${name}%`)
      if (admission_date) builder.where('admission_date', admission_date)
      if (job_role) builder.where('job_role', 'ilike', `%${job_role}%`)
    })
    .modify('defaultSelects')

  return (ctx.body = navers)
}

export const show = async (ctx) => {
  const naverAndProjets = await Naver.query()
    .findOne({
      id: ctx.params.naver_id,
      user_id: ctx.params.user_id,
    })
    .modify('defaultSelects')
    .withGraphFetched('projects(defaultSelects)')
    .throwIfNotFound()
    .catch(() => {
      throw new Unauthorized(
        `User id ${ctx.params.user_id} does not have this naver`
      )
    })

  return (ctx.body = naverAndProjets)
}

export const store = async (ctx) => {
  const { body } = ctx.request

  const createNaver = await Naver.transaction(async (trx) => {
    let naver = await Naver.query(trx).insert({
      name: body.name,
      birthdate: body.birthdate,
      admission_date: body.admission_date,
      job_role: body.job_role,
      user_id: parseInt(ctx.params.user_id),
    })

    if (body.projects) {
      await naver
        .$relatedQuery('projects', trx)
        .relate(body.projects)
        .catch(() => {
          throw new NotFound('Project(s) not found')
        })
    }

    naver = await naver
      .$query(trx)
      .modify('defaultSelects')
      .withGraphFetched('projects(defaultSelects)')

    return naver
  })

  return (ctx.status = 201), (ctx.body = createNaver)
}

export const update = async (ctx) => {
  const { body } = ctx.request

  const updateNaver = await Naver.transaction(async (trx) => {
    let naver = await Naver.query(trx)
      .findOne({
        id: ctx.params.naver_id,
        user_id: ctx.params.user_id,
      })
      .throwIfNotFound()
      .catch(() => {
        throw new Unauthorized(
          `User id ${ctx.params.user_id} does not have this naver`
        )
      })

    await naver.$relatedQuery('projects', trx).unrelate()

    await naver
      .$relatedQuery('projects', trx)
      .relate(body.projects)
      .catch(() => {
        throw new NotFound('Project(s) not found')
      })

    await naver.$query(trx).patch({
      name: body.name,
      birthdate: body.birthdate,
      admission_date: body.admission_date,
      job_role: body.job_role,
    })

    naver = await naver
      .$query(trx)
      .modify('defaultSelects')
      .withGraphFetched('projects(defaultSelects)')

    return naver
  })

  return (ctx.body = updateNaver)
}

export const destroy = async (ctx) => {
  const naver = await Naver.query()
    .findOne({
      id: ctx.params.naver_id,
      user_id: ctx.params.user_id,
    })
    .throwIfNotFound()
    .catch(() => {
      throw new Unauthorized(
        `User id ${ctx.params.user_id} does not have this naver`
      )
    })

  await naver.$query().delete()

  return (ctx.status = 204)
}

export default {
  index,
  show,
  store,
  update,
  destroy,
}
