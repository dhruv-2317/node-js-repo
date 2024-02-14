require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos.routes');


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Secure Express app by setting various HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(compression()); // Compress response bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT ||  8000;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));