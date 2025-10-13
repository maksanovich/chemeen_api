import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRSTModel extends Model { }

PRSTModel.init({
    PRSTId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSTName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'PRSTModel',
    tableName: 'tbl_prst',
    timestamps: true,
});
