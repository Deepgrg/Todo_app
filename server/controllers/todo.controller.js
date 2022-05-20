const todoService = require("../services/todo.service");
const { successResponse } = require("../utils/responseHelper");

class TodoController {
  async getAllTodos(req, res, next) {
    try {
      const todos = await todoService.getAllTodos(req.query);
      successResponse(res, 200, "Todos fetched successfully", todos);
    } catch (err) {
      next(err);
    }
  }

  async getOneTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      const todo = await todoService.getOneTodo(todoId);
      successResponse(res, 200, "Todo fetched successfully", todo);
    } catch (err) {
      next(err);
    }
  }

  async createTodo(req, res, next) {
    try {
      await todoService.createTodo(req.body);
      successResponse(res, 201, "Todo created successfully", null);
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      await todoService.updateTodo(todoId, req.body);
      successResponse(res, 201, "Todo updated successfully", null);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      await todoService.deleteTodo(todoId);

      await successResponse(res, 200, "Todo deleted successfully", null);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TodoController();
