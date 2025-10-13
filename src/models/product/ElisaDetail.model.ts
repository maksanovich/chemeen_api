import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';
import { ElisaModel } from './Elisa.model';
import { TestModel } from '../master/test.model';

export class ElisaDetailModel extends Model { }

ElisaDetailModel.init({
    elisaDetailId: {
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
    elisaId: {
        type: DataTypes.INTEGER,
        references: {
            model: ElisaModel, 
            key: 'elisaId',
        },
    },
    testId: {
        type: DataTypes.INTEGER,
        references: {
            model: TestModel, 
            key: 'testId',
        },
    },
    analytical: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    testResult: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detectionLimit: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ElisaDetailModel',
    tableName: 'tbl_elisa_detail',
    timestamps: true,
});

ElisaDetailModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(ElisaDetailModel, { foreignKey: 'PIId' });

ElisaDetailModel.belongsTo(ElisaModel, { foreignKey: 'elisaId' });
ElisaModel.hasMany(ElisaDetailModel, { foreignKey: 'elisaId' });

ElisaDetailModel.belongsTo(TestModel, { foreignKey: 'testId' });
TestModel.hasMany(ElisaDetailModel, { foreignKey: 'testId' });
