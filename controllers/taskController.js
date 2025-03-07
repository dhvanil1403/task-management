const { Task } = require('../models');

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.findAll();
    res.render('tasks/index', { tasks });
};

exports.getCreateTask = (req, res) => {
    res.render('tasks/create');
};

exports.createTask = async (req, res) => {
    await Task.create({ title: req.body.title, description: req.body.description });
    res.redirect('/tasks');
};

exports.updateTask = async (req, res) => {
    await Task.update({ status: req.body.status }, { where: { id: req.params.id } });
    res.redirect('/tasks');
};

exports.deleteTask = async (req, res) => {
    await Task.destroy({ where: { id: req.params.id } });
    res.redirect('/tasks');
};
