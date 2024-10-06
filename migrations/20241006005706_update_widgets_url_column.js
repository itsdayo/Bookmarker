/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.alterTable('widgets', (table) => {
      table.string('url', 1000).alter();
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.alterTable('widgets', (table) => {
      table.string('url', 255).alter();
    });
  };
