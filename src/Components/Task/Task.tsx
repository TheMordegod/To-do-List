import { Trash, Check } from "phosphor-react"
import { useState } from "react";
import "./style.scss"
//Test

interface TaskProps {
    thisTask: {
        title: string,
        time: string,
    },
    updateTask: Function,
    taskList: Array<Object>,
    id: string
}

export function Task( {thisTask, updateTask, taskList, id} : TaskProps) {

    const [isComplete, setIsComplete] = useState(false)
    
    function handleRemoveTask() {
        taskList.splice(parseInt(id), 1)
        updateTask([...taskList])
    }

    return (
        <div className={isComplete ? ("taskContainer complete") : ("taskContainer")}>
            <div className="taskData">
                <span className="taskName">{thisTask.title}</span>
                <span className="taskDate">{thisTask.time}</span>
            </div>
            <div className="taskControls">
               <button className="taskButton" onClick={() => handleRemoveTask()}><Trash size={32} className="taskButton"/></button>
               <button className="taskButton" onClick={() => setIsComplete(!isComplete)}><Check size={32} className="taskButton"/></button>
            </div>
        </div>
    )
}