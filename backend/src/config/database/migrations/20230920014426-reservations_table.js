'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {

        await queryInterface.createTable('reservations', {
            id: {
                type: Sequelize.STRING(90),
                primaryKey: true
            },
            id_user: {
                type: Sequelize.STRING(90),
                allowNull: false
            },
            id_table: {
                type: Sequelize.STRING(90),
                allowNull: false
            },
            date_hour_reservation: {
                type: Sequelize.DATE,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        });

    },

    async down (queryInterface, Sequelize) {

        await queryInterface.dropTable('reservations');

    }
};
