const prisma = require("./index.js");

const seed = async () => {
  const usersData = async () => {
    const usersData = [
      { username: "firstUser" },
      { username: "secondUser" },
      { username: "thirdUser" },
    ];
    for (const userData of usersData) {
      await prisma.user.create({
        data: userData,
      });
    }
    const tracksData = [
      { name: "Track 1" },
      { name: "Track 2" },
      { name: "Track 3" },
      { name: "Track 4" },
      { name: "Track 5" },
      { name: "Track 6" },
      { name: "Track 7" },
      { name: "Track 8" },
      { name: "Track 9" },
      { name: "Track 10" },
      { name: "Track 11" },
      { name: "Track 12" },
      { name: "Track 13" },
      { name: "Track 14" },
      { name: "Track 15" },
      { name: "Track 16" },
      { name: "Track 17" },
      { name: "Track 18" },
      { name: "Track 19" },
      { name: "Track 20" },
    ];
    for (const trackData of tracksData) {
      await prisma.track.create({
        data: trackData,
      });
    }
    console.log("Seeding Successful!");
  };
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
