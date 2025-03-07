const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./employee'); // Ensure this is imported correctly

class Task extends Model {}

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    sequelize,
    modelName: 'Task',
});


// Define associations
Task.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Task;
