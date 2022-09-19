import { Model } from 'objection'
import Knex from 'knex'

import app from './server'
import { PORT } from './config'
import knexConfig from './database/knexfile'

const knex = Knex(knexConfig['development'])

Model.knex(knex)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
