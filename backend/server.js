const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

if (process.env.NODE_ENV !== 'production')
{
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(__dirname);
    liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
    });

    app.use(connectLiveReload());
}


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port http://${server.address().address}:${server.address().port}`));
