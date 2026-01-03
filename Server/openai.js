const openAi = require("openai");
require('dotenv').config();

const openai = new openAi({
  apiKey : process.env.OPENAI_API_KEY,
});

module.exports = openai;
