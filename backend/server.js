const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port http://${server.address().address}:${server.address().port}`));
