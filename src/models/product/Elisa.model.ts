import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';

export class ElisaModel extends Model { }

ElisaModel.init({
    elisaId: {
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
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    testReportNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    testReportDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rawMeterialDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productionCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sampleDrawnBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sampleId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rawMaterialType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rawMaterialReceived: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pondId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    samplingDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    samplingReceiptDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    testedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ElisaModel',
    tableName: 'tbl_elisa',
    timestamps: true,
});

ElisaModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(ElisaModel, { foreignKey: 'PIId' });
