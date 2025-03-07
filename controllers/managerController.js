const Employee = require('../models/employee');
const Leave = require('../models/leave');
const Task = require('../models/task');
const bcrypt = require('bcrypt'); // or 'bcryptjs' if using bcryptjs

exports.getDashboard = async (req, res) => {
    const employees = await Employee.findAll();
    const leaves = await Leave.findAll({ include: Employee });
    const tasks = await Task.findAll({ include: Employee });
    res.render('manager/dashboard', { employees, leaves, tasks });
};


exports.createEmployee = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if email is already in use
        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ error: "Email already in use." });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create employee record
        await Employee.create({ name, email, password: hashedPassword, role });

        // Redirect to dashboard with success message
        res.redirect('/manager/dashboard?success=Employee+created+successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating employee." });
    }
};
exports.assignTask = async (req, res) => {
    const { title, description, employee_id } = req.body;
    const manager_id = req.session.userId; // Get the logged-in manager's ID
    await Task.create({ title, description, employee_id, manager_id });
    res.redirect('/manager/dashboard');
};

exports.approveLeave = async (req, res) => {
    try {
        const { id } = req.params; // Leave ID from the request parameters
        const leave = await Leave.findByPk(id);
        if (!leave) {
            return res.status(404).json({ error: "Leave request not found." });
        }
        await Leave.update({ status: 'approved' }, { where: { id } });
        res.redirect('/manager/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error approving leave." });
    }
};

exports.rejectLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByPk(id);
        if (!leave) {
            return res.status(404).json({ error: "Leave request not found." });
        }
        await Leave.update({ status: 'rejected' }, { where: { id } });
        res.redirect('/manager/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error rejecting leave." });
    }
};
redirect('/manager/dashboard');
};

exports.getAttendanceReport = async (req, res) => {
    const attendance = await Attendance.findAll();
    res.render('manager/attendanceReport', { attendance });
};
