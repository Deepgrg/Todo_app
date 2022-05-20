const Joi = require("joi").extend(require("@joi/date"));

const todoFilterSchema = Joi.object({
  filter: Joi.string().valid("upcoming", "done", "all"),
});

const todoIdSchema = Joi.object({
  todoId: Joi.number().integer().required().greater(0),
});

const todoCreateSchema = Joi.object({
  todo_name: Joi.string().min(3).max(30).trim(true).required(),
  todo_description: Joi.string().trim(true).required(),
  todo_date: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
});

const todoUpdateSchema = Joi.object({
  todoId: Joi.number().integer().required().greater(0),
  todo_name: Joi.string().min(3).max(30).trim(true).required(),
  todo_description: Joi.string().trim(true).required(),
  todo_date: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
  todo_status: Joi.boolean().required(),
});

module.exports = {
  todoIdSchema,
  todoCreateSchema,
  todoUpdateSchema,
  todoFilterSchema,
};
