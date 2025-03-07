const Employee = require('../models/Employee');
const Leave = require('../models/leave');
const Task = require('../models/task');
const bcrypt = require('bcrypt');

exports.getDashboard = async (req, res) => {
    const employees = await Employee.findAll();
    const leaves = await Leave.findAll({ where: { employee_id: req.session.userId } });
    const tasks = await Task.findAll({ where: { employee_id: req.session.userId } });
    res.render('employee/dashboard', { employees, leaves, tasks });
};

exports.applyLeave = async (req, res) => {
    const { start_date, end_date, reason } = req.body;
    const employeeId = req.session.userId;
    await Leave.create({ employee_id: employeeId, start_date, end_date, reason });
    res.redirect('/employee/dashboard');
};

exports.updateTaskStatus = async (req, res) => {
    const { id, status } = req.body; // Get task ID and new status from the request body
    const employeeId = req.session.userId; // Assuming userId is the employee ID

    if (!employeeId) {
        return res.status(401).send('Unauthorized: No employee ID found in session.');
    }

    try {
        // Update the task status
        const [updated] = await Task.update({ status }, { where: { id, employee_id: employeeId } });

        if (updated) {
            return res.redirect('/employee/dashboard'); // Redirect to the dashboard if successful
        }
        throw new Error('Task not found or not updated');
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).send('Internal Server Error');
    }
};