import spacy
from rake_nltk import Rake

# Load spaCy model once
nlp_spacy = spacy.load("en_core_web_sm")
rake = Rake()

def extract_keywords(text: str, top_n: int = 5) -> list[str]:
    rake.extract_keywords_from_text(text)
    return rake.get_ranked_phrases()[:top_n]
