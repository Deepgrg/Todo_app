const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database.config");

const Todo = sequelize.define(
  "todos",
  {
    todo_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    todo_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todo_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    todo_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // options
  }
);

module.exports = { Todo };
