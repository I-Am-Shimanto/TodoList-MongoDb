const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoitem: String,
});

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo