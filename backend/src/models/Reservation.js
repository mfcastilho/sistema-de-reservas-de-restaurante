'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.STRING(90),
            primaryKey: true
        },
        id_user: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        id_table: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        date_hour_reservation: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tableName: "reservations",
        timestamps: true
    });

    Reservation.associate = (models) => {
    
        Reservation.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user',
        });

        Reservation.belongsTo(models.Table, {
            foreignKey: 'id_table',
            as: 'table',
        });

    };

    return Reservation;

};