import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize'; 

export class TestModel extends Model { }

TestModel.init({
    testId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    testDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'TestModel',
    tableName: 'tbl_test',
    timestamps: true,
});
