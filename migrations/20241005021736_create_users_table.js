/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTableIfNotExists('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('username').unique();
      table.string('password');
      table.string('firstName');
      table.string('lastName');
      table.string('email').unique();
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('users');
  };
