import React, { useEffect, useState } from "react";
import OrderBookChart from "./components/OrderBookChart";

function App() {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/orderbook");
        const data = await res.json();
        setOrderBook(data);
      } catch (err) {
        console.error("Error fetching orderbook:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // refresh every 2s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/orderbook")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orderbook data:", data); // 👈 debug here
        setOrderBook(data);
      })
      .catch((err) => console.error("Error fetching orderbook:", err));
  }, []);


  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Order Book Depth Chart</h2>
      <OrderBookChart data={orderBook} />
    </div>
  );
}

export default App;
