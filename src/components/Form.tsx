import React, { useState } from "react";
import { defaultTask, Task } from "../Task";

const Form = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [taskObj, setTaskObj] = useState(structuredClone(defaultTask));

  const addTask = () => {
    if (taskObj.name.trim() === "") return;

    setTasks([taskObj, ...tasks]);
    setTaskObj(structuredClone(defaultTask));
  };

  const setTaskProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;

    let id = target.id as "name" | "description";

    let newTaskObj = structuredClone(taskObj);
    newTaskObj[id] = target.value;

    setTaskObj(newTaskObj);
  };

  return (
    <div className="form">
      <input
        type="text"
        onChange={setTaskProperty}
        value={taskObj.name}
        placeholder="Task Name"
        id="name"
      />
      <input
        type="text"
        onChange={setTaskProperty}
        value={taskObj.description}
        placeholder="Task Description"
        id="description"
      />
      <button className="primary-btn" onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default Form;
