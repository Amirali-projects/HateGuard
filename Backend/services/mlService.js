const axios = require('axios');
const ML_URL = process.env.FLASK_ML_URL || 'http://localhost:5002/predict';

const analyzeText = async (text) => {
    try {
        const response = await axios.post(ML_URL, { text }, { timeout: 4000 });

        if (!response.data) {
            throw new Error("Empty ML response data payload");
        }

        // Extract raw scores from your Flask application
        let rawConfidence = response.data.confidence || 0.0;
        let category = response.data.category || 'Clean';
        let isHateFlag = response.data.is_hate || false;

        // FIX: If Flask sends confidence as a percentage (e.g., 77.11), convert it down to a decimal (0.7711)
        if (rawConfidence > 1.0) {
            rawConfidence = rawConfidence / 100;
        }

        // FIX: Safety check. If the model explicitly says "Neutral" or "Clean", it is NOT hate speech
        if (category === 'Neutral' || category === 'Clean') {
            isHateFlag = false;
        }

        return {
            is_hate: isHateFlag,
            confidence: rawConfidence, // Will now accurately be between 0.0 and 1.0
            category: category
        };

    } catch (err) {
        console.error("🚨 [mlService Error]:", err.message);
        return {
            is_hate: false,
            confidence: 0.0,
            category: 'Clean'
        };
    }
};

module.exports = { analyzeText };