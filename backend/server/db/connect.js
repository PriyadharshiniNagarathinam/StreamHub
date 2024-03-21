const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://priyadharshini:Radha0007@cluster0.pzu8iom.mongodb.net/?retryWrites=true&w=majority";

// Connect to your Atlas cluster
const client = new MongoClient(url);

client.connect().then(() => {
    console.log("Connected to the database.");
});

module.exports = client;