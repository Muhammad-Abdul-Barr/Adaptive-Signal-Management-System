// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = "mongodb+srv://malickbarr:traffic-project@maindb.aicvu.mongodb.net/?retryWrites=true&w=majority&appName=MainDB";
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
