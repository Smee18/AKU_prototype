from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_process_data():
    response = client.post("/process", json={
        "valueA": 5,
        "valueB": 3,
        "valueC": 2
    })
    assert response.status_code == 200
    assert response.json() == {"result": 6} 
