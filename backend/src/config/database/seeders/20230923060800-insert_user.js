'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cryptedPassword = await bcrypt.hash("123", 10);
    const cryptedPassword2 = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', [
        {
            id: "hfky-f8s7d87-sdysdgf-ds78sy7-dsdhs97",
            name: "Davi",
            email: "davi@email.com",
            password: cryptedPassword,
            role: "client",
            created_at: "23-09-21 22:36:58.238-03",
            updated_at: "2023-09-21 22:36:58.238-03"
        },
        {
            id: "hfky-f8s7d87-sdyhfsg6s6gf-ds7fj7y7-dsdhs97",
            name: "Amanda",
            email: "amanda@email.com",
            password: cryptedPassword2,
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
