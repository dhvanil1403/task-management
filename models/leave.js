const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee'); // Ensure this is imported correctly

class Leave extends Model {}

Leave.init({
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    sequelize,
    modelName: 'Leave',
});

// Define associations
Leave.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Leave;
