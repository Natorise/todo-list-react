import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Tasks from "./components/Tasks";

import { Task } from "./Task";

let taskss: Task[] = [
  {
    name: "Create React App",
    description: "Make todo app in react.",
    completed: true,
  },
  {
    name: "Master React",
    description: "",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(taskss);

  return (
    <>
      <Form tasks={tasks} setTasks={setTasks} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
