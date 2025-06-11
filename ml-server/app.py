from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
import joblib
import numpy as np
import requests
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

RECIPE_BACKEND_URL = os.getenv("RECIPE_BACKEND_URL", "http://localhost:3000")

app = FastAPI()

class RecipeRequest(BaseModel):
    ingredients: List[str]

@app.on_event("startup")
def load_models():
    global tfidf_vectorizer, tfidf_matrix
    try:
        tfidf_vectorizer = joblib.load("tfidf_vectorizer.pkl")
        tfidf_matrix = joblib.load("tfidf_matrix.pkl")
    except Exception as e:
        raise RuntimeError(f"Gagal memuat model: {str(e)}")

@app.post("/find-similar-recipes")
async def find_similar_recipes(request: RecipeRequest):
    try:
        response = requests.get(f"{RECIPE_BACKEND_URL}/recipe/recomendation")
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Gagal mengambil data resep dari backend")

        recipes = response.json().get("data", [])
        if not recipes:
            raise HTTPException(status_code=404, detail="Tidak ada resep ditemukan dari backend")

        recipe_ingredients = [str(r.get("ingredients_cleaned", "")) for r in recipes]
        recipe_vectors = tfidf_vectorizer.transform(recipe_ingredients)

        ingredients_text = " ".join(request.ingredients)
        input_vector = tfidf_vectorizer.transform([ingredients_text])

        similarities = np.dot(input_vector, recipe_vectors.T).toarray()[0]
        top_indices = similarities.argsort()[-5:][::-1]
        top_scores = similarities[top_indices]

        top_matches = [
            {
                "id": recipes[i]["id"],
                "title": recipes[i]["title_cleaned"],
                "ingredients": recipes[i]["ingredients_cleaned"],
                "score": float(score)
            }
            for i, score in zip(top_indices, top_scores)
        ]

        return JSONResponse({
            "input_ingredients": request.ingredients,
            "top_matches": top_matches
        })

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=500, detail=f"Gagal mencari resep: {str(e)}")
