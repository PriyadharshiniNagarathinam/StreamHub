// server/controllers/userController.js
const client = require("../db/connect");
const collectionName = "users";
const db = client.db("StreamHub");
const { ObjectId } = require("mongodb");
const User = db.collection(collectionName);

// Register a new user
const register = async (req, res) => {
    try {
        const { username, password, useremail } = req.body;

        // Check if the user already exists
        const existingUserEmail = await User.findOne({ useremail });
        if (existingUserEmail) {
            return res.status(400).json({ message: 'Useremail already exists' });
        }

        const result = User.insertOne({ username, password, useremail });
        console.log("User registered successfully: ", (await result).insertedId);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User login
const login = async (req, res) => {
    try {
        const { password, useremail } = req.body;

        // Check if the user exists
        const user = await User.findOne({ "useremail": useremail });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', username: user.username});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
};