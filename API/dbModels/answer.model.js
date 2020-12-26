const { DataTypes } = require('sequelize');

module.exports = modelA;

function modelA(sequelize) {
    const elements = {
        aBody: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Write your answer here.'
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
        },
        aNetVoteCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    }

    return sequelize.define('Answer', elements);
}