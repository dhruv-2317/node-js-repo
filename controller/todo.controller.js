const todoService = require('../services/todo.service');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todos' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await todoService.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todo' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const result = await todoService.deleteTodo(req.params.id);
    if (result.deletedCount ===  0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};