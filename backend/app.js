const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000

app.use(express.json());
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

//routes



app.listen(port, () =>{
    console.log(`Servirdor corriedno https://localhost:${port}`)
} )