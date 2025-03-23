const express = require('express');
const router = express.Router();


const {getTasks, getTasksId, createTasks, updateTasks, deleteTasks, } = require('../controllers/tasksController');

router.get("/", getTasks, getTasksId);

router.post('/', createTasks);

router.put('/:id', updateTasks);

router.delete('/:id', deleteTasks)


module.exports = router;