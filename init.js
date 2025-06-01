const mongoose = require("mongoose");
const Todo = require("./model/todo.js");

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
}

const todo1 = new Todo({
  todoitem: "hello world",
});

todo1.save().then((res)=> console.log(res))