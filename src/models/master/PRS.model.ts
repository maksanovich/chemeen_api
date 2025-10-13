import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import { PRFModel } from './PRF.model'; 

export class PRSModel extends Model { }

PRSModel.init({
    PRSId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRFId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRFModel, 
            key: 'PRFId',
        },
    },
    PRSName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    scientificName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PRSModel',
    tableName: 'tbl_prs',
    timestamps: true,
});


// Define the association
PRSModel.belongsTo(PRFModel, { foreignKey: 'PRFId' });
PRFModel.hasMany(PRSModel, { foreignKey: 'PRFId' });