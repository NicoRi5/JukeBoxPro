const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/tracks", async (req, res, next) => {
  const tracks = await prisma.tracks.findMany();
  res.json(tracks);
});

router.get("/tracks/:id", async (req, res) => {
  const { id } = req.params;
  const track = await prisma.track.findUnique({
    where: { id: parseInt(id) },
    include: {
      playlists: true,
    },
  });
  if (!track) {
    return res.json({ error: "No track found with such id!" });
  }
  if (req.user) {
    const userPlaylists = track.playlists.filter(
      (playlist) => playlist.ownerId === req.user.id
    );
  }
  res.json(track);
});
