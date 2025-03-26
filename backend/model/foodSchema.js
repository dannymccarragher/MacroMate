import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Food = sequelize.define('Food', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    protein: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    carbs: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fat: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export default Food;
