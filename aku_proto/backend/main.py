from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import pandas as pd
import math
import joblib
import numpy as np
import logging

# ---------- INITIALIZATION ----------
logger = logging.getLogger("uvicorn")
app = FastAPI()

feature_order = [
    'Maternal BMI',
    'Maternal education_Primary',
    'Maternal education_No education',
    'Number of pregnancies',
    'Maternal religion_Islam',
    'Delivery assistant_Nurse',
    'Maternal marital status_Unmarried',
    'Child age (months)',
    'Child weight-for-age z-scores',
    'Child height-for-age z-scores',
    'Child weight-for-height z-scores',
    'Wealth index',
    'Maternal age (years)',
    'Child birthweight (kg)',
    'Maternal depressive symptom scores',
    'Place of delivery_Clinic',
    'Number of children aged 1 to 5 years',
    'Total number of children',
    'Psychosocial stimulation scores',
    'Child BMI z-scores',
    'Child head circumference z-scores'
]

# Load static resources once (safe for concurrent users)
model = joblib.load("../data/logistic_regression_trained_with_21_model.pkl")
datasets = [
    pd.read_csv("../data/wfa_boys_0-to-5-years_zscores.csv"),
    pd.read_csv("../data/wfa_girls_0-to-5-years_zscores.csv"),
    pd.read_csv("../data/lhfa_boys_0-to-2-years_zscores.csv"),
    pd.read_csv("../data/lhfa_girls_0-to-2-years_zscores.csv"),
    pd.read_csv("../data/wfl_boys_0-to-2-years_zscores.csv"),
    pd.read_csv("../data/wfl_girls_0-to-2-years_zscores.csv"),
    pd.read_csv("../data/bmi_boys_0-to-2-years_zcores.csv"),
    pd.read_csv("../data/bmi_girls_0-to-2-years_zscores.csv"),
    pd.read_csv("../data/hcfa-boys-0-5-zscores.csv"),
    pd.read_csv("../data/hcfa-girls-0-5-zscores.csv"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- HELPERS ----------
def compute_bmi(weight: float, height: float) -> float:
    return weight / ((height / 100) ** 2)

def map_value(x: float) -> int:
    return int((x - 45) * (130) / (110 - 45))

def z_score_formula(X, L, M, S):
    if S == 0:
        return None
    try:
        if L == 0:
            return math.log(X / M) / S
        return (((X / M) ** L) - 1) / (L * S)
    except (ValueError, ZeroDivisionError):
        return None

def compute_z_scores(vars, cols, gender):
    z_scores = []
    datasets_slice = datasets[::2] if gender == "Male" else datasets[1::2]
    for i, (var, col) in enumerate(zip(vars, cols)):
        ref_row = datasets_slice[i].iloc[int(col)]
        L, M, S = ref_row["L"], ref_row["M"], ref_row["S"]
        z_scores.append(z_score_formula(float(var), L, M, S))
    return z_scores

def compute_phq_score(scores):
    return np.sum(scores) - 9

def compute_wi_score(data):
    # Example: sum wealth-related items
    wealth_items = [
        "Bicycle", "Car", "Computer", "Cooker", "FWater", "Floor", "Fridge",
        "Fuel", "Kitchen", "Light", "Motorbike", "Phone", "Radio", "Rent",
        "Roof", "SWater", "Shared", "TV", "Toilet", "VM", "Wall"
    ]
    return sum(int(data.get(item, 0)) for item in wealth_items)

def clean_data(data):
    # Remove unused fields
    remove_keys = [
        "Baby Height", "Baby Weight", "Baby gender", "Maternal height",
        "Maternal weight", "Head Circ", *[f"Q{i}" for i in range(1,10)],
        "Bicycle","Car","Computer","Cooker","FWater","Floor","Fridge","Fuel",
        "Kitchen","Light","Motorbike","Phone","Radio","Rent","Roof","SWater",
        "Shared","TV","Toilet","VM","Wall"
    ]
    for key in remove_keys:
        data.pop(key, None)
    return data

def prepare_features(raw_data: dict) -> dict:
    # Compute derived features
    maternal_bmi = compute_bmi(float(raw_data['Maternal weight']), float(raw_data['Maternal height']))
    baby_bmi = compute_bmi(float(raw_data['Baby Weight']), float(raw_data['Baby Height']))

    vars = [
        float(raw_data['Baby Weight']),
        float(raw_data['Baby Height']),
        float(raw_data['Baby Weight']),
        baby_bmi,
        float(raw_data['Head Circ'])
    ]
    cols = [
        int(raw_data['Child age (months)']),
        int(raw_data['Child age (months)']),
        map_value(round(float(raw_data['Baby Height']) * 2) / 2),
        int(raw_data['Child age (months)']),
        int(raw_data['Child age (months)'])
    ]

    z_scores = compute_z_scores(vars, cols, raw_data['Baby gender'])

    # Add to features dict
    features = raw_data.copy()
    features['Maternal BMI'] = maternal_bmi
    features['Child weight-for-age z-scores'] = z_scores[0]
    features['Child height-for-age z-scores'] = z_scores[1]
    features['Child weight-for-height z-scores'] = z_scores[2]
    features['Child BMI z-scores'] = z_scores[3]
    features['Child head circumference z-scores'] = z_scores[4]

    phq_answers = [int(raw_data[f'Q{i}']) for i in range(1, 10)]
    features['Maternal depressive symptom scores'] = compute_phq_score(phq_answers)


    # Placeholder or calculate properly
    features['Wealth index'] = 2
    features['Psychosocial stimulation scores'] = 15
    features['Child birthweight (kg)'] = 3.1

    return clean_data(features)

def predict(df_input: pd.DataFrame) -> int:
    y_pred = model.predict(df_input)
    return int(y_pred[0])


class ProcessRequest(BaseModel):
    allData: Dict[str, str]


@app.post("/process")
async def process_data(request: ProcessRequest):
    raw_data = request.allData
    logger.info("Received data for prediction")

    features = prepare_features(raw_data)

    for c,v in features.items():
        features[c] = [v]
        logger.info(f"{c} -> {v}")

    df_input = pd.DataFrame(features)[feature_order]

    score = predict(df_input)

    logger.info(f"Prediction: {score}")
    return {"score": score}
