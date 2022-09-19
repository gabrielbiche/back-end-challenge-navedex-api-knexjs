export const seed = async knex => {
  await knex('navers_projects').del()
  await knex('navers_projects').insert([
    {
      naver_id: 1,
      project_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      naver_id: 2,
      project_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      naver_id: 1,
      project_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
}
