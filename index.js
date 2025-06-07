const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Todo = require("./model/todo.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
}

app.get("/todo", async (req, res) => {
  let todolist = await Todo.find();
  res.render("index.ejs", { todolist });
});

// =========== post todo
app.post("/todo", (req, res) => {
  let { todoitem } = req.body;
  let newTodo = new Todo({
    todoitem: todoitem,
  });
  newTodo.save();
  res.redirect("/todo");
});

// ========== edit todo
app.get("/todo/:id/edit", async (req, res) => {
  let { id } = req.params;
  let edittodo = await Todo.findById(id);
  let todolist = await Todo.find();
  res.render("edit.ejs", { edittodo, todolist });
});

app.put("/todo/:id", async (req, res) => {
  let { id } = req.params;
  let { todoitem: todoitem } = req.body;
  let updateTodo = await Todo.findByIdAndUpdate(id, { todoitem: todoitem });
  res.redirect("/todo");
});

// ========= delete todo
app.delete("/todo/:id", async (req, res) => {
  let { id } = req.params;
  let deleteTodo = await Todo.findByIdAndDelete(id);
  res.redirect("/todo");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
