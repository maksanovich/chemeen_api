import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class BankModel extends Model { }

BankModel.init({
    bankId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    acNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    swift: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IFSCCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address2: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    mobile: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'BankModel',
    tableName: 'tbl_banks',
    timestamps: true,
});
