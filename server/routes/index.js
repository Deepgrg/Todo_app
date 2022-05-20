const express = require("express");

const { todoRouter } = require("./todo.route");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Server is up and running",
  });
});

router.use("/api/v1", todoRouter); // /api/v1/todos

module.exports = { router };
