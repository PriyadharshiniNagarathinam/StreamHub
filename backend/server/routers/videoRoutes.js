const express = require("express");
const router = express.Router();
const path = require("path");
const { getAllVideos, uploadVideo, getVideoById, streamVideo } = require("../controllers/videoController");

// Define routes
router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideoById);
router.get("/videos/:id/stream", streamVideo);
router.post("/videos", uploadVideo);
router.get('/thumbnails/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(`C:/Users/Lenovo/Desktop/Projects/livestreamWebsite/backend/server/`, `uploads/thumbnails/${filename}`);
    console.log(imagePath);
    res.sendFile(imagePath);
});

module.exports = router;
