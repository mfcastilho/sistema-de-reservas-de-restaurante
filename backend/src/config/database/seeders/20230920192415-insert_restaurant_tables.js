'use strict';

const restaurantTablesInfos = require("../old/restaurantTablesTableInfos");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('tables', restaurantTablesInfos, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('tables', null, {});
    
  }
};
