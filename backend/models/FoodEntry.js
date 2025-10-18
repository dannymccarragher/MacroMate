import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const FoodEntry = sequelize.define('FoodEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    food_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    weight_grams: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calories: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    carbohydrates: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    protein: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fats: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'food_entries',
    timestamps: true,
    createdAt: 'entry_date',
    updatedAt: false
});

export default FoodEntry;

