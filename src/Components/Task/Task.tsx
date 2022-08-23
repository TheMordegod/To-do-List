import { Trash, Check } from "phosphor-react"
import { useEffect, useState } from "react";
import { task } from "../../Pages/Home/Index";
import "./style.scss"

interface TaskProps {
    thisTask: task
    updateMainTaskList: Function,
    taskList: Array<Object>,
    index: number
}

export function Task({ thisTask, updateMainTaskList, taskList, index }: TaskProps) {
    const [isComplete, setIsComplete] = useState(() => {
        localStorage.getItem('Task List')
        return thisTask.isCompleted
    })

     const toggleComplete = () => {    
        setIsComplete(current => {
            thisTask.isCompleted = !current
            return !current
        })      
        localStorage.setItem('Task List', JSON.stringify(taskList))
    }

    const handleRemoveTask = (id: number) => {
        updateMainTaskList([
            ...taskList.slice(0, id), //pega do indice 0 até o anterior do index desejado
            ...taskList.slice(id + 1, taskList.length)//então adiciona todos os objs após o index
        ])
    }

    //Esse effect corrige o efeito de passar um State de um objeto para outro
    //dessa forma o valor do useState é sempre igual ao do objeto  
    useEffect(() => {
        if(isComplete != thisTask.isCompleted){
            setIsComplete(thisTask.isCompleted)
        }
    },[isComplete,taskList])

    return (
        <div className={isComplete && thisTask.isCompleted ? ("taskContainer complete") : ("taskContainer")}>
            <div className="taskData">
                <span className="taskName">{thisTask.title}</span>
                <span className="taskDate">{thisTask.time}</span>
            </div>
            <div className="taskControls">
                <button className="taskButton" onClick={() => toggleComplete()}><Check size={32} className="taskButton" /></button>
                <button className="taskButton" onClick={() => handleRemoveTask(index)}><Trash size={32} className="taskButton" /></button>
            </div>
        </div>
    )
}