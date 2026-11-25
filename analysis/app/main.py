from contextlib import asynccontextmanager

import spacy
from fastapi import FastAPI

nlp = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global nlp
    nlp = spacy.load("es_core_news_md")  #se carga UNA SOLA VEZ (al arrancar)
    yield


app = FastAPI(title="Servicio de análisis", lifespan=lifespan)


@app.get("/health")
def health():
    return {"status": "ok", "model": nlp.meta["name"]}


@app.post("/debug/pos")
def pos(payload: dict):
    doc = nlp(payload["text"])
    return [{"text": t.text, "pos": t.pos_, "lemma": t.lemma_} for t in doc]