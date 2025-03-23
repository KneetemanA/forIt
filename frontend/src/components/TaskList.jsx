import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
   
    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/tasks')
                setTasks(res.data.data || [])
        } catch (error) {
            console.error('Error al obtener tarea', error)
            setErrorMessage('Error al cargar la tarea');

            setTasks([])
        }
    }; 
    
    useEffect(() => {
        fetchTasks();
    }, []);
    
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`)
            setTasks(tasks.filter(task => task.id !== id));
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Hubo un error al eliminar la tarea')
            console.error('Error delete tasks', error)
        }
    
    }
    
    
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Lista de tareas</h2>

        <button className="w-full bg-violet-400 text-white py-2 rounded-md hover: bg-cyn-600 transition mb-4"
        onClick={() => navigate('/tasks')}
        > Crear nueva tarea </button>

        {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <ul className="mt-6">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-600">No hay tareas disponibles.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={handleDelete}/>
                ))
            )}
        </ul>
    </div>
);
}

export default TaskList;