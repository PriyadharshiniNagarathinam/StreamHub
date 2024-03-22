const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.MONGODB_URL;

// Connect to your Atlas cluster
const client = new MongoClient(url);

client.connect().then(() => {
    console.log("Connected to the database.");
});

module.exports = client;