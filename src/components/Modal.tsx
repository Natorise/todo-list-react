import React, { useEffect, useState } from "react";
import { ModalInfo } from "../App";
import { Task } from "../Task";

const Modal = ({
  tasks,
  setTasks,
  modalInfo,
  setModalInfo,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  modalInfo: ModalInfo;
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo>>;
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const closeModal = () => {
    setModalInfo(undefined);
  };

  const saveTask = () => {
    if (!taskName) return;

    const index = modalInfo?.id;
    if (typeof index !== "number") return;

    const newTasks = structuredClone(tasks);
    newTasks[index].name = taskName;
    newTasks[index].description = taskDescription;
    console.log(index);
    setTasks(newTasks);
    closeModal();
  };

  useEffect(() => {
    if (typeof modalInfo?.id === "number") {
      setTaskName(tasks[modalInfo.id].name);
      setTaskDescription(tasks[modalInfo.id].description);
    }
  }, [modalInfo]);

  return (
    <div className={`modal ${!modalInfo && "modal-disabled"}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p className="name">Edit Task</p>
        <div className="modal-input">
          <input
            type="text"
            className="modal-input"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            className="modal-input"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button className="primary-btn modal-input" onClick={saveTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
