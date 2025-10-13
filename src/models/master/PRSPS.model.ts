import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRSPSModel extends Model { }

PRSPSModel.init({
    PRSPSId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSPSDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'PRSPSModel',
    tableName: 'tbl_prsps',
    timestamps: true,
});
