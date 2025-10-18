import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default User; 