// services/todo.service.js
const { check, validationResult } = require('express-validator');
const todoRepository = require('../data-access/todo.data-access');

exports.getAllTodos = async () => {
  return await todoRepository.getAllTodos();
};

exports.createTodo = [
  // Validation rules for creating a todo
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('description')
    .optional(),
  check('completed')
    .optional()
    .isBoolean(),

  // Handler for validation
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const todoData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
    };
    try {
      const newTodo = await todoRepository.createTodo(todoData);
      res.locals.newTodo = newTodo; // Pass the new todo to the next middleware
      next();
    } catch (error) {
      next(error);
    }
  },
];

exports.getTodoById = async (id) => {
  return await todoRepository.getTodoById(id);
};

exports.updateTodo = [
  // Validation rules for updating a todo
  check('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  check('description')
    .optional(),
  check('completed')
    .optional()
    .isBoolean(),

  // Handler for validation
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    try {
      const updatedTodo = await todoRepository.updateTodo(req.params.id, updateData);
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.locals.updatedTodo = updatedTodo; // Pass the updated todo to the next middleware
      next();
    } catch (error) {
      next(error);
    }
  },
];

exports.deleteTodo = async (id) => {
  return await todoRepository.deleteTodo(id);
};