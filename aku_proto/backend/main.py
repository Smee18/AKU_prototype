from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import logging

def import_datasets():
    boy_scores = pd.read_csv(r'../data/wfa_boys_0-to-5-years_zscores.csv')
    girl_scores = pd.read_csv(r'../data/wfa_girls_0-to-5-years_zscores.csv')
    return boy_scores, girl_scores

def compute_z_score(weight, L, M, S):
    top = np.power(int(weight) / M, L) - 1
    bottom = L * S
    return top / bottom

logger = logging.getLogger("uvicorn")
app = FastAPI()

# Allow access from your Expo client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
async def process_data(request: Request):
    data = await request.json()
    gender = data.get("gender")
    age = data.get("age")
    weight = data.get("weight")

    boy_scores, girl_scores = import_datasets()

    if gender == "Male":
        ref_row = boy_scores.iloc[int(age)]
        
    elif gender == "Female":
        ref_row = girl_scores.iloc[int(age)]

    logger.info(ref_row)
    L, M, S = ref_row['L'], ref_row['M'], ref_row['S']

    z_score = compute_z_score(weight, L, M, S)
    return {"result": z_score}

