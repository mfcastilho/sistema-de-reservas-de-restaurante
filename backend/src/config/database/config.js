require("dotenv").config();

module.exports = {
    development: {
      dialect: process.env.DEV_DB_DIALECT,
      host: process.env.DEV_DB_HOST,
      username: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
      database: process.env.DEV_DB_NAME,
      logging: false,
      define: {
        underscored: true, 
      }
    },
    test: {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      define: {
        underscored: true, 
      }
    }
  };
  