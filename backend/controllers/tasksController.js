const tasksDb = require('../models/sqlite');

const getTasks = (req,res) => {

    const sql = 'SELECT * FROM tasks';
    tasksDb.all(sql, [], (error, rows) => {
        if (error) {
            return res.status(500).json({error: error.message})
        }
        res.json({data: rows})
    })

};

const getTasksId = (req,res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM tasks WHERE id = ?';
    tasksDb.get(sql, [id], (error, row) => {
        if (error) {
            return res.status(500).json({error: error.message})
        };
        if (!row) {
            return res.status(404).json({message: 'La tarea no se encontro'})
        }

        res.json(row)
    })
}

const createTasks = (req,res) => {
    const { title, description, complete} = req.body;

    if( !title || !description || complete === undefined){
        return res.status(400).json({message: "Los campos titulo, descripcion y completo son requeridos"});
    }

    const sql = 'INSERT INTO tasks (title, description, complete, createdAt) VALUES (?, ?, ?, ?)'
    const params = [title, description, complete, new Date().toLocaleString()];

    tasksDb.run(sql, params, 
        function(error) {
            if (error) {
                return res.status(500).json({error: error.message})
            }

            res.status(201).json({
                id: this.lastID,
                title,
                description,
                complete: complete ? true : false,
                createdAt: params[3]
            })
        });
};

const updateTasks = (req,res) => {
    const {id} = req.params;
    const {title, description, complete} = req.body;

    const sql = 'UPDATE tasks SET title = ?, description = ?, complete = ? WHERE id = ?';
    const params = [title, description, complete, id];

    tasksDb.run(sql, params, 
        function(error){
            if (error) {
                return res.status(500).json({error: error.message})
            }
            res.json({message: 'La tarea se actualizo con exito'})
    })
};

const deleteTasks = (req,res) =>{
    const {id} = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?'

    tasksDb.run(sql, [id], 
        function(error){
            if (error) {
                return res.status(500).json({error: error.message})
            };
            if(this.changes === 0) {
                return res.status(400).json({message: "No se encontro la tarea"})
            }
            res.json({message: "La tarea se elimino con exito!"})
        }
    )
}



module.exports = {
    getTasks,
    getTasksId,
    createTasks,
    updateTasks,
    deleteTasks
}
