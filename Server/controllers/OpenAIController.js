
const openai = require("../openai.js");

const askAI = async (req, res) => {
 try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    res.status(200).json({
      success: true,
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ success: false, message: "AI error" });
  }
};

module.exports = {
    askAI,
};
