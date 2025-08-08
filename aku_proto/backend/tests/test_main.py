from fastapi.testclient import TestClient
from backend.main import app
import os
import pandas as pd
from main import compute_z_score

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

def test_process_data():
    response = client.post("/process", json={
        "gender": "Male",
        "age": "5",
        "weight": "10"
    })
    assert response.status_code == 200

    data = response.json()
    assert "result" in data
    assert isinstance(data["result"], (float, int))

