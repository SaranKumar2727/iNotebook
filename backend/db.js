
const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1/inotebook"; // Replace 'yourDatabaseNameHere' with your actual database name
const connectToMongo = async () => { 
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;
