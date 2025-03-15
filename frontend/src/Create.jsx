import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");
  const addTask = (event) => {
    setTask(event.target.value);
  };
  const handleAdd = () => {
    if (!task.trim()) {
      alert("Please enter a task!");
      return;
    }

    axios
      .post("http://localhost:7770/add", { task: task })
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div className="create_form">
      <input
        type="text"
        className="input"
        placeholder="Enter a Task"
        value={task}
        onChange={addTask}
      />
      <button className="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
export default Create;
