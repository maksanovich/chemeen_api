import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 
import { PRSGModel } from '../master/PRSG.model';
import { ItemModel } from './item.model';

export class ItemDetailModel extends Model { }

ItemDetailModel.init({
    itemDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ItemId: {
        type: DataTypes.INTEGER,
        references: {
            model: ItemModel, 
            key: 'ItemId',
        },
    },
    PRSGId: {
        type: DataTypes.INTEGER,
        references: {
            model: PRSGModel, 
            key: 'PRSGId',
        },
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cartons: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kgQty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usdRate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usdAmount: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ItemDetailModel',
    tableName: 'tbl_item_details',
    timestamps: true,
});

ItemDetailModel.belongsTo(ItemModel, { foreignKey: 'ItemId' });
ItemModel.hasMany(ItemDetailModel, { foreignKey: 'ItemId' });

ItemDetailModel.belongsTo(PRSGModel, { foreignKey: 'PRSGId' });
PRSGModel.hasMany(ItemDetailModel, { foreignKey: 'PRSGId' });