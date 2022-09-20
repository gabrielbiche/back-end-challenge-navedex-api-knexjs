export const seed = async knex => {
  await knex('navers_projects').del()
  await knex('navers_projects').insert([
    {
      naver_id: 1,
      project_id: 1,
    },
    {
      naver_id: 2,
      project_id: 1,
    },
    {
      naver_id: 1,
      project_id: 3,
    }
  ])
}
