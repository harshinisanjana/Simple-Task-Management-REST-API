const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/auth');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');

router.use(authenticate);

router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
