const express = require("express");
const todoController = require("../controllers/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", todoController.getAllTodos);
todoRouter.get("/todos/{todoId}", todoController.getOneTodo);
todoRouter.post("/todos", todoController.createTodo);
todoRouter.put("/todos", todoController.updateTodo);
todoRouter.delete("/todos", todoController.deleteTodo);

module.exports = { todoRouter };
