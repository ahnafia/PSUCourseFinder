from flask import Flask, request, jsonify
from nlp.client import analyze_text
from config import Config

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json(force=True)
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "`text` is required"}), 400

    result = analyze_text(text)
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(host=Config.FLASK_HOST, port=Config.FLASK_PORT)
