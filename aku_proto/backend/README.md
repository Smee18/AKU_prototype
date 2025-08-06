1. Navigate to the extracted folder by running:
   cd path/to/extracted/folder

2. (Optional but recommended) Create and activate a Python virtual environment:
   - Create venv:
       python -m venv venv
   - Activate venv:
       * On Windows:
         venv\Scripts\activate
       * On macOS/Linux:
         source venv/bin/activate

3. Install required packages:
   pip install -r requirements.txt

4. Run the code:
    uvicorn main:app --reload --port 8000