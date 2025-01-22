import React from "react";
import { Task } from "../Task";
import { ModalInfo } from "../App";

const Tasks = ({
  tasks,
  setTasks,
  setModalInfo,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo>>;
}) => {
  const getIndexFromEvent = (e: React.MouseEvent) => {
    let target = e.target as HTMLButtonElement | HTMLInputElement;
    let parentElement: HTMLElement | null | undefined = target.parentElement?.parentElement;
    // this is needed due to the edit & delete buttons being 2 parents up while checkbox is only 1
    if (!parentElement?.id) parentElement = parentElement?.parentElement;

    if (!parentElement) return -1;

    let index = parseInt(parentElement.id);
    if (isNaN(index)) return -1;

    return index;
  };

  const editTask = (e: React.MouseEvent) => {
    const index = getIndexFromEvent(e);
    setModalInfo({ id: index });
  };

  const deleteTask = (e: React.MouseEvent) => {
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
          <div className="pull-left">
            <input
              type="checkbox"
              checked={task.completed}
              onClick={setTaskCompleted}
            />
            <div className={`info  ${task.completed ? "completed-info" : ""}`}>
              <p className="name">{task.name}</p>
              <p className="description">{task.description}</p>
            </div>
          </div>
          <div className="pull-right">
            {task.completed && (
              <div className="completed">
                <span>Completed</span>
              </div>
            )}
            <div className="buttons">
            <button className="secondary-btn" onClick={editTask}>
              Edit
            </button>
            <button className="danger-btn" onClick={deleteTask}>
              Delete
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
