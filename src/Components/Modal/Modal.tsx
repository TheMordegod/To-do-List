import { XCircle } from 'phosphor-react'
import { useState } from 'react'
import './style.scss'

interface ModalProps {
    toggleModal: (status: boolean) => void,
    updateTasks: Function
    taskList: Array<Object>
}

export function Modal({ toggleModal, updateTasks, taskList }: ModalProps) {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)

    function addTask() {
        let datePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        let titleInput = document.getElementById('taskName') as HTMLInputElement
        let timeInput = document.getElementById('taskTime') as HTMLInputElement

        if(datePattern.test(timeInput.value)) {
            let newTask = {
                title: titleInput?.value,
                time: timeInput?.value,
                isCompleted: false,
            }

            toggleModal(false) 
            return updateTasks([...taskList, newTask])           
        }
        else {return alert('Error: Unknown date format!')}
    }

    function deleteAllTasks() {
        return updateTasks([])
    }

    return (
        <>
            {isTaskMenuOpen ? (
                <div className='modalShadow'>
                    <div className='modalMenu'>
                        <header>
                            <span>Menu</span>
                            <button className='closeButton' onClick={() => toggleModal(false)}><XCircle /></button>
                        </header>
                        <section className='inputs'>
                            <label htmlFor="taskName">Name of Task</label>
                            <input 
                                type="text" 
                                id='taskName'
                                className='modalInput' 
                                placeholder='Put the name here' 
                                autoComplete='off'
                                maxLength={30}
                                size={30}
                            />

                            <label htmlFor="taskDate">Time to Complete Task</label>
                            <input 
                                type="text" 
                                id='taskTime' 
                                className='modalInput' 
                                placeholder='Exemple: 12:30'
                            />

                            <button className='modalButton' onClick={() => addTask()}>Add new Task</button>
                            <button className='modalButton' onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}>Back</button>
                        </section>
                    </div>
                </div>
            ) : (
                <div className='modalShadow'>
                    <div className='modalMenu'>
                        <header>
                            <span>Menu</span>
                            <button className='closeButton' onClick={() => toggleModal(false)}><XCircle/></button>
                        </header>
                        <section className='inputs'>
                            <button className='modalButton' onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}>Add Task</button>
                            <button className='modalButton' onClick={() => deleteAllTasks()}>Remove all tasks</button>
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}