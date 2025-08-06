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
    value = data.get("value")
    result = f"Processed: {value}"
    return {"result": result + 10}
