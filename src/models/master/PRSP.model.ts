import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import { PRSPWModel } from './PRSPW.model'; 
import { PRSPWSModel } from './PRSPWS.model';

export class PRSPModel extends Model { }

PRSPModel.init({
    PRSPId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PRSPPiece: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PRSPWeight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PRSPWId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSPWModel, 
            key: 'PRSPWId',
        },
    },
    PRSPWSId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSPWSModel, 
            key: 'PRSPWSId',
        },
    }
}, {
    sequelize,
    modelName: 'PRSPModel',
    tableName: 'tbl_prsp',
    timestamps: true,
});

PRSPModel.belongsTo(PRSPWModel, { foreignKey: 'PRSPWId' });
PRSPWModel.hasMany(PRSPModel, { foreignKey: 'PRSPWId' });

PRSPModel.belongsTo(PRSPWSModel, { foreignKey: 'PRSPWSId' });
PRSPWSModel.hasMany(PRSPModel, { foreignKey: 'PRSPWSId' });