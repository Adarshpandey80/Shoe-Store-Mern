const express = require("express");
const router = express.Router();
const aiController = require("../controllers/OpenAIController");

router.post("/ai/ask", aiController.askAI);

module.exports = router;