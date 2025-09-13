import API from "../api/axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#FF5722", "#2196F3", "#FFC107", "#9C27B0"];

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/transactions").then(res => {
      const byCategory = {};
      res.data.forEach(tx => {
        byCategory[tx.category] = (byCategory[tx.category] || 0) + tx.amount;
      });
      const chartData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
      setData(chartData);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="text-lg font-medium mb-4">By Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8" label>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
