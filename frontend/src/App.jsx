import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { useState } from "react"


function App() {
 
  const [tasks, setTasks] = useState([]);

  return (
    <>
     <Router>
       <Routes>
          <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} />}/>
          <Route path="/tasks" element={<TaskForm tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/task/editar/:id" element={<TaskForm tasks={tasks} setTasks={setTasks} />} />
       </Routes>
     </Router>
    </>
  )
}

export default App
