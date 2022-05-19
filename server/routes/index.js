const express = require("express");

const { todoRouter } = require("./todo.route");

const router = express.Router();

router.get("/test-server", (req, res, next) => {
  res.json({
    message: "Server is up and running",
  });
});

router.use(todoRouter);

module.exports = { router };
