const express = require("express");
const router = express.Router();
const { getAllLiveVideos, uploadLiveVideo, updateLiveVideo } = require("../controllers/liveStreamingController");

// Define routes    
router.get("/live-videos", getAllLiveVideos);
router.post("/live-videos", uploadLiveVideo);
router.put("/live-videos/:id", updateLiveVideo);

module.exports = router;
