// routes/todos.routes.js
const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo.controller')
const { validationResult } = require('express-validator')

router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getTodoById)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

// Error handling middleware for validation errors
router.use((req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
})

module.exports = router
