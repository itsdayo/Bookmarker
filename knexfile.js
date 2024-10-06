const {
  DATABASE_HOSTNAME,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DB,
} = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: DATABASE_HOSTNAME || "db",
      user: DATABASE_USERNAME || "myuser", // replace with your username
      password: DATABASE_PASSWORD || "mypassword", // replace with your password
      database: "web-maker", // replace with your database name
      port: 5432, // default PostgreSQL port
    },
    migrations: {
      directory: "./migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      database: DATABASE_DB,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      host: DATABASE_HOSTNAME,
      post: DATABASE_PORT || 5432,
    },
  },
};
