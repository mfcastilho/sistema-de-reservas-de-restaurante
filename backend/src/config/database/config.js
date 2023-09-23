require("dotenv").config();


module.exports = {

  "development": {
    "username": process.env.DEV_DB_USER,
    "password":process.env.DEV_DB_PASS,
    "database":process.env.NODE_ENV === "test" ? "db_restaurante_test" : process.env.DEV_DB_NAME,
    "host":process.env.DEV_DB_HOST,
    "dialect":process.env.DEV_DB_DIALECT,
    define: {
        underscored: true,
    }, 
  },

  "test": {
    "username": process.env.DEV_DB_USER,
    "password":process.env.DEV_DB_PASS,
    "database":"db_restaurante_test",
    "host":process.env.DEV_DB_HOST,
    "dialect":process.env.DEV_DB_DIALECT,
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


