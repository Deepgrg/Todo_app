const todoRepository = require("../repositories/todo.repository");

class TodoService {
  async getAllTodos() {
    try {
      const todos = todoRepository.getAllTodos();
      return todos;
    } catch (err) {
      throw err;
    }
  }

  async getOneTodo(todoId) {
    const todo = todoRepository.getOneTodo(todoId);
    return todo;
  }

  async createTodo(todoData) {
    try {
      await todoRepository.createTodo(todoData);
    } catch (err) {
      throw err;
    }
  }

  async updateTodo(todoId, todoData) {
    try {
      await todoRepository.updateTodo(todoId, todoData);
    } catch (err) {
      throw err;
    }
  }

  async deleteTodo(todoId) {
    try {
      await todoRepository.deleteTodo(todoId);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new TodoService();
