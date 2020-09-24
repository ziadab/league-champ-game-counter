require("dotenv").config();
const axios = require("axios");

// endpoint from https://developer.riotgames.com/docs/lol#_routing-values
const endpoint = {
  BR: "https://br1.api.riotgames.com/lol",
  EUNE: "https://eun1.api.riotgames.com/lol",
  EUW: "https://euw1.api.riotgames.com/lol",
  JP: "https://jp1.api.riotgames.com/lol",
  KR: "https://kr.api.riotgames.com/lol",
  LAN: "https://la1.api.riotgames.com/lol",
  LAS: "https://la2.api.riotgames.com/lol",
  NA: "https://na1.api.riotgames.com/lol",
  OCE: "https://oc1.api.riotgames.com/lol",
  TR: "https://tr1.api.riotgames.com/lol",
  RU: "https://ru.api.riotgames.com/lol",
};

// Summoner class
class Summoner {
  constructor(username, region, champId) {
    this.username = username;
    this.champId = champId;
    this.endpoint = Summoner.findEndPoint(region);
  }

  static findEndPoint(region) {
    return endpoint[region.toUpperCase()];
  }

  // get basic data
  async getBasicData() {
    const url = `${this.endpoint}/summoner/v4/summoners/by-name/${this.username}?api_key=${process.env.API_KEY}`;
    const data = await axios.get(url);
    this.basicData = data.data;
  }

  async getTheNumberOfGame() {
    const url = `${this.endpoint}/match/v4/matchlists/by-account/${this.basicData.accountId}?champion=${this.champId}&api_key=${process.env.API_KEY}`;
    const data = await axios.get(url);
    return data.data.totalGames;
  }
}

async function main() {
  const player = new Summoner("zaino02", "euw", 55);
  await player.getBasicData();
  const number = await player.getTheNumberOfGame();
  console.log(number);
}

main();
