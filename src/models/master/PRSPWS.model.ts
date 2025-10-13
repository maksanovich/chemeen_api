import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class PRSPWSModel extends Model { }

PRSPWSModel.init({
    PRSPWSId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSPWSStyle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'PRSPWSModel',
    tableName: 'tbl_prspws',
    timestamps: true,
});
