const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/create', taskController.getCreateTask);
router.post('/', taskController.createTask);
router.post('/:id/update', taskController.updateTask);
router.post('/:id/delete', taskController.deleteTask);

module.exports = router;
