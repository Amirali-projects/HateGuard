const axios = require("axios");

const ML_URL = process.env.FLASK_ML_URL || "http://localhost:5001/predict";

const analyzeText = async (text) => {
    try {
        const { data } = await axios.post(
            ML_URL,
            { text },
            {
                timeout: 5000,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!data) {
            throw new Error("No response received from ML server.");
        }

        const label = (data.label || "NON-HATE").toUpperCase();
        const confidence = Number(data.confidence) || 0;

        const is_hate = label === "HATE";

        // Convert new model output to old frontend format
        const category = is_hate ? "Hate Speech" : "Clean";

        return {
            is_hate,
            label,
            category,
            confidence
        };

    } catch (error) {

        console.error("🚨 ML Service Error:");

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }

        return {
            is_hate: false,
            label: "NON-HATE",
            category: "Clean",
            confidence: 0
        };
    }
};

module.exports = {
    analyzeText
};