const { v4: uuidv4 } = require('uuid');
const taskRepository = require('../repositories/taskRepository');

class TaskService {
    async createTask(data) {
        const newTask = {
            id: uuidv4(),
            title: data.title,
            description: data.description || null,
            status: data.status || 'pending'
        };
        return await taskRepository.create(newTask);
    }

    async getAllTasks(page = 1, limit = 10) {
        return await taskRepository.findAll(page, limit);
    }

    async getTaskById(id) {
        const task = await taskRepository.findById(id);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        return task;
    }

    async updateTask(id, data) {
        await this.getTaskById(id);

        return await taskRepository.update(id, data);
    }

    async deleteTask(id) {
        await this.getTaskById(id);

        const deleted = await taskRepository.softDelete(id);
        if (!deleted) {
            const error = new Error('Failed to delete task');
            error.statusCode = 500;
            throw error;
        }
        return true;
    }
}

module.exports = new TaskService();
