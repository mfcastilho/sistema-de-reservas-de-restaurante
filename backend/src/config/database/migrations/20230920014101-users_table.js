'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {

        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.STRING(90),
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(90),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(90),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(90),
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

        await queryInterface.dropTable('users');

    }
};
