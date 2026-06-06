from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load('hate_speech_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

@app.route('/', methods=['GET'])
def home():
    return "ML API is running"

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    text = data['text']

    vector = vectorizer.transform([text])

    prediction = model.predict(vector)[0]
    confidence = max(model.predict_proba(vector)[0]) * 100

    return jsonify({
        "is_hate": bool(prediction),
        "confidence": round(confidence, 2),
        "category": "Hate Speech" if prediction else "Neutral"
    })

if __name__ == '__main__':
    app.run(port=5002)