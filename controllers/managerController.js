const Employee = require('../models/Employee');
const Leave = require('../models/leave');
const Task = require('../models/task');

exports.getDashboard = async (req, res) => {
    const employees = await Employee.findAll();
    const leaves = await Leave.findAll({ include: Employee });
    const tasks = await Task.findAll({ include: Employee });
    res.render('manager/dashboard', { employees, leaves, tasks });
};

exports.createEmployee = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Employee.create({ name, email, password: hashedPassword, role });
    res.redirect('/manager/dashboard');
};

exports.assignTask = async (req, res) => {
    const { title, description, employee_id } = req.body;
    const manager_id = req.session.userId; // Get the logged-in manager's ID
    await Task.create({ title, description, employee_id, manager_id });
    res.redirect('/manager/dashboard');
};

exports.approveLeave = async (req, res) => {
    const { id } = req.params; // Leave ID from the request parameters
    await Leave.update({ status: 'approved' }, { where: { id } });
    res.redirect('/manager/dashboard');
};

exports.rejectLeave = async (req, res) => {
    const { id } = req.params; // Leave ID from the request parameters
    await Leave.update({ status: 'rejected' }, { where: { id } });
    res.redirect('/manager/dashboard');
};

exports.getAttendanceReport = async (req, res) => {
    const attendance = await Attendance.findAll();
    res.render('manager/attendanceReport', { attendance });
};