const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee dashboard
router.get('/dashboard', employeeController.getDashboard);

// Apply leave route
router.post('/apply-leave', employeeController.applyLeave);

// Update task status route
router.post('/update-task-status', employeeController.updateTaskStatus);

module.exports = router;