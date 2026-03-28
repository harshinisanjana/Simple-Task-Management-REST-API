const taskService = require('../services/taskService');

class TaskController {
    asyncHandler = (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

    createTask = this.asyncHandler(async (req, res) => {
        const task = await taskService.createTask(req.body);
        res.status(201).json({ success: true, data: task });
    });

    getAllTasks = this.asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const tasks = await taskService.getAllTasks(page, limit);
        res.status(200).json({ success: true, data: tasks, meta: { page, limit, count: tasks.length } });
    });

    getTaskById = this.asyncHandler(async (req, res) => {
        const task = await taskService.getTaskById(req.params.id);
        res.status(200).json({ success: true, data: task });
    });

    updateTask = this.asyncHandler(async (req, res) => {
        const task = await taskService.updateTask(req.params.id, req.body);
        res.status(200).json({ success: true, data: task });
    });

    deleteTask = this.asyncHandler(async (req, res) => {
        await taskService.deleteTask(req.params.id);
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    });
}

module.exports = new TaskController();
