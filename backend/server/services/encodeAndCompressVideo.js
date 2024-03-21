const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegStatic);

async function encodeAndCompress(inputFilePath, outputFilePath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions("-crf 23")
      .on("end", () => {
        console.log("Encoding and compression completed.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error during encoding:", err);
        reject(err);
      })
      .save(outputFilePath);
  });
}

module.exports = { encodeAndCompress };
