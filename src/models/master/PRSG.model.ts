import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import { PRSPSModel } from './PRSPS.model'; 

export class PRSGModel extends Model { }

PRSGModel.init({
    PRSGId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSPSId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSPSModel, 
            key: 'PRSPSId',
        },
    },
    PRSGDesc: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'PRSGModel',
    tableName: 'tbl_prsg',
    timestamps: true,
});


// Define the association
PRSGModel.belongsTo(PRSPSModel, { foreignKey: 'PRSPSId' });
PRSPSModel.hasMany(PRSGModel, { foreignKey: 'PRSPSId' });