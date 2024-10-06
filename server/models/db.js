const knex = require("knex");
const knexConfig = require("../../knexfile"); // Adjust the path if necessary

// Use the development configuration by default
let db = knex(knexConfig.development);

// If you're in a production environment, you can switch to production settings

if (process.env.NODE_ENV === "production") {
  db = knex(knexConfig.production);
}

// Export the Knex instance
module.exports = db;
