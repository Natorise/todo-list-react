import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Tasks from "./components/Tasks";

import { Task } from "./Task";
import Modal from "./components/Modal";

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

export type ModalInfo = {
  id: number;
} | undefined

function App() {
  const [tasks, setTasks] = useState(taskss);
  const [modalInfo, setModalInfo] = useState<ModalInfo>();

  return (
    <>
      <Modal tasks={tasks} setTasks={setTasks} modalInfo={modalInfo} setModalInfo={setModalInfo} />

      <Form tasks={tasks} setTasks={setTasks} />
      <Tasks
        tasks={tasks}
        setTasks={setTasks}
        setModalInfo={setModalInfo}
      />
    </>
  );
}

export default App;
