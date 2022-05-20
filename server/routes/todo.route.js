const express = require("express");

const todoController = require("../controllers/todo.controller");
const { validator } = require("../middlewares/validator.middleware");
const {
  todoIdSchema,
  todoCreateSchema,
  todoUpdateSchema,
} = require("../schemas/todo.schema");

const todoRouter = express.Router();

todoRouter.get("/todos", todoController.getAllTodos);

todoRouter.get(
  "/todos/:todoId",
  validator(todoIdSchema),
  todoController.getOneTodo
);

todoRouter.post(
  "/todos",
  validator(todoCreateSchema),
  todoController.createTodo
);

todoRouter.put(
  "/todos/:todoId",
  validator(todoUpdateSchema),
  todoController.updateTodo
);

todoRouter.delete(
  "/todos/:todoId",
  validator(todoIdSchema),
  todoController.deleteTodo
);

module.exports = { todoRouter };
