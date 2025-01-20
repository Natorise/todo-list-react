import React, { useState } from 'react'
import './App.css'


const defaultTask = {
  name: "",
  description: "",
  completed: false
}
type Task = typeof defaultTask


let taskss: Task[] = [
  {
    name: "Create React App",
    description: "Make todo app in react.",
    completed: true
  },
  {
    name: "Master React",
    description: "",
    completed: false
  }
]






function App() {


  const [tasks, setTasks] = useState(taskss)
  const [taskObj, setTaskObj] = useState(structuredClone(defaultTask))

  const addTask = ()=>{
    if(taskObj.name.trim() === "") return

    setTasks([taskObj,...tasks])
    setTaskObj(structuredClone(defaultTask))
  }




  const getIndexFromEvent = (e: React.MouseEvent) =>{
    let target = e.target as HTMLButtonElement | HTMLInputElement
    let parentElement = target.parentElement
    if(!parentElement) return -1

    let index = parseInt(parentElement.id)
    if(isNaN(index)) return -1

    return index

  }

  const DeleteTask = (e: React.MouseEvent) => {
    const index = getIndexFromEvent(e)
    setTasks(tasks.filter((_x,i)=>i !== index))
  }

  const setTaskCompleted = (e: React.MouseEvent) =>{
    let target = e.target as HTMLInputElement

    const index = getIndexFromEvent(e)

    let tasksClone = structuredClone(tasks)
    console.log(tasksClone,index)
    tasksClone[index].completed = target.checked

    setTasks(tasksClone)
  }

  const setTaskProperty = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let target = e.target 

    let id = target.id as 'name' | 'description'

    let newTaskObj = structuredClone(taskObj)
    newTaskObj[id] = target.value

    setTaskObj(newTaskObj)
  }

  return (
    <>
    <div className='form'>
    <input type="text" onChange={setTaskProperty} value={taskObj.name} placeholder='Task Name' id="name"/>
    <input type="text" onChange={setTaskProperty} value={taskObj.description} placeholder='Task Description' id="description"/>
    <button className="primary-btn" onClick={addTask}>Add</button>
    </div>

    <div>
    {tasks.map((task,i)=>

      <div className="tasks" key={i} id={String(i)}>
             <input type="checkbox" checked={task.completed} onClick={setTaskCompleted}/>
        <div className={`info  ${task.completed ? "completed-info" : ""}`}>
          <p className='name'>
            {task.name}
          </p>
          <p className='description'>
            {task.description}
          </p>
        </div>
        
        <div className='pull-right'>
        {task.completed && 
        <div className='completed'>
          <span>Completed</span>
        </div>
        }
        <button className="danger-btn" onClick={DeleteTask}>Delete</button>
          </div>
        </div>
    )}
    </div>
    </>
  )
}

export default App
