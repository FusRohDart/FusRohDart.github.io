import { DataTypes } from 'sequelize';

module.export = userModel;

function userModel(sequelize) {
    const elements = {
        userID: {
            allowNull: false,
            primaryKey: true
        },
        userUUID: {
            allowNull: false,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            Validate: {
                notNull: {
                    msg: "Must not be null!"
                }
            }
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        userTitle: {
            allowNull: false,
            type: DataTypes.STRING,
            DefaultValue: 'No title achieved yet.'
        },
        userDescription: {
            allowNull: true,
            type: DataTypes.STRING
        },
        totalPoints: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        },
        passHash: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }

    const options = {
        defaultScope: {
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', elements, options);
}