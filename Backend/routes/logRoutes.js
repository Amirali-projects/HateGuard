const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { analyzeText } = require('../services/mlService');

// ===============================
// 🔥 DETECT ROUTE (MAIN API)
// ===============================
router.post('/detect', async (req, res) => {
    try {
        const { text } = req.body;

        // Basic payload validation
        if (!text || text.trim() === '') {
            return res.status(400).json({
                message: "Text data field is required"
            });
        }

        // Send raw text payload to your optimized ML service bridge
        const result = await analyzeText(text);

        // Extract values from the microservice response object
        let { is_hate, confidence, category } = result;

        // 🌟 FIX: If Flask sends confidence as a percentage (e.g. 86.8), normalize it to a decimal (0.868)
        if (confidence > 1.0) {
            confidence = confidence / 100;
        }

        // 🌟 FIX: Standardize "Clean" or "Neutral" category strings coming from ML
        if (!category || category === 'Clean' || category === 'Neutral') {
            category = 'Neutral';
            is_hate = false; // Safety fallback
        }

        // Enforce the explicit 50% confidence rule threshold override
        if (confidence > 0.50 && category === 'Neutral') {
            is_hate = true;
            category = 'Hate Speech';
        }

        // ===============================
        // 🔥 ALWAYS SAVE TO DATABASE
        // ===============================
        const savedLog = await Log.create({
            username: "Web Interface",
            content: text,
            toxicityScore: confidence, // Saved as a clean decimal (e.g., 0.8688)
            category: category
        });

        // ===============================
        // 🔥 RESPONSE TO FRONTEND
        // ===============================
        // Returning the freshly saved document ensuring 'createdAt' is sent right back
        return res.json(savedLog);

    } catch (err) {
        console.error("❌ Detect API Error:", err.message);
        return res.status(500).json({
            message: "Internal Backend Core Processing Error"
        });
    }
});

// ===============================
// 📊 GET LOGS (Dashboard)
// ===============================
router.get('/', async (req, res) => {
    try {
        // Fetches historical analytical instances ordered by newest entries first using native Mongoose timestamps
        const logs = await Log.find().sort({ createdAt: -1 }); 
        return res.json(logs);

    } catch (err) {
        console.error("❌ Log Fetch Error:", err.message);
        return res.status(500).json({
            message: "Error fetching logs collection from database"
        });
    }
});

module.exports = router;