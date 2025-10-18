import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';

export class ElisaPDFModel extends Model { }

ElisaPDFModel.init({
    pdfId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PIId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PIModel, 
            key: 'PIId',
        },
    },
    pdfName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    filePath: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'ElisaPDFModel',
    tableName: 'tbl_elisa_pdf',
    timestamps: true,
});

ElisaPDFModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(ElisaPDFModel, { foreignKey: 'PIId' });

