// server.js
require('dotenv').config(); // Add this at the top of your server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the MongoDB connection function
const authRoutes = require('./routes/auth'); // Import the authentication routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB(); // This will connect to the MongoDB Atlas database

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
