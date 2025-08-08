from fastapi.testclient import TestClient
from backend.main import app
import os
import pandas as pd
from backend.main import compute_z_score

client = TestClient(app)

def test_file_exists_boy():
    assert os.path.isfile("../../data/wfa_boys_0-to-5-years_zscores.csv")

def test_can_load_file_boy():
    df = pd.read_csv("../../data/wfa_boys_0-to-5-years_zscores.csv")
    assert not df.empty

def test_file_exists_girl():
    assert os.path.isfile("../../data/wfa_girls_0-to-5-years_zscores.csv")

def test_can_load_file_girl():
    df = pd.read_csv("../../data/wfa_girls_0-to-5-years_zscores.csv")
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

