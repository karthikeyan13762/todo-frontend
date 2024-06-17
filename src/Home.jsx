import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

function Home() {
  const [todo, setTodo] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios
      .get("https://todo-backend-mj09.onrender.com/get")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleEdit(task) {
    setEditTask(task);
  }

  function handleDelete(id) {
    axios
      .delete("https://todo-backend-mj09.onrender.com/delete/" + id)
      .then(() => {
        setTodo(todo.filter((task) => task._id !== id));
        setEditTask(null);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdate(task) {
    axios
      .put("https://todo-backend-mj09.onrender.com/edit/" + task._id, task)
      .then((res) => {
        setTodo(todo.map((item) => (item._id === task._id ? res.data : item)));
        setEditTask(null);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="home">
      <h2 className="heading">Todo List App Using MERN Stack</h2>
      <Create
        setTodo={setTodo}
        editTask={editTask}
        handleUpdate={handleUpdate}
        setEditTask={setEditTask}
      />

      {todo.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        <div className="listContainer">
          {todo.map((data, index) => {
            return (
              <div key={index} className="listdata">
                <div className="checkbox">
                  <div onClick={() => handleEdit(data)}>
                    <i className="fa-solid fa-user-pen"></i>
                    <p id="data" className={data.done ? "line-throw" : ""}>
                      {data.task}
                    </p>
                  </div>
                </div>
                <div className="delete" onClick={() => handleDelete(data._id)}>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
