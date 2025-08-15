from typing import Optional
from orderbook import process_order_book

_latest_order_book = None

def update_order_book(raw_data):
    global _latest_order_book
    _latest_order_book = process_order_book(raw_data)

def get_latest_order_book() -> Optional[dict]:
    return _latest_order_book
