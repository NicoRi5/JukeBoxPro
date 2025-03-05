const express = require("express");
const router = express.Router();
const { authenticate } = require("./auth.js");
const prisma = require("../prisma");

router.get("/playlists", authenticate, async (req, res, next) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      ownerId: req.user.id,
    },
  });
  res.json(playlists);
});
router.post("/playlists", authenticate, async (req, res) => {
  const { name, description, trackIds } = req.body;

  const newPlaylist = await prisma.playlist.create({
    data: {
      name,
      description,
      ownerId: req.user.id,
      tracks: {
        connect: trackIds.map((id) => ({ id })),
      },
    },
  });
  res.json(newPlaylist);
});

router.get("/playlists/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  const playlist = await prisma.playlist.findUnique({
    where: { id: parseInt(id) },
    include: {
      tracks: true,
    },
  });
  if (playlist.ownerId !== req.user.id) {
    return res.status(403).json({
      error: "Forbidden! Logged in user does not own this playlist!",
    });
  }
  res.json(playlist);
});

module.exports = router;
