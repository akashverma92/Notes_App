const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Make sure you have GEMINI_API_KEY in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(question);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini." });
  }
});

module.exports = router;
