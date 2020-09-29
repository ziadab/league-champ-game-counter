require("dotenv").config();
const Summoner = require("./classes/Summoner");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const { username, champId, region } = req.query;
  const player = new Summoner(username, region, champId);

  await player.getBasicData();
  const number = await player.getTheNumberOfGame();
  res.status(200).json({
    matches: number,
  });
});

app.listen(5000 || process.env.PORT, () => {
  console.log(`I'm in ${5000 || process.env.PORT}`);
});
