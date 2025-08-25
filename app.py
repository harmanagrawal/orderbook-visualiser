from fastapi import FastAPI
from fastapi.responses import JSONResponse
import asyncio
from fastapi.middleware.cors import CORSMiddleware

from data_stream import start_stream
from storage import get_latest_order_book

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(start_stream())

@app.get("/orderbook")
async def orderbook():
    data = get_latest_order_book()
    if not data:
        return JSONResponse({"error": "No data yet"}, status_code=503)
    return data
