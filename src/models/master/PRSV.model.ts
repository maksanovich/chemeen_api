import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRSVModel extends Model { }

PRSVModel.init({
    PRSVId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSVDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'PRSVModel',
    tableName: 'tbl_prsv',
    timestamps: true,
});
