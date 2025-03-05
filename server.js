require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { router: authRouter, authenticate } = require("./api/auth.js");
const playlistRouter = require("./api/playlists.js");
const trackRouter = require("./api/tracks.js");
app.use(express.json());
app.use("/auth", authRouter);
app.use("/playlist", playlistRouter);
app.use("/tracks", trackRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
