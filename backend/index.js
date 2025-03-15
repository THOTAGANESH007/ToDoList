const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDo = require("./model");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/tiger")
  .then(console.log("Connected to Mongo..."))
  .catch(console.log("Something Went Wrong..."));

app.get("/get", (_, res) => {
  ToDo.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  try {
    const { done } = req.body; // Get 'done' from request body
    const updatedTask = await ToDo.findByIdAndUpdate(
      req.params.id,
      { done: done }, // Update the 'done' field
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  ToDo.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  ToDo.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(7770, () => {
  console.log("Listening...");
});
