// config/database.js
const { Sequelize } = require('sequelize');

const environment = process.env.NODE_ENV || 'development';

let sequelize;

if (environment === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    host: 'localhost',
    username: 'seu-usuario',
    password: 'sua-senha',
    database: 'nome-do-banco',
    logging: false,
  });
} else if (environment === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'seu-usuario',
    password: 'sua-senha',
    database: 'nome-do-banco',
    logging: false,
  });
}

module.exports = sequelize;
