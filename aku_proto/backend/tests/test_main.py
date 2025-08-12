from fastapi.testclient import TestClient
from ..main import app
import os
import pandas as pd
from ..main import compute_q_score, z_score_formula, compute_z_scores, map_value
from unittest.mock import patch

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

##FUNCTION TESTS##

def test_map_value():
    mapped = map_value(67.5)
    assert mapped == 45

def test_z_score_formula():
    z = z_score_formula(10, 1.2, 12, 0.1)
    assert isinstance(z, float)

def test_compute_q_score():
    q = compute_q_score()
    assert isinstance(q, int)