const joi = require("joi");

const todoIdSchema = Joi.object({
  todoId: Joi.number().integer().required().greater(0),
});
