const tasksDb = require('../models/sqlite');

const getTasks = (req,res) => {

    const db = 'SELECT * FROM tasks';
    tasksDb.all(db, [], (error, rows) => {
        if (error) {
            return res.status(500).json({error: error.message})
        }
        res.json(rows)
    })

};

const getTasksId = (req,res) => {
    const { id } = req.params;

    const db = 'SELECT * FROM tasks WHERE id = ?';
    tasksDb.get(db, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({error: error.message})
        };
        if (!rows) {
            return res.status(500).json({message: 'La tarea no se encontro'})
        }

        res.json(rows)
    })
}

const createTasks = (req,res) => {
    const { title, description, complete} = req.body;

    if( !title || !description || !complete){
        return res.status(400).json({message: "Los campos titulo, descripcion y completo son requeridos"});
    }

    const db = 'INSERT INTO tasks (title, description, complete, createdAt) VALUES (?, ?, ?, ?)'
    const params = [title, description, complete, new Date().toISOStrin()];

    tasksDb.run(db, params, function(error) {
            if (error) {
                return res.status(500).json({error: error.message})
            }

            res.status(201).json({
                id: this.lastID,
                title,
                description,
                complete: false,
                createdAt: params[3]
            })
        });
};

const updateTasks = (req,res) => {
    const {id} = req.params;
    const {title, description, complete} = req.body;

    const db = 'UPDATE tasks SET title = ?, descriprtion = ?, complete = ? WHERE id = ?';
    const params = [id, title, description, complete];

    tasksDb.run(sql)
}
