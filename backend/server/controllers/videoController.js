// server/controllers/videos.js
const client = require("../db/connect");
const multer = require("multer");
const fs = require("fs");
const collectionName = "videos";
const db = client.db("StreamHub");
const { encodeAndCompress } = require("../services/encodeAndCompressVideo");
const { ObjectId } = require("mongodb");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video") {
      cb(null, "uploads/videos/");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else if (file.fieldname === "thumbnail" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

async function getAllVideos(req, res) {
  const videos = await db.collection(collectionName).find({}).toArray();
  res.json(videos);
}

// Controller method to upload a video
async function uploadVideo(req, res) {
  try {
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).send("Multer error: " + err.message);
      } else if (err) {
        return res.status(500).send("Unknown error: " + err.message);
      }

      // console.log(req.files.video.length);
      const videoFile = req.files.video[0];
      const thumbnailFile = req.files.thumbnail[0];
      const username = req.body.username;
      const title = req.body.title;
      const thumbnail_filename = thumbnailFile.filename;

      const originalVideoFilePath = videoFile.path;
      const processedVideoFilePath = originalVideoFilePath.replace("uploads", "processed");
      
      const videoData = {
        filename: videoFile.originalname,
        path: originalVideoFilePath,
        processed_path: processedVideoFilePath,
        thumbnail_filename: thumbnail_filename,
        username: username,
        title: title
      };

      const result = await db.collection(collectionName).insertOne(videoData);
      
      res.status(200).send("Files uploaded successfully.");

      await encodeAndCompress(originalVideoFilePath, processedVideoFilePath)
        .then(() => {
          console.log("Encoding and compression completed successfully.");
        })
        .catch((error) => {
          console.error("Error during encoding and compression:", error);
        });

      console.log("Video uploaded:", result.insertedId);
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Error uploading files.");
  }
}

// Controller method to get a video by its ID
async function getVideoById(req, res) {
  const videoId = req.params.id;

  let objectId = new ObjectId(videoId);
  const video = await db.collection(collectionName).findOne({ "_id": objectId });
  if (!video) {
    return res.status(404).send("Video not found.");
  }
  res.json(video);
}

// Controller method to stream a video in chunks
async function streamVideo(req, res) {
  const videoId = req.params.id;
  const video = await db.collection(collectionName).findOne({ _id: new ObjectId(videoId) });
  if (!video) {
    return res.status(404).send("Video not found.");
  }

  let videoPath = video.processed_path;
  if (!fs.existsSync(videoPath)) {
    videoPath = video.path; // Using the original uploaded video if processed video doesn't exist
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
}

module.exports = { getAllVideos, uploadVideo, streamVideo, getVideoById };
