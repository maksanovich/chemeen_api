import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';

export class TraceAbilityModel extends Model { }

TraceAbilityModel.init({
    traceAbilityId: {
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
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rawMaterialQty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    headlessQty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usedCase: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ballanceCase: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    beforeDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'TraceAbilityModel',
    tableName: 'tbl_trace_ability',
    timestamps: true,
});

TraceAbilityModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(TraceAbilityModel, { foreignKey: 'PIId' });
