import { Link } from "react-router-dom";


const TaskItem = ({task, onDelete}) => {
    if(!task) return null;

    return(
        <li className="bg-grey-100 p-3 mb-2 rounded flex justify-between items-center">
            <div>
                <h3 className="font-semibold"> {task.title} </h3>
                <p className="text-grey-500"> {task.description} </p>
                 <span>{task.complete ? "Completada" : "Pendiente"}</span>
            </div>
           
                <div>
                    <Link to={`/task/editar/${task.id}`} className="text-blue-600 mx-2">Editar</Link>
                    <button className="text-red-600" onClick={() => onDelete(task.id)}>Eliminar</button>
                </div>
        </li>
    )
}

export default TaskItem;