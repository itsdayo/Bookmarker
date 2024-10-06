/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTableIfNotExists('pages', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('websiteId').references('id').inTable('websites');
      table.string('name');
      table.string('title');
      table.string('description');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('pages');
  };
