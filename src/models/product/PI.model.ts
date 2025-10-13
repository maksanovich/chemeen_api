import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { CompanyModel } from '../master/company.model';
import { BankModel } from '../master/bank.model';
import { PortModel } from '../master/port.model';

export class PIModel extends Model { }

PIModel.init({
    PIId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PINo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    PIDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GSTIn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PONumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    POQuality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    exporterId: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyModel, 
            key: 'companyId',
        },
    },
    processorId: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyModel, 
            key: 'companyId',
        },
    },
    consigneeId: {
        type: DataTypes.INTEGER,
        references: {
            model: CompanyModel, 
            key: 'companyId',
        },
    },
    bankId: {
        type: DataTypes.INTEGER,
        references: {
            model: BankModel, 
            key: 'bankId',
        },
    },
    TDP: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loadingPortId: {
        type: DataTypes.INTEGER,
        references: {
            model: PortModel, 
            key: 'portId',
        },
    },
    dischargePortId: {
        type: DataTypes.INTEGER,
        references: {
            model: PortModel, 
            key: 'portId',
        },
    },
    containerNumber: {
        type: DataTypes.STRING
    },
    linerNumber: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'PIModel',
    tableName: 'tbl_pi',
    timestamps: true,
});


// PIModel.belongsTo(CompanyModel, { foreignKey: 'exporterId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

// PIModel.belongsTo(CompanyModel, { foreignKey: 'processorId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

// PIModel.belongsTo(CompanyModel, { foreignKey: 'consigneeId' });
// CompanyModel.hasMany(PIModel, { foreignKey: 'companyId' });

PIModel.belongsTo(BankModel, { foreignKey: 'bankId' });
BankModel.hasMany(PIModel, { foreignKey: 'bankId' });

// PIModel.belongsTo(PortModel, { foreignKey: 'dischargePortId' });
// PortModel.hasMany(PIModel, { foreignKey: 'portId' });

// PIModel.belongsTo(PortModel, { foreignKey: 'loadingPortId' });
// PortModel.hasMany(PIModel, { foreignKey: 'portId' });
