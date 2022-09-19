import bcrypt from 'bcrypt'

export const seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      email: 'beltrano@domain.com',
      password: await bcrypt.hash('12345678', 12),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
