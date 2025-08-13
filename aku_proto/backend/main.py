from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import logging
import math

#Stores the answers from each screen as a dict
survey_answers = {
    "BeginScreen": 0,
    "MotherInfoScreenA": 0,
    "MotherInfoScreenB": 0,
    "ClinicInfoScreen": 0,
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

scores = {} # Final dict which is send back
z_scores = {} # Contains the 5 z-scores for the specified gender

def import_datasets():
    boy_scores_wfa = pd.read_csv(r'../data/wfa_boys_0-to-5-years_zscores.csv')
    girl_scores_wfa = pd.read_csv(r'../data/wfa_girls_0-to-5-years_zscores.csv')
    boy_scores_hfa = pd.read_csv(r'../data/lhfa_boys_0-to-2-years_zscores.csv')
    girl_scores_hfa = pd.read_csv(r'../data/lhfa_girls_0-to-2-years_zscores.csv')
    boy_scores_wfh = pd.read_csv(r'../data/wfl_boys_0-to-2-years_zscores.csv')
    girl_scores_wfh = pd.read_csv(r'../data/wfl_girls_0-to-2-years_zscores.csv')
    boy_scores_bmi = pd.read_csv(r'../data/bmi_boys_0-to-2-years_zcores.csv')
    girl_scores_bmi = pd.read_csv(r'../data/bmi_girls_0-to-2-years_zscores.csv')
    boy_scores_head = pd.read_csv(r'../data/hcfa-boys-0-5-zscores.csv')
    girl_scores_head = pd.read_csv(r'../data/hcfa-girls-0-5-zscores.csv')
    return [boy_scores_wfa, girl_scores_wfa, boy_scores_hfa, girl_scores_hfa, boy_scores_wfh, girl_scores_wfh, boy_scores_bmi, girl_scores_bmi, boy_scores_head, girl_scores_head]

def map_value(x): # Used to map the baby height the corresponding row using interpolation

    return int((x - 45) * (130) / (110 - 45))

def z_score_formula(X, L, M, S): # Official WHO formula for z scores, will return None if provided values are incoherent (45kg 3 month baby)

    if S == 0:
        return None
    
    try:
        if L == 0:
            return math.log(X / M) / S
        else:
            return (((X / M) ** L) - 1) / (L * S)
        
    except (ValueError, ZeroDivisionError):
        return None  

def compute_z_scores(age, weight, height, bmi, head_circ, gender):

    vars = [weight, height, weight, bmi, head_circ] # What we are measuring
    cols = [age, age, height, age, age] # What it is relative to

    if gender == "Male":
        datasets_slice = datasets[::2] 
    else:
        datasets_slice = datasets[1::2]
    
    for i, (var, col) in enumerate(zip(vars, cols)): # For each var, extract the row from the dataset and the L,M,S values and compute z-scores

        logger.info(f"Calculating {var} for {col}")
        ref_row = datasets_slice[i].iloc[col]
        L, M, S = ref_row['L'], ref_row['M'], ref_row['S']
        z_scores[i] = z_score_formula(var, L, M, S)
        logger.info("Success")
    
    return z_scores

def compute_q_score(): # PHQ score - adds up values from screens beginning with Q

    q_score = 0

    for key, val in survey_answers.items():

        if key.startswith("Q") and isinstance(val, dict):
            q_score += val.get("value", 0)

    return q_score - 9 # Remove nine as default value is 1 not 0


logger = logging.getLogger("uvicorn")
app = FastAPI()
datasets = import_datasets()

# Allow access from your Expo client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process") # Is called everytime the "Next" button is pressed
async def process_data(request: Request):

    global scores
    arrived = await request.json()
    data = arrived.get("data")
    current_screen = arrived.get("currentScreen")
    survey_answers[current_screen] = data # updates dict

    if current_screen == "Q9Screen": # Enter loop if we have reached the last screen

        logger.info(survey_answers)

        #Extract all variables
        mother_dataA = survey_answers.get("MotherInfoScreenA", {})
        mother_dataB = survey_answers.get("MotherInfoScreenB", {})
        heightM = mother_dataB.get("heightM")
        weightM = mother_dataB.get("weightM")
        who_data = survey_answers.get("WHOScreen", {})
        genderB = who_data.get("gender")
        ageB = who_data.get("age")
        weightB = who_data.get("weightB")
        heightB = who_data.get("heightB")
        head_circ = who_data.get("head")
        bmiB = float(weightB) / float(heightB)
        bmiM = float(weightM) / float(heightM)

        compute_z_scores(int(ageB), 
                         float(weightB), 
                         map_value(round(float(heightB) * 2) / 2), 
                         float(bmiB), 
                         float(head_circ), 
                         genderB)

        q_score = compute_q_score()
        scores = {**z_scores, **{"q_score": q_score}}

#Sends final scores back the frontend
@app.post("/getScores")  
def get_scores():
    logger.info(f"Sending: {scores}")
    return scores

