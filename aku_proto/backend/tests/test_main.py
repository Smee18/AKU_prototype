from fastapi.testclient import TestClient
from ..main import app
import os
import pandas as pd
from ..main import compute_z_score, compute_q_score
from unittest.mock import patch

base_dir = os.path.dirname(os.path.abspath(__file__))
client = TestClient(app)

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

def test_compute_z_score():
    z = compute_z_score(10, 1.2, 12, 0.1)
    assert isinstance(z, float)

def test_compute_q_score():
    q = compute_q_score()
    assert isinstance(q, int)

def test_functions_called_only_for_q9():

    client.post("/process", json={
        "data": {
            "gender": "Male",
            "age": 2,
            "weight": 12
        },
        "currentScreen": "WHOScreen"
    })

    with patch("backend.main.compute_z_score") as mock_a, \
         patch("backend.main.compute_q_score") as mock_b:
        
        response = client.post("/process", json={
            "data": {}, 
            "currentScreen": "Q9Screen"
        })
        
        assert response.status_code == 200
        mock_a.assert_called_once()
        mock_b.assert_called_once()


    with patch("backend.main.compute_z_score") as mock_a, \
         patch("backend.main.compute_q_score") as mock_b:
        
        response = client.post("/process", json={
            "data": {},
            "currentScreen": "Q2Screen"
        })
        
        assert response.status_code == 200
        mock_a.assert_not_called()
        mock_b.assert_not_called()


