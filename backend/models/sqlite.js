const path = require('path')
const sqlite = require('sqlite3')


const tasksDb = new sqlite.Database(
    path.resolve(__dirname, './tasks.db'), (error) =>{
    if (error) {
        return console.error('No se pudo conectar a la base de datos', error.message)        
    } else {
        console.log('Conexion a la base de datos, exitosa!')
    }
    
    const sql = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN,
    createdAt DATE
    )`;

    tasksDb.run(sql, () => {
        if (error) {
            return console.error('No se pudo conectar a la base de datos', error.message)        
        } else {
            console.log('Tabla creada con exito!')
        }
    })

});


module.exports = tasksDb