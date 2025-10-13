import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PortModel extends Model { }

PortModel.init({
    portId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    portName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PortModel',
    tableName: 'tbl_ports',
    timestamps: true,
});
