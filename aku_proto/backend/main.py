from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow access from your Expo client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
async def process_data(request: Request):
    data = await request.json()
    valueA = data.get("valueA")
    valueB = data.get("valueB")
    valueC = data.get("valueC")
    result = int(valueA) + int(valueB) - int(valueC)
    return {"result": result}

