import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class CompanyModel extends Model { }

CompanyModel.init({
    companyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    approvalNo: {
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
    modelName: 'CompanyModel',
    tableName: 'tbl_companies',
    timestamps: true,
});
