import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';

export class BARModel extends Model { }

BARModel.init({
    BARId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PIId: {
        type: DataTypes.INTEGER,
        references: {
            model: PIModel, 
            key: 'PIId',
        },
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    analysisDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completionDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPlateCnt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ECFU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SCFU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salmone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vibrioC: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vibrioP: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    listeria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'BARModel',
    tableName: 'tbl_bar',
    timestamps: true,
});

BARModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(BARModel, { foreignKey: 'PIId' });
