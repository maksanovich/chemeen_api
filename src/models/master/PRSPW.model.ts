import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRSPWModel extends Model { }

PRSPWModel.init({
    PRSPWId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSPWUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'PRSPWModel',
    tableName: 'tbl_prspw',
    timestamps: true,
});
