const { DataTypes } = require('sequelize');

module.exports = modelQ;

function modelQ(sequelize) {
    const elements = {
        qID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36),
            defaultValue: DataTypes.UUIDV4,
        },
        qTitle: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'Question must have a title.'
        },
        qBody: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'Explain your question here.'
        },
        qUpCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    }

    return sequelize.define('Question', elements);
}