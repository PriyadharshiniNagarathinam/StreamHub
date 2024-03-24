const client = require("../db/connect");
const collectionName = "liveVideos";
const db = client.db("StreamHub");

async function getAllLiveVideos(req, res) {
    const liveVideos = await db.collection(collectionName).find({}).toArray();
    res.json(liveVideos);
}

async function uploadLiveVideo(req, res) {
    const { title, broadcaster, description, viewers, ended } = req.body;
    const liveVideo = {
        title,
        description,
        broadcaster,
        viewersCount : viewers,
        viewers: [],
        ended
    };
    const result = await db.collection(collectionName).insertOne(liveVideo);
    res.status(200).json({ message: "Live video uploaded successfully" });
}

async function updateLiveVideo(req, res) {
    const { id } = req.params;
    const { title, broadcaster, description, viewers, ended } = req.body;
    const liveVideo = {
        title,
        description,
        broadcaster,
        viewersCount : viewers,
        viewers: [],
        ended
    };
    const result = await db.collection(collectionName).updateOne({ _id: id }, { $set: liveVideo });
    res.status(200).json({ message: "Live video updated successfully" });
}

module.exports = {
    getAllLiveVideos,
    uploadLiveVideo,
    updateLiveVideo
};