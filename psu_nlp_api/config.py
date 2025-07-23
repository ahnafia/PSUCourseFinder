import os

class Config:
    FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
    FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))
    SENTIMENT_MODEL = os.getenv(
        "SENTIMENT_MODEL",
        "distilbert-base-uncased-finetuned-sst-2-english"
    )
    EMBEDDING_MODEL = os.getenv(
        "EMBEDDING_MODEL",
        "all-MiniLM-L6-v2"
    )
