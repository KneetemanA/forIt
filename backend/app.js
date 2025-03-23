const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//routes

const tasksRoutes = require('./routes/tasksRoutes');

app.use('/api/tasks', tasksRoutes)


app.listen(port, () =>{
    console.log(`Servirdor corriedno https://localhost:${port}`)
} )