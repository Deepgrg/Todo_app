const Joi = require("joi");

const todoIdSchema = Joi.object({
  todoId: Joi.number().integer().required().greater(0),
});

const todoCreateSchema = Joi.object({
  todo_name: Joi.string().min(3).max(30).required(),
  todo_description: Joi.string(),
});

const todoUpdateSchema = Joi.object({
  todoId: Joi.number().integer().required().greater(0),
  todo_name: Joi.string().min(3).max(30).required(),
  todo_description: Joi.string(),
  todo_status: Joi.boolean().required(),
});

module.exports = { todoIdSchema, todoCreateSchema, todoUpdateSchema };
