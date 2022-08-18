import { Trash, Check } from "phosphor-react"
import { useState } from "react";
import { task } from "../../Pages/Home/Index";
import "./style.scss"

interface TaskProps {
    thisTask: task
    updateTask: Function,
    taskList: Array<Object>,
    id: string
}

export function Task( {thisTask, updateTask, taskList, id} : TaskProps) {
    const [isComplete, setIsComplete] = useState(() => {
        localStorage.getItem('Task List')
        return thisTask.isCompleted
    })

    const changeState = () => {
        setIsComplete(!isComplete)   
        thisTask.isCompleted = isComplete   
        localStorage.setItem('Task List', JSON.stringify(taskList))    
    }
    
    function handleRemoveTask() {
        taskList.splice(parseInt(id), 1)
        updateTask([...taskList])
    }

    return (
        <div className={thisTask.isCompleted  ? ("taskContainer complete") : ("taskContainer")}>
            <div className="taskData">
                <span className="taskName">{thisTask.title}</span>
                <span className="taskDate">{thisTask.time}</span>
            </div>
            <div className="taskControls">
               <button className="taskButton" onClick={() => handleRemoveTask()}><Trash size={32} className="taskButton"/></button>
               <button className="taskButton" onClick={() => changeState()}><Check size={32} className="taskButton"/></button>
            </div>
        </div>
    )
}