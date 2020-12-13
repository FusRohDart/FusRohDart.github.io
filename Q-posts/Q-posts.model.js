import { DataTypes } from 'sequelize';

module.export = modelQ;

function modelQ(sequelize) {
    const elements = {
        qID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            Validate: {
                notNull: {
                    msg: "Must not be null!"
                }
            }
        },
        qTitle: {
            allowNull: false,
            type: DataTypes.STRING
        },
        qBody: {
            allowNull: false,
            type: DataTypes.STRING
        },
        qUpCount: {
            allowNull: false,
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    }
}