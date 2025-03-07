const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee'); // Ensure this is imported correctly

class Attendance extends Model {}

Attendance.init({
    check_in: {
        type: DataTypes.DATE,
    },
    check_out: {
        type: DataTypes.DATE,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Attendance',
});

// Define associations
Attendance.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Attendance;