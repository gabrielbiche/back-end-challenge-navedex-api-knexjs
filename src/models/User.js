import { Model } from 'objection'

import Naver from './Naver'
import Project from './Project'

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static modifiers = {
    defaultSelects(query) {
      query.select('id', 'email')
    },
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', pattern: '^\\S+@\\S+\\.\\S+$' },
        password: { type: 'string', minLength: 8, maxLength: 255 },
      },
    }
  }

  static get relationMappings() {
    return {
      navers: {
        relation: Model.HasManyRelation,
        modelClass: Naver,
        join: {
          from: 'users.id',
          to: 'navers.user_id',
        },
      },

      projects: {
        relation: Model.HasManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          to: 'projects.user_id',
        },
      },
    }
  }
}

export default User
