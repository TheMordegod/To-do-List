import { XCircle } from 'phosphor-react'
import { useState } from 'react'
import './style.scss'

interface ModalProps {
    toggleModal: (status: boolean) => void,
    updateTasks: Function
    taskList: Array<Object>
}

export function Modal({ toggleModal, updateTasks, taskList }: ModalProps) {
    const [addTaskMenu, setAddTaskMenu] = useState(false)

    function addTask() {
        let titleInput = document.getElementById('taskName') as HTMLInputElement
        let timeInput = document.getElementById('taskTime') as HTMLInputElement

        let newTask = {
            title: titleInput?.value,
            time: timeInput?.value,
        }

        taskList.push(newTask)
        updateTasks([...taskList])
        return console.log(taskList)
    }

    function deleteAllTasks() {
        return updateTasks([])
    }

    return (
        <>
            {addTaskMenu ? (
                <div className='modalShadow'>
                    <div className='modalMenu'>
                        <header>
                            <span>Menu</span>
                            <button className='closeButton' onClick={() => toggleModal(false)}><XCircle /></button>
                        </header>
                        <section>
                            <label htmlFor="taskName">Name of Task</label>
                            <input type="text" id='taskName' placeholder='Put the name here'/>

                            <label htmlFor="taskDate">Time to Complete Task</label>
                            <input type="text" id='taskTime' placeholder='Use HH/MM format'/>

                            <button className='modalButton' onClick={() => addTask()}>Add new Task</button>
                            <button className='modalButton' onClick={() => setAddTaskMenu(!addTaskMenu)}>Back</button>
                        </section>
                    </div>
                </div>
            ) : (
                <div className='modalShadow'>
                    <div className='modalMenu'>
                        <header>
                            <span>Menu</span>
                            <button className='closeButton' onClick={() => toggleModal(false)}><XCircle /></button>
                        </header>
                        <section>
                            <button className='modalButton' onClick={() => setAddTaskMenu(!addTaskMenu)}>Add Task</button>
                            <button className='modalButton' onClick={() => deleteAllTasks()}>Remove all tasks</button>
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}