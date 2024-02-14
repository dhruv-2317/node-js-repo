require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const todoRoutes = require('./routes/todos.routes');


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT ||  8000;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));