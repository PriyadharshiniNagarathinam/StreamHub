const client = require("../db/connect");
const collectionName = "liveVideos";

const db = client.db("StreamHub");

async function getAllLiveVideos(req, res) {
    const liveVideos = await db.collection(collectionName).find({}).toArray();
    res.json(liveVideos);
}

async function uploadLiveVideo(req, res) {
    const { title, broadcaster, description } = req.body;
    const liveVideo = {
        title,
        description,
        broadcaster,
        viewers: [],
    };
    const result = await db.collection(collectionName).insertOne(liveVideo);
    res.json(result.ops[0]);
}

module.exports = {
    getAllLiveVideos,
    uploadLiveVideo,
};