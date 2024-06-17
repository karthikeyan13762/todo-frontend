import React, { useState, useEffect } from "react";
import axios from "axios";

function Create({ setTodo, editTask, handleUpdate, setEditTask }) {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (editTask) {
      setTask(editTask.task);
    } else {
      setTask("");
    }
  }, [editTask]);

  function handleClick() {
    if (!task.trim()) {
      return;
    }

    if (editTask) {
      handleUpdate({ ...editTask, task });
      setEditTask(null);
    } else {
      axios
        .post("https://todo-backend-mj09.onrender.com/add", { task })
        .then((res) => {
          setTodo((prev) => [...prev, res.data]);
          setTask("");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <form method="post">
        <input
          type="text"
          id="create_form_input"
          name="task"
          placeholder="Enter a task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button type="button" id="create_form_button" onClick={handleClick}>
          {editTask ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default Create;
