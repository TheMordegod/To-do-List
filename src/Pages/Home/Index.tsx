import { Task } from "../../Components/Task/Task"
import { List, ListChecks} from "phosphor-react"
import "./style.scss"
import { Modal } from "../../Components/Modal/Modal"
import { useEffect, useState } from "react"

export type task = {
  title: string,
  time: string
  isCompleted: boolean
}

function Page() {
  let [isModalActive, setModal] = useState(false)
  let [search, setSearch] = useState('')
  let [taskList, setTasks] = useState(() : task[] => {
    const localdata = localStorage.getItem('Task List')
    return localdata ? JSON.parse(localdata) : []
  })

  
  useEffect(() => {
      localStorage.setItem('Task List',JSON.stringify(taskList))   
  }, [taskList])

  return (
    <>
      {isModalActive && (<Modal toggleModal={setModal} updateTasks={setTasks} taskList={taskList}/>)}    
      <main className="main-content">  
        <section className="container">
          <header className="main-header">
            <div className="title">
              <h1>To do List</h1>
              <ListChecks className="ListChecks" />
            </div>

            <div className="interactions">
              <input className='task-search' onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for tasks...." />
              <button className='open-button' onClick={() => {setModal(true)}}><List/></button>
            </div>
          </header>

            <div>
              {Object.entries(taskList).filter((thisTask) => {

                if(search === '') { return taskList } 
                else if (thisTask[1].title.toLocaleLowerCase().includes(search.toLowerCase())) { return thisTask }

              }).map(([key, value]) => 
              <Task 
                thisTask={value} 
                updateTask={setTasks}
                taskList={taskList}
                id={key}
                key={key} 
                />
              )}   
            </div>
        </section>
        <footer className="main-footer">      
          <div className="userBox">
            <span className="inform author">Made by Levy Silva</span>
            <span className="inform portfolio">Click <a href="https://github.com/TheMordegod" className="footer-link">here</a> to access my portfolio</span>
            <span className="inform dicionary">Have a look in my other project: <a href="https://themordegod.github.io/Dicionary/" className="footer-link">Dicionary</a></span>
            <span className="inform year">2022</span>
          </div> 
        </footer>
      </main>
    </>
  )
}

export default Page
