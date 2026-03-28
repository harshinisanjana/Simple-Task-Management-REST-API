const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
