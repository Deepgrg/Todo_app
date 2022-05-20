const { Todo } = require("../models");
const { NotFoundException } = require("../exceptions/notFoundException");

class TodoRepository {
  async getAllTodos() {
    const todos = await Todo.findAll();

    if (todos.length === 0) {
      throw new NotFoundException(`Todos not found`);
    }

    return todos;
  }

  async getDoneTodos() {
    const todos = await Todo.findAll({
      where: {
        todo_status: true,
      },
    });

    if (todos.length === 0) {
      throw new NotFoundException(`Todos are not done yet!`);
    }

    return todos;
  }

  async getUpcomingTodos() {
    const todos = await Todo.findAll({
      where: {
        todo_status: false,
      },
      order: [["todo_date", "ASC"]],
    });

    if (todos.length === 0) {
      throw new NotFoundException(`No upcoming todos!`);
    }

    return todos;
  }

  async getOneTodo(todoId) {
    const todo = await Todo.findOne({
      where: {
        todo_id: todoId,
      },
    });

    if (todo === null) {
      throw new NotFoundException(`Todo of id: ${todoId} doesnot exist`);
    }

    return todo;
  }

  async createTodo(todoData) {
    await Todo.create(todoData);
  }

  async updateTodo(todoId, todoData) {
    const todo = await this.getOneTodo(todoId);
    await todo.update(todoData);
  }

  async deleteTodo(todoId) {
    const todo = await this.getOneTodo(todoId);
    await todo.destroy();
  }
}

module.exports = new TodoRepository();
