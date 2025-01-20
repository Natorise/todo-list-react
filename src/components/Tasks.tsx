import React from "react";
import { Task } from "../Task";

const Tasks = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const getIndexFromEvent = (e: React.MouseEvent) => {
    let target = e.target as HTMLButtonElement | HTMLInputElement;
    let parentElement = target.parentElement;
    if (!parentElement) return -1;

    let index = parseInt(parentElement.id);
    if (isNaN(index)) return -1;

    return index;
  };

  const DeleteTask = (e: React.MouseEvent) => {
    const index = getIndexFromEvent(e);
    setTasks(tasks.filter((_x, i) => i !== index));
  };

  const setTaskCompleted = (e: React.MouseEvent) => {
    let target = e.target as HTMLInputElement;

    const index = getIndexFromEvent(e);

    let tasksClone = structuredClone(tasks);
    console.log(tasksClone, index);
    tasksClone[index].completed = target.checked;

    setTasks(tasksClone);
  };

  return (
    <div>
      {tasks.map((task, i) => (
        <div className="tasks" key={i} id={String(i)}>
          <input
            type="checkbox"
            checked={task.completed}
            onClick={setTaskCompleted}
          />
          <div className={`info  ${task.completed ? "completed-info" : ""}`}>
            <p className="name">{task.name}</p>
            <p className="description">{task.description}</p>
          </div>

          <div className="pull-right">
            {task.completed && (
              <div className="completed">
                <span>Completed</span>
              </div>
            )}
            <button className="danger-btn" onClick={DeleteTask}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
