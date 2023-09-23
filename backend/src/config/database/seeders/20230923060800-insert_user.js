'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cryptedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', [
        {
            id: "hfkyf8s7d87sdysdgfds78sy7dsdhs97",
            name: "Davi",
            email: "davi@email.com",
            password: cryptedPassword,
            role: "client",
            created_at: "23-09-21 22:36:58.238-03",
            updated_at: "2023-09-21 22:36:58.238-03"
        }
        
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
    
  }
};
