import { useEffect, useState } from "react";

export default function useOrderBook() {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/orderbook"); // your FastAPI WS

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderBook(data);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/orderbook"); // your FastAPI WS

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Orderbook update:", data);   // 👈 ADD THIS
        setOrderBook(data);
        };

      return () => ws.close();
    }, []);


  return orderBook;
}

