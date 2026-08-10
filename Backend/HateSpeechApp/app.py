from flask import Flask, request, jsonify
from hate_speech_inference import HateSpeechDetector

app = Flask(__name__)

# Load the model once when the server starts
detector = HateSpeechDetector(
    model_path="best_lstm_model.pt",
    vocab_path="vocab.json",
    config_path="model_config.json"
)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    text = data.get("text", "")

    label, confidence = detector.predict(text)

    return jsonify({
        "label": label,
        "category": "Hate Speech" if label == "HATE" else "Clean",
        "is_hate": label == "HATE",
        "confidence": round(float(confidence), 4)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)