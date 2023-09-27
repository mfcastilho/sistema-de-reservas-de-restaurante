'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cryptedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('reservations', [
        {
            id: "sfa7f-9ahaufs7sfkjs8-7sdy98-suyd9g-8ys9f7gd",
            id_user: "hfky-f8s7d87-sdysdgf-ds78sy7-dsdhs97",
            id_table: "8f3z81h8-cg2d-2357-2g32-cf45h5713c6",
            date_hour_reservation: "2023-10-10 19:00:00-03",
            created_at: "23-09-21 22:36:58.238-03",
            updated_at: "2023-09-21 22:36:58.238-03"
        },
        {
            id: "sf35dfs564-js8-7sdy98-suyd9g-8ys9f7gd",
            id_user: "hfky-f8s7d87-sdyhfsg6s6gf-ds7fj7y7-dsdhs97",
            id_table: "b91e7d7e526798aa496662c641b7146a",
            date_hour_reservation: "2023-10-10 19:00:00-03",
            created_at: "23-09-21 22:36:58.238-03",
            updated_at: "2023-09-21 22:36:58.238-03"
        }
        
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('reservations', null, {});
    
  }
};
