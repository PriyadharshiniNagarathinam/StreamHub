// server/controllers/blogController.js
const client = require("../db/connect");
const multer = require("multer");
const fs = require("fs");
const collectionName = "blogs";
const db = client.db("StreamHub");
const { encodeAndCompress } = require("../services/encodeAndCompressVideo");
const { ObjectId } = require("mongodb");

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "blogs/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "text/markdown") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only markdown files are allowed."), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

async function getAllBlogs(req, res) {
    const blogs = await db.collection(collectionName).find({}).toArray();
    res.json(blogs);
}

// Controller method to upload a video
async function uploadBlog(req, res) {
    try {
        upload.single("blog")(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).send("Multer error: " + err.message);
            } else if (err) {
                return res.status(500).send("Unknown error: " + err.message);
            }

            const file = req.file;
            if (!file) {
                return res.status(400).send("No file uploaded.");
            }

            const originalFilePath = file.path;

            const blogData = {
                filename: file.originalname,
                path: originalFilePath,
                createdBy: "Admin",
            };

            const result = await db.collection(collectionName).insertOne(blogData);
            console.log("Blog uploaded:", result.insertedId);
            res.status(200).send("Blog uploaded successfully.");
        });
    } catch (error) {
        console.error("Error uploading Blog:", error);
        res.status(500).send("Error uploading Blog.");
    }
}

// Controller method to get a video by its ID
async function getBlogById(req, res) {
    const blogId = req.params.id;

    let objectId = new ObjectId(blogId);
    const blog = await db.collection(collectionName).findOne({ "_id": objectId });
    if (!blog) {
        return res.status(404).send("Blog not found.");
    }
    res.json(blog);
}

module.exports = { getAllBlogs, uploadBlog, getBlogById };
