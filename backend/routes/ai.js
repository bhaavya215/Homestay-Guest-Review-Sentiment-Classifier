const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/classify', async (req, res) => {
    try {
        const { reviewText } = req.body;
        
        if (!reviewText) {
            return res.status(400).json({ error: "Review text is required" });
        }

        const prompt = `Classify the following homestay review as Positive, Neutral, or Negative. Also extract maximum 3 key themes. Return ONLY a valid JSON object in this exact format: {"sentiment": "Positive", "themes": ["theme1", "theme2"]}. Review: "${reviewText}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
        });

        const aiText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResponse = JSON.parse(aiText);

        res.status(200).json(parsedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process AI request" });
    }
});

module.exports = router;