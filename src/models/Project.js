import { Model } from 'objection'

import User from './User'
import Naver from './Naver'

class Project extends Model {
  static get tableName() {
    return 'projects'
  }

  static modifiers = {
    defaultSelects(query) {
      query.select('id', 'name')
    },
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'user_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        user_id: { type: 'integer' },
        navers: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'projects.user_id',
          to: 'users.id',
        },
      },

      navers: {
        relation: Model.ManyToManyRelation,
        modelClass: Naver,
        join: {
          from: 'projects.id',
          through: {
            from: 'navers_projects.project_id',
            to: 'navers_projects.naver_id',
          },
          to: 'navers.id',
        },
      },
    }
  }
}

export default Project
