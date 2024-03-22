const express = require("express");
const router = express.Router();
const { getAllLiveVideos, uploadLiveVideo } = require("../controllers/liveStreamingController");

// Define routes    
router.get("/live-videos", getAllLiveVideos);
router.post("/live-videos", uploadLiveVideo);

module.exports = router;
