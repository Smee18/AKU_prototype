1. Navigate to the backend folder
   cd path/to/extracted/folder/aku_proto/backend

2. (Optional but recommended) Create and activate a Python virtual environment:
   - Create venv:
      ```bash
       python -m venv .venv
       ```
   - Activate venv:
       * On Windows:
         ```bash
         .venv\Scripts\activate
         ```
       * On macOS/Linux:
         ```bash
         source .venv/bin/activate
         ```

3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the code:
   ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
