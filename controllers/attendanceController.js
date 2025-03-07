const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
    const employeeId = req.session.userId;
    const date = new Date().toISOString().split('T')[0];
    await Attendance.create({
        employee_id: employeeId,
        check_in: new Date(),
        date,
    });
    res.redirect('/employee/dashboard');
};

exports.checkOut = async (req, res) => {
    const employeeId = req.session.userId;
    const date = new Date().toISOString().split('T')[0];
    await Attendance.update(
        { check_out: new Date() },
        { where: { employee_id: employeeId, date } }
    );
    res.redirect('/employee/dashboard');
};