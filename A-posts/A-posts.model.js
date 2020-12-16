const { DataTypes } = require('sequelize');

module.exports = modelA;

function modelA(sequelize) {
    const elements = {
        aID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36),
            defaultValue: DataTypes.UUIDV4,
            Validate: {
                notNull: {
                    msg: "Must not be null!"
                }
            }
        },
        aTitle: {
            allowNull: false,
            type: DataTypes.STRING
        },
        aBody: {
            allowNull: false,
            type: DataTypes.STRING
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

    return sequelize.define('answers', elements);
}