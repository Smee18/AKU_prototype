from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import logging
import math
import joblib

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
    "WIScreen1": 0,
    "WIScreen2": 0,
    "WIScreen2bis": 0,
    "WIScreen3": 0,
    "WIScreen4": 0,
    "WIScreen5": 0,
    "WIScreen6": 0,
    "WIScreen7": 0,
    "WIScreen8": 0,
    "WIScreen9": 0,
}

score = 0

def import_model():
    model = joblib.load(r"../data/logistic_regression_trained_with_21_model.pkl")
    return model

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

def compute_z_scores():

    z_scores = []

    who_data = survey_answers.get("WHOScreen", {})
    gender = who_data.get("gender")
    age = who_data.get("age")
    weight = who_data.get("weightB")
    height = who_data.get("heightB")
    head_circ = who_data.get("head")
    bmi = float(weight) / ((float(height) / 100)**2)

    vars = [weight, height, weight, bmi, head_circ] # What we are measuring
    cols = [age, age, map_value(round(float(height) * 2) / 2), age, age] # What it is relative to

    if gender == "Male":
        datasets_slice = datasets[::2] 
    else:
        datasets_slice = datasets[1::2]
    
    for i, (var, col) in enumerate(zip(vars, cols)): # For each var, extract the row from the dataset and the L,M,S values and compute z-scores

        logger.info(f"Calculating {var} for {col}")
        ref_row = datasets_slice[i].iloc[int(col)]
        L, M, S = ref_row['L'], ref_row['M'], ref_row['S']
        z_scores.append(z_score_formula(float(var), L, M, S))
        logger.info("Success")
    
    return z_scores

def compute_phq_score(): # PHQ score - adds up values from screens beginning with Q

    q_score = 0

    for key, val in survey_answers.items():

        if key.startswith("Q") and isinstance(val, dict):
            q_score += val.get("value", 0)

    return q_score - 9 # Remove nine as default value is 1 not 0


def compute_wi_score():

    WI_score = 0

    for key, val in survey_answers.items():

        if key.startswith("WI") and isinstance(val, dict):
            for c,v in val.items():
                if c == "isRent" or c == "isShared":
                    v = bool(int(v))
                    WI_score += (int(not v))
                else: 
                    WI_score += int(v)
                    
    return WI_score

def predict(z, phq, wi):

    #Extract all variables
    mother_dataA = survey_answers.get("MotherInfoScreenA", {})
    mother_dataB = survey_answers.get("MotherInfoScreenB", {})
    clinic_data = survey_answers.get("ClinicInfoScreen", {})
    who_data = survey_answers.get("WHOScreen", {})

    isEdu = mother_dataA.get("isEdu")
    isMainEdu = mother_dataA.get("isMainEdu")
    isMarried = mother_dataA.get("isMarried")
    isMuslim = mother_dataA.get("isMuslim")

    ageM = mother_dataB.get("age")
    heightM = mother_dataB.get("heightM")
    weightM = mother_dataB.get("weightM")
    kids = mother_dataB.get("nbKids")
    under5 = mother_dataB.get("under5")
    bmiM = float(weightM) / ((float(heightM) / 100)**2)

    preg = clinic_data.get("nbPreg")
    nurse = clinic_data.get("isNurse")
    clinic = clinic_data.get("isClinic")

    ageB = who_data.get("age")
    weightB = who_data.get("weightB")

    input = {
    'Maternal BMI': [bmiM],
    'Maternal education_Primary': [isMainEdu],
    'Maternal education_No education': [isEdu],
    'Number of pregnancies': [preg],
    'Maternal religion_Islam': [isMuslim],
    'Delivery assistant_Nurse': [nurse],
    'Maternal marital status_Unmarried': [isMarried],
    'Child age (months)': [ageB],
    'Child weight-for-age z-scores': [z[0]],
    'Child height-for-age z-scores': [z[1]],
    'Child weight-for-height z-scores': [z[2]],
    'Wealth index': [2], #SET TO WI ONCE MCA WORKS
    'Maternal age (years)': [ageM],
    'Child birthweight (kg)': [weightB],
    'Maternal depressive symptom scores': [phq],
    'Place of delivery_Clinic': [clinic],
    'Number of children aged 1 to 5 years': [under5],
    'Total number of children': [kids],
    'Psychosocial stimulation scores': [15],
    'Child BMI z-scores': [z[3]],
    'Child head circumference z-scores': [z[4]]
    }

    for c,v in input.items():
        logger.info(f"{c} -> {v}")
    
    df_input = pd.DataFrame(input)


    y_pred = model.predict(df_input)
    return int(y_pred[0])



logger = logging.getLogger("uvicorn")
app = FastAPI()
datasets = import_datasets()
model = import_model()

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

    global score
    arrived = await request.json()
    data = arrived.get("data")
    current_screen = arrived.get("currentScreen")
    survey_answers[current_screen] = data # updates dict

    if current_screen == "WIScreen9": # Enter loop if we have reached the last screen

        logger.info(survey_answers)

        z_scores = compute_z_scores()
        phq_score = compute_phq_score()
        wi_score = compute_wi_score()
        score = predict(z_scores, phq_score, wi_score)

#Sends final scores back the frontend
@app.post("/getScores")  
def get_scores():
    logger.info(f"Sending: {score}")
    return {"score": score}
