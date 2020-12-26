const { DataTypes } = require('sequelize');

module.exports = modelC;

function modelC(sequelize) {
    const elements = {
        cBody: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Write your comment here.'
        },
        cUpCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        },
        cDownCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        },
        cNetVoteCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    }

    return sequelize.define('Comment', elements);
}