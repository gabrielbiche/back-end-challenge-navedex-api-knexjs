import { DATABASE_URL } from '../config'

export const development = {
  client: 'pg',
  connection: DATABASE_URL,
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
}

export default { development }
