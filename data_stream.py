import asyncio
import json
import websockets
from storage import update_order_book

BINANCE_WS = "wss://stream.binance.com:9443/ws/btcusdt@depth20@100ms"

async def start_stream():
    while True:
        try:
            async with websockets.connect(BINANCE_WS) as ws:
                while True:
                    msg = await ws.recv()
                    data = json.loads(msg)
                    update_order_book(data)
        except Exception as e:
            print(f"WebSocket error: {e}, reconnecting...")
            await asyncio.sleep(2)
