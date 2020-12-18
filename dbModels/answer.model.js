const { DataTypes } = require('sequelize');

module.exports = modelA;

function modelA(sequelize) {
    const elements = {
        aID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36),
            defaultValue: DataTypes.UUIDV4,
        },
        aBody: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        aUpCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        },
        aDownCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    }

    return sequelize.define('Answer', elements);
}