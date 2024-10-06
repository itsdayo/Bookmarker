const { URL } = require('url');
const {
  DATABASE_HOSTNAME,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DB,
  DATABASE_URL
} = process.env;


const parsedUrl = new URL(DATABASE_URL);

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: DATABASE_HOSTNAME || "db",
      user: DATABASE_USERNAME || "postgres", 
      password: DATABASE_PASSWORD || "", 
      database: "web-maker", 
      port: 5432, // default PostgreSQL port
    },
    migrations: {
      directory: "./migrations",
    },
  },
  production: {
    client: 'pg',
    connection: {
      database: parsedUrl.pathname.slice(1),
      user: parsedUrl.username,
      password: parsedUrl.password,
      host: parsedUrl.hostname,
      port: parsedUrl.port || 5432,
    },
  },
};
