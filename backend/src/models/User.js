'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING(90),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(90),
            allowNull: false
        }
    },{
        tableName: "users",
        timestamps: true
    });

    // User.associate = (models) => {
    //     User.hasMany(models.Reservation, {
    //         foreignKey: 'id_user',
    //         as: 'reservation',
    //     });
    // };

    return User;

};
