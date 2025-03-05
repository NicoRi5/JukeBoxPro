require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { router: authRouter } = require("./api/auth.js");
const playlistRouter = require("./api/playlists.js");
const trackRouter = require("./api/tracks.js");
app.use(express.json());
app.use("/auth", authRouter);
app.use("/playlists", playlistRouter);
app.use("/tracks", trackRouter);

// the following helps with error handling and status code
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error has occurred!";
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
