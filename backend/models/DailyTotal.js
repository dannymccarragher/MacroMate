import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js';

const DailyTotal = sequelize.define('DailyTotal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_calories: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_carbohydrates: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_protein: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_fats: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'date']
        }
    ]
});

// Define associations
DailyTotal.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(DailyTotal, { foreignKey: 'user_id' });

export default DailyTotal; 