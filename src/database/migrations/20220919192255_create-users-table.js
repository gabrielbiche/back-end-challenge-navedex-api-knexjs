export const up = (knex) =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .raw(
      `CREATE OR REPLACE FUNCTION update_updated_at_column() 
    RETURNS TRIGGER AS $$
    BEGIN 
      NEW.updated_at = now(); 
      RETURN NEW; 
    END;
    $$ language 'plpgsql';`
    )
    .createTable('users', (table) => {
      table.increments('id').primary()
      table.specificType('email', 'CITEXT').unique().notNullable()
      table.string('password').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .raw(
      `CREATE TRIGGER update_users_updated_at BEFORE UPDATE 
        ON users FOR EACH ROW EXECUTE PROCEDURE
        update_updated_at_column();`
    )

export const down = (knex) => knex.schema.dropTable('users')
