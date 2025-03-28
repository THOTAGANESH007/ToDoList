import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/get`)
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, [todos]);

  const handleEdit = (id, done) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/update/${id}`, { done: !done }) // Send updated 'done' status
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div
              className="checkbox"
              onClick={() => handleEdit(todo._id, todo.done)}
            >
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>
                {todo.task || "No Task"}
              </p>
            </div>
            <div>
              <span>
                <BsTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
