const express = require("express");
const cors = require("cors");
const videoRouters = require("./routers/videoRoutes");
const blogRouters = require("./routers/blogRoutes");
const liveRouters = require("./routers/liveVideosRoutes");
const cookieSession = require("cookie-session");
const { json, urlencoded } = require("body-parser");
const authRouters = require("./routers/userRoutes");

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use(
    cookieSession({
        signed: false,
        secure: false,
    }),
);

app.use("/", videoRouters);
app.use("/", blogRouters);
app.use("/", liveRouters);
app.use("/auth", authRouters);

module.exports = app; // Export the app instance to be used in the index.js file    