const http = require('http');
const app = require('./app'); // Import your Express app
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true, // Enable SSL/TLS connection
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    }
};

// Start the server and connect to MongoDB
const startServer = async () => {
    await dbConnect();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
