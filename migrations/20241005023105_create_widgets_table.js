/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async (knex) => {
    await knex.schema.createTableIfNotExists('widgets', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('pageId').references('id').inTable('pages');
      table.enu('widgetType', ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']);
      table.string('name');
      table.string('text');
      table.string('placeholder');
      table.string('url');
      table.string('width');
      table.string('height');
      table.integer('size');
      table.boolean('formatted');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
      
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('widgets');
  };

