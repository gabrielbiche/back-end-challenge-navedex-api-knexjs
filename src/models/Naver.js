import { Model } from 'objection'

import User from './User'
import Project from './Project'

class Naver extends Model {
  static get tableName() {
    return 'navers'
  }

  static modifiers = {
    defaultSelects(query) {
      query.select('id', 'name', 'birthdate', 'admission_date', 'job_role')
    },
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'birthdate', 'admission_date', 'job_role', 'user_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        birthdate: {
          type: 'string',
          pattern: '[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}',
        },
        admission_date: {
          type: 'string',
          pattern: '[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}',
        },
        job_role: { type: 'string', minLength: 3, maxLength: 255 },
        user_id: { type: 'integer' },
        projects: { type: 'array', items: { type: 'integer' } },
      },
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'navers.user_id',
          to: 'users.id',
        },
      },

      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: 'navers.id',
          through: {
            from: 'navers_projects.naver_id',
            to: 'navers_projects.project_id',
          },
          to: 'projects.id',
        },
      },
    }
  }
}

export default Naver
