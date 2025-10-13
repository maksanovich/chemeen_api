import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRFModel extends Model { }

PRFModel.init({
    PRFId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRFName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    HSN: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PRFModel',
    tableName: 'tbl_prf',
    timestamps: true,
});
