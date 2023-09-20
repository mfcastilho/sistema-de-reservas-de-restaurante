'use strict';
module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
        id: {
            type: DataTypes.STRING(90),
            primaryKey: true
        },
        table_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: "tables",
        timestamps: true
    });

    Table.associate = (models) => {
        Table.hasMany(models.Reservation, {
        foreignKey: 'id_table',
        as: 'reservation',
        });
    };

    return Table;

};