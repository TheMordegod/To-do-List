import { Task } from "../../Components/Task/Task"
import { List, ListChecks} from "phosphor-react"
import "./style.scss"
import { Modal } from "../../Components/Modal/Modal"
import { useState } from "react"

function Page() {
  let [isModalActive, setModal] = useState(false)
  let [tasks, setTasks] = useState([
    {
      title: 'Praticar Exercicios',
      time: '13:30',
    },
    {
      title: 'Fazer Bolo',
      time: '15:20',
    },
    {
      title: 'Ouvir Musica',
      time: '07:40',
    }
  ]
)

  return (
    <>
      {isModalActive && (<Modal toggleModal={setModal} updateTasks={setTasks} taskList={tasks}/>)}    
      <main className="main-content">  
        <section className="container">
          <header className="main-header">
            <div className="title">
              <h1>To do List</h1>
              <ListChecks className="ListChecks" />
            </div>

            <div className="interactions">
              <input className='task-search'  type="text" placeholder="Search for tasks...." />
              <button className='open-button' onClick={() => {setModal(true)}}><List/></button>
            </div>
          </header>

            <div>
              {Object.entries(tasks).map(([key, value]) => 
              <Task 
                thisTask={value} 
                updateTask={setTasks}
                taskList={tasks}
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
            <span className="inform dicionary">Have a look: <a href="https://themordegod.github.io/Dicionary/" className="footer-link">Dicionary</a></span>
            <span className="inform year">2022</span>
          </div> 
        </footer>
      </main>
    </>
  )
}

export default Page
