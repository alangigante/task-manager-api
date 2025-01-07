const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    passwordHistory: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    confirmationCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});
