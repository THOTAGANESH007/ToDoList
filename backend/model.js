const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  task: { type: String },
  done: { type: Boolean, default: false },
});
module.exports = mongoose.model("todos", ToDoSchema);
