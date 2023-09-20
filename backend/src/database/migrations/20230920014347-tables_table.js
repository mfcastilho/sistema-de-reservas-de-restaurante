'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {

        await queryInterface.createTable('tables', {
            id: {
                type: Sequelize.STRING(90),
                primaryKey: true
            },
            table_number: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });

    },

    async down (queryInterface, Sequelize) {

        await queryInterface.dropTable('tables');

    }
};
