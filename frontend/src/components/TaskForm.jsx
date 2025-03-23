import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function TaskForm({ tasks, setTasks }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        complete: false
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/tasks/${id}`)
                .then((res) => setTask(res.data))
                .catch((error) => console.error('Error al obtener la tarea', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({ ...task, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/tasks/${id}`, task);
                setTasks(prevTasks => prevTasks.map(t => t.id === parseInt(id) ? task : t));
            } else {
                const res = await axios.post('http://localhost:3000/api/tasks', task);
                setTasks(prevTasks => [...prevTasks, res.data]);
            }

            navigate('/');

        } catch (error) {
            console.error("Error al guardar la tarea", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{id ? "Editar Tarea" : "Nueva Tarea"}</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <input 
                    className="border p-2 w-full mb-4"
                    type="text" 
                    name="title" 
                    value={task.title} 
                    placeholder="Tarea a realizar"
                    onChange={handleChange}
                    required
                />

                <label className="block text-indigo-500">Descripción:</label>
                <textarea
                    className="w-full px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="description"
                    value={task.description || ""} 
                    placeholder="Descripción de la tarea"
                    onChange={handleChange}
                    required
                ></textarea>

                <input 
                    className="mr-2"
                    type="checkbox"
                    name="complete"
                    checked={task.complete}
                    onChange={handleChange}
                />
                <label className="text-indigo-700">Completada</label>
    
                    <button 
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition mt-4" 
                    type="submit"
                >
                    {id ? "Actualizar" : "Crear"}
                </button>
                
            </form>
        </div>
    );
}

export default TaskForm;
