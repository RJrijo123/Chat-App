const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import your routes
const messageRoutes = require('./routes/messages');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/ping', (_req, res) => {
    res.json({ msg: 'Ping Successful' });
});

module.exports = app;
