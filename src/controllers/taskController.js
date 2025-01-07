const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
