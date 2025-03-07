const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // or 'bcryptjs' if using bcryptjs

const managerController = require('../controllers/managerController');

// Manager dashboard
router.get('/dashboard', managerController.getDashboard);

// Assign task route
router.post('/assign-task', managerController.assignTask);

// Other manager routes
router.post('/create-employee', managerController.createEmployee);
router.post('/approve-leave/:id', managerController.approveLeave);
router.post('/reject-leave/:id', managerController.rejectLeave);
router.get('/attendance-report', managerController.getAttendanceReport);

module.exports = router;
