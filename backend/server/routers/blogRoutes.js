const express = require("express");
const router = express.Router();
const { getAllBlogs, uploadBlog, getBlogById } = require("../controllers/blogController");

// Define routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", uploadBlog);

module.exports = router;