export const up = (knex) =>
  knex.schema
    .raw(
      `CREATE OR REPLACE FUNCTION update_updated_at_column() 
    RETURNS TRIGGER AS $$
    BEGIN 
      NEW.updated_at = now(); 
      RETURN NEW; 
    END;
    $$ language 'plpgsql';`
    )
    .createTable('navers_projects', (table) => {
      table
        .integer('naver_id')
        .unsigned()
        .references('id')
        .inTable('navers')
        .onDelete('CASCADE')
        .index()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .index()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .raw(
      `CREATE TRIGGER update_navers_projects_updated_at BEFORE UPDATE 
        ON navers_projects FOR EACH ROW EXECUTE PROCEDURE
        update_updated_at_column();`
    )

export const down = (knex) => knex.schema.dropTable('navers_projects')
