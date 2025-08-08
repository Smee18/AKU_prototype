from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import logging

survey_answers = {
    "WHOScreen": 0,
    "Q1Screen": 0,
    "Q2Screen": 0,
    "Q3Screen": 0,
    "Q4Screen": 0,
    "Q5Screen": 0,
    "Q6Screen": 0,
    "Q7Screen": 0,
    "Q8Screen": 0,
    "Q9Screen": 0,
}

def import_datasets():
    boy_scores = pd.read_csv(r'../data/wfa_boys_0-to-5-years_zscores.csv')
    girl_scores = pd.read_csv(r'../data/wfa_girls_0-to-5-years_zscores.csv')
    return boy_scores, girl_scores

def compute_z_score(weight, L, M, S):
    top = np.power(int(weight) / M, L) - 1
    bottom = L * S
    return top / bottom

def compute_q_score():
    q_score = 0
    for key, val in survey_answers.items():
        if key.startswith("Q") and isinstance(val, dict):
            q_score += val.get("value", 0)
    return q_score


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
    arrived = await request.json()
    data = arrived.get("data")
    current_screen = arrived.get("currentScreen")
    survey_answers[current_screen] = data

    if current_screen == "Q9Screen":

        boy_scores, girl_scores = import_datasets()

        logger.info(survey_answers)

        who_data = survey_answers.get("WHOScreen", {})
        gender = who_data.get("gender")
        age = who_data.get("age")
        weight = who_data.get("weight")

        if gender == "Male":
            ref_row = boy_scores.iloc[int(age)]
            
        elif gender == "Female":
            ref_row = girl_scores.iloc[int(age)]

        logger.info(ref_row)
        L, M, S = ref_row['L'], ref_row['M'], ref_row['S']

        z_score = compute_z_score(weight, L, M, S)
        q_score = compute_q_score()
        logger.info(z_score)
        logger.info(q_score)
        return {"z_score": z_score, "q_score": q_score}

