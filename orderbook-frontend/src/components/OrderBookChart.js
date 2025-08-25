import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const processDepth = (data, type) => {
  if (!data || !data[type]) return [];
  return data[type].map((entry) => ({
    price: entry.Price,
    quantity: entry.Quantity,
    cumulative: entry.Cumulative,
  }));
};


function OrderBookChart({ data }) {
  const bids = processDepth(data, "bids");
  const asks = processDepth(data, "asks");

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="price"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(v) => v.toFixed(2)}
        />
        <YAxis />
        <Tooltip />

        {/* Bids in green */}
        <Line
          type="stepAfter"
          dataKey="cumulative"
          stroke="green"
          data={bids}
          dot={false}
        />

        {/* Asks in red */}
        <Line
          type="stepAfter"
          dataKey="cumulative"
          stroke="red"
          data={asks}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default OrderBookChart;
