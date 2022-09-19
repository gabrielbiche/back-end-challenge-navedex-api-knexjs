export const seed = async (knex) => {
  await knex('projects').del()
  await knex('projects').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Projeto bom',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      user_id: 1,
      name: 'Projeto realmente bom',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: 'Projeto muito bom',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
