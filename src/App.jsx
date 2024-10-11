import { useState } from 'react'
import './App.css'
// import All from './tab/all/All'

function App() {
  const [ tasks, setTasks] = useState([])
  
  const [tabs,setTab] = useState("All")
  const [completed,setCompleted] = useState([])


  const checked = (id) => {
      const updatedTodos = tasks.map((element, index) =>
        index === id && element.status === "active" ? (setCompleted([...completed,{ ...element, status : "false"}]) ,{ ...element, status : "false"}) : 
        index === id && element.status === "false" ? { ...element, status : "active"} : 
        element
    )

    setTasks(updatedTodos)
  }

  const checkComple = (id) => {
    const updatedTodos = completed.map((element, index) =>
      index === id && element.status === "false" ? { ...element, status : "active"} : 
      element
  )

  setCompleted(updatedTodos)
  }


  const deleteAllTask = () => {
    setCompleted([])
  }

  const deletePerTask = (id) => {
    const updatedTodos = completed.filter((task, index) => index !== id)
    setCompleted(updatedTodos)
  }

  let tabchose = null

// all
  if(tabs === "All"){
     tabchose = 
        <dl className="All">
          {tasks && tasks.map((element ,index) => (
          <div style={{display: "flex", alignItems: "center"}}>
            <input type="checkbox" name="check" id={index} onChange={()=>checked(index)}/><dd className={element.status}>{element.task}</dd>
          </div>
            ))}    
        </dl>
  }

// active
  if(tabs === "Active"){
    tabchose = 
    <dl className="Active">
    {tasks && tasks.map((element ,index) => (
      element.status === "active" &&
      <div key={index} className='task'>
        <div style={{display: "flex", alignItems: "center"}}>
          <input type="checkbox" name="check" id={index} onChange={()=>checked(index)}/><dd className={element.status}>{element.task}</dd>
        </div>
      </div>
      ))}    
  </dl> 
  }

// completed
  if(tabs === "Completed"){
    tabchose = 
    <dl className="Completed">
    {completed && completed.map((element ,index) => (
      <div key={index} className='task'>
        <div style={{display: "flex", alignItems: "center"}}>
        <input type="checkbox" name="check" id={index} onChange={()=>checkComple(index)}/><dd className={element.status}>{element.task}</dd>
        </div>
          <i onClick={()=>deletePerTask(index)} className="fa-solid fa-trash"></i>
      </div>
      ))}
      <button onClick={deleteAllTask} className='delete'><i class="fa-solid fa-trash"></i>delete all</button>    
  </dl> 
  }


  const getInput = (e) => {
    e.preventDefault()
    const task = e.target.task.value
    const newTask = [
      ...tasks,{
      task : task,
      status: "active"
      }
      ]
    setTasks(newTask)
  };
  
  return (
    <div className='general'>

      <h1>#todo</h1>

      <nav className='nav'>
        {
          tabs === "All" ? <p style={{borderBottom: "2px solid blue"}} onClick={() =>setTab("All")}>All</p> : <p onClick={() =>setTab("All")}>All</p>
        }

        {
          tabs === "Active"? <p style={{borderBottom: "2px solid blue"}} onClick={() =>setTab("Active")}>Active</p> : <p onClick={() =>setTab("Active")}>Active</p>
        }

        {
          tabs === "Completed"? <p style={{borderBottom: "2px solid blue"}} onClick={() =>setTab("Completed")}>Completed</p> : <p onClick={() =>setTab("Completed")}>Completed</p>
        }

      </nav>
      {
        tabs !== "Completed" &&
      <form onSubmit={getInput} className='addTodo'>
        <input type="text" name='task' placeholder='add details'/>
        <button type='submit'>Add</button>
      </form> 
      }

      {tabchose}
    </div>
  )
}

export default App
