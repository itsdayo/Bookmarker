/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTableIfNotExists('websites', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('developerId').references('id').inTable('users');
      table.string('name');
      table.string('description');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('websites');
  };
