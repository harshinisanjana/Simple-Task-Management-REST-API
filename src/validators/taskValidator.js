const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional()
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "Title must not be empty").max(255).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};
