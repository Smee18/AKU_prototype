from fastapi.testclient import TestClient
from ..main import app
import os
import pandas as pd
from ..main import compute_phq_score, z_score_formula, map_value, compute_wi_score, compute_bmi, compute_z_scores, clean_data, prepare_features
import math
import pytest

base_dir = os.path.dirname(os.path.abspath(__file__))
client = TestClient(app)

##WFA##

def test_file_exists_boy():
    file_path = os.path.join(base_dir, '../../data/wfa_boys_0-to-5-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_boy():
    file_path = os.path.join(base_dir, '../../data/wfa_boys_0-to-5-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_file_exists_girl():
    file_path = os.path.join(base_dir, '../../data/wfa_girls_0-to-5-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_girl():
    file_path = os.path.join(base_dir, '../../data/wfa_girls_0-to-5-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

##HFA##

def test_file_exists_boy():
    file_path = os.path.join(base_dir, '../../data/lhfa_boys_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_boy():
    file_path = os.path.join(base_dir, '../../data/lhfa_boys_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_file_exists_girl():
    file_path = os.path.join(base_dir, '../../data/lhfa_girls_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_girl():
    file_path = os.path.join(base_dir, '../../data/lhfa_girls_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

##WFH##

def test_file_exists_boy():
    file_path = os.path.join(base_dir, '../../data/wfl_boys_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_boy():
    file_path = os.path.join(base_dir, '../../data/wfl_boys_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_file_exists_girl():
    file_path = os.path.join(base_dir, '../../data/wfl_girls_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_girl():
    file_path = os.path.join(base_dir, '../../data/wfl_girls_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

##BMI##

def test_file_exists_boy():
    file_path = os.path.join(base_dir, '../../data/bmi_boys_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_boy():
    file_path = os.path.join(base_dir, '../../data/bmi_boys_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_file_exists_girl():
    file_path = os.path.join(base_dir, '../../data/bmi_girls_0-to-2-years_zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_girl():
    file_path = os.path.join(base_dir, '../../data/bmi_girls_0-to-2-years_zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

##HEAD##

def test_file_exists_boy():
    file_path = os.path.join(base_dir, '../../data/hcfa-boys-0-5-zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_boy():
    file_path = os.path.join(base_dir, '../../data/hcfa-girls-0-5-zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_file_exists_girl():
    file_path = os.path.join(base_dir, '../../data/hcfa-boys-0-5-zscores.csv')
    assert os.path.isfile(file_path)

def test_can_load_file_girl():
    file_path = os.path.join(base_dir, '../../data/hcfa-girls-0-5-zscores.csv')
    df = pd.read_csv(file_path)
    assert not df.empty

def test_compute_bmi():
    assert round(compute_bmi(70, 175), 2) == 22.86  
    assert compute_bmi(0, 175) == 0               
    with pytest.raises(ZeroDivisionError):
        compute_bmi(70, 0)                     

def test_map_value():
    assert map_value(45) == 0
    assert map_value(110) == 130
    assert map_value(77.5) == int((77.5 - 45) * 130 / 65)

def test_z_score_formula():
    assert z_score_formula(10, 0, 10, 2) == 0.0    
    assert math.isclose(z_score_formula(12, 0, 10, 2), math.log(12/10)/2)
    assert z_score_formula(12, 1, 10, 2) == ((12/10)**1 - 1)/(1*2)
    assert z_score_formula(12, 1, 10, 0) is None      

def test_compute_phq_score():
    scores = [1, 2, 3, 1, 0, 2, 3, 1, 2]
    assert compute_phq_score(scores) == sum(scores) - 9

def test_compute_wi_score():
    data = {"Bicycle": 1, "Car": 0, "Computer": 1, "Fridge": 1}
    assert compute_wi_score(data) == 3
    assert compute_wi_score({}) == 0

def test_clean_data():
    data = {"Baby Height": 50, "Maternal BMI": 22}
    cleaned = clean_data(data.copy())
    assert "Baby Height" not in cleaned
    assert "Maternal BMI" in cleaned

@pytest.fixture
def mock_datasets(monkeypatch):
    mock_df = pd.DataFrame({"L": [1], "M": [10], "S": [2]})
    monkeypatch.setattr("backend.main.datasets", [mock_df]*10)

def test_compute_z_scores(mock_datasets):
    vars = [10, 20, 10, 18, 15]
    cols = [0, 0, 0, 0, 0]
    z_scores = compute_z_scores(vars, cols, "Male")
    assert len(z_scores) == 5
    assert all(isinstance(z, float) for z in z_scores)

def test_prepare_features(monkeypatch):
    # Mock compute_z_scores to avoid dataset dependency
    monkeypatch.setattr("backend.main.compute_z_scores", lambda v, c, g: [0]*5)

    raw_data = {
        "Maternal weight": "70",
        "Maternal height": "170",
        "Baby Weight": "10",
        "Baby Height": "80",
        "Child age (months)": "12",
        "Baby gender": "Male",
        "Head Circ": "45",
        **{f"Q{i}": "1" for i in range(1, 10)}
    }

    features = prepare_features(raw_data)
    assert "Maternal BMI" in features
    assert "Child BMI z-scores" in features
    assert "Maternal depressive symptom scores" in features