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

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    handleClick(); // Call your handleClick function
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Add onSubmit event */}
        <input
          type="text"
          id="create_form_input"
          name="task"
          placeholder="Enter a task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button type="submit" id="create_form_button">
          {" "}
          {/* Change button type to submit */}
          {editTask ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default Create;
