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
    .createTable('navers', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.date('birthdate').notNullable()
      table.date('admission_date').notNullable()
      table.string('job_role').notNullable()
      table.integer('user_id').unsigned()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .raw(
      `CREATE TRIGGER update_navers_updated_at BEFORE UPDATE 
        ON navers FOR EACH ROW EXECUTE PROCEDURE
        update_updated_at_column();`
    )

export const down = (knex) => knex.schema.dropTable('navers')
