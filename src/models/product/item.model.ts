import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import { PIModel } from './PI.model';
import { PRFModel } from '../master/PRF.model';
import { PRSModel } from '../master/PRS.model';
import { PRSTModel } from '../master/PRST.model';
import { PRSPModel } from '../master/PRSP.model';
import { PRSVModel } from '../master/PRSV.model';
import { PRSPSModel } from '../master/PRSPS.model';

export class ItemModel extends Model { }

ItemModel.init({
    ItemId: {
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
    marksNo: {
        type: DataTypes.STRING,
    },
    PRFId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRFModel,
            key: 'PRFId',
        },
    },
    PRSId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSModel,
            key: 'PRSId',
        },
    },
    PRSTId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSTModel,
            key: 'PRSTId',
        },
    },
    PRSPId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSPModel,
            key: 'PRSPId',
        },
    },
    PRSVId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSVModel,
            key: 'PRSVId',
        },
    },
    PRSPSId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSPSModel,
            key: 'PRSPSId',
        },
    }
}, {
    sequelize,
    modelName: 'ItemModel',
    tableName: 'tbl_items',
    timestamps: true,
});


// PIModel.belongsTo(CompanyModel, { foreignKey: 'exporterId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

// PIModel.belongsTo(CompanyModel, { foreignKey: 'processorId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

// PIModel.belongsTo(CompanyModel, { foreignKey: 'consigneeId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

// PIModel.belongsTo(BankModel, { foreignKey: 'bankId' });
// BankModel.hasMany(PIModel, { foreignKey: 'bankId' });

// PIModel.belongsTo(PortModel, { foreignKey: 'dischargePortId' });
// PortModel.hasMany(PIModel, { foreignKey: 'portId' });

// PIModel.belongsTo(PortModel, { foreignKey: 'loadingPortId' });
// PortModel.hasMany(PIModel, { foreignKey: 'portId' });

ItemModel.belongsTo(PRFModel, { foreignKey: 'PRFId' });
PRFModel.hasMany(ItemModel, { foreignKey: 'PRFId' });

ItemModel.belongsTo(PRSModel, { foreignKey: 'PRSId' });
PRSModel.hasMany(ItemModel, { foreignKey: 'PRSId' });

ItemModel.belongsTo(PRSTModel, { foreignKey: 'PRSTId' });
PRSTModel.hasMany(ItemModel, { foreignKey: 'PRSTId' });

ItemModel.belongsTo(PRSPModel, { foreignKey: 'PRSPId' });
PRSPModel.hasMany(ItemModel, { foreignKey: 'PRSPId' });

ItemModel.belongsTo(PRSVModel, { foreignKey: 'PRSVId' });
PRSVModel.hasMany(ItemModel, { foreignKey: 'PRSVId' });

ItemModel.belongsTo(PRSPSModel, { foreignKey: 'PRSPSId' });
PRSPSModel.hasMany(ItemModel, { foreignKey: 'PRSPSId' });

ItemModel.belongsTo(PIModel, { foreignKey: 'PIId' });
PIModel.hasMany(ItemModel, { foreignKey: 'PIId' });