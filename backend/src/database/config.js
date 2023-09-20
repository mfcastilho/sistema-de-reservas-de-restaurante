require("dotenv").config();


module.exports = {

  "development": {
    "username": process.env.DEV_DB_USER,
    "password":process.env.DEV_DB_PASS,
    "database":process.env.DEV_DB_NAME,
    "host":process.env.DEV_DB_HOST,
    "dialect":process.env.DEV_DB_DIALECT,
    define: {
        underscored: true,
    }, 
  },

  "test": {
    "username":process.env.TEST_DB_USER,
    "password":process.env.TEST_DB_PASS,
    "database":process.env.TEST_DB_NAME,
    "host":process.env.TEST_DB_HOST,
    "dialect":process.env.TEST_DB_DIALECT,
    define: {
        underscored: true,
    },
  },

  "production": {
    "username": process.env.PROD_DB_USER,
    "password": process.env.PROD_DB_PASS,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOST,
    "dialect": process.env.PROD_DB_DIALECT,
    define: {
        underscored: true,
    },
  }
  
}
