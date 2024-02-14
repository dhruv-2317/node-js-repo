const Todo = require('../models/todo.model');

exports.getAllTodos = async () => {
  return await Todo.find().exec();
};

exports.createTodo = async (todoData) => {
  return await Todo.create(todoData);
};

exports.getTodoById = async (id) => {
  return await Todo.findById(id).exec();
};

exports.updateTodo = async (id, updateData) => {
  return await Todo.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id).exec();
};