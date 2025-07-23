from transformers import pipeline
from sentence_transformers import SentenceTransformer
from config import Config
from nlp.processor import extract_keywords

# Load once
sentiment_pipe = pipeline(
    "sentiment-analysis",
    model=Config.SENTIMENT_MODEL
)
embedder = SentenceTransformer(Config.EMBEDDING_MODEL)

def analyze_text(text: str) -> dict:
    # sentiment
    res = sentiment_pipe(text)[0]
    score = res["score"] if res["label"] == "POSITIVE" else 1 - res["score"]
    # keywords
    keywords = extract_keywords(text)
    # embedding
    embedding = embedder.encode(text).tolist()

    return {
        "sentiment": score,
        "keywords": keywords,
        "embedding": embedding
    }
