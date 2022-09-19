export const seed = async (knex) => {
  await knex('navers').del()
  await knex('navers').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Fulano',
      birthdate: '1999-05-15',
      admission_date: '2020-06-12',
      job_role: 'Desenvolvedor',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      user_id: 1,
      name: 'Ciclano',
      birthdate: '1992-10-28',
      admission_date: '2018-06-12',
      job_role: 'Desenvolvedor',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
