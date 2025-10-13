import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PIModel } from './PI.model';
import { CompanyModel } from '../master/company.model';
import { PRSGModel } from '../master/PRSG.model';
import { ItemModel } from './item.model';

export class CodeListModel extends Model { }

CodeListModel.init({
    codeId: {
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
        references: {
            model: ItemModel, 
            key: 'ItemId',
        },
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    farmId: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyModel, 
            key: 'companyId',
        },
    },
    PRSGId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSGModel, 
            key: 'PRSGId',
        },
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CodeListModel',
    tableName: 'tbl_code_list',
    timestamps: true,
});

CodeListModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(CodeListModel, { foreignKey: 'PIId' });

CodeListModel.belongsTo(PRSGModel, { foreignKey: 'PRSGId' });
PRSGModel.hasMany(CodeListModel, { foreignKey: 'PRSGId' });

CodeListModel.belongsTo(ItemModel, { foreignKey: 'ItemId' });
ItemModel.hasMany(CodeListModel, { foreignKey: 'ItemId' });
