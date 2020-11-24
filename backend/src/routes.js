const router = require('express').Router()

const TasksController = require('./controllers/tasks.controller')

router.post('/tasks', TasksController.store)
router.put('/tasks/:id', TasksController.update)
router.delete('/tasks/:id', TasksController.delete)
router.get('/tasks', TasksController.index)
router.get('/tasks/:id', TasksController.show)

module.exports = router