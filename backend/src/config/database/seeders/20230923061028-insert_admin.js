'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cryptedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', [
        {
            id: "sfa7f-99hjs7d8-7sdy98-sujajdg-8ys9f7gd",
            name: "Mario",
            email: "mario@email.com",
            password: cryptedPassword,
            role: "admin",
            created_at: "23-09-21 22:36:58.238-03",
            updated_at: "2023-09-21 22:36:58.238-03"
        }
        
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
    
  }
};
