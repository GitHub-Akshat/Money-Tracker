import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-medium">
          Transactions
        </h2>

        <Link
          to="/add"
          className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">
          + Add
        </Link>

      </div>
      <ul className="space-y-3">

        {transactions.length === 0 && <li className="text-gray-500">No transactions yet.</li>}

        {transactions.map(tx => (
          <li key={tx._id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-medium">{tx.title}</div>
              <div className="text-sm text-gray-500">
                {tx.category} • {new Date(tx.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`font-semibold ${tx.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {tx.amount >= 0 ? `+ ₹${tx.amount}` : `- ₹${Math.abs(tx.amount)}`}
              </div>
              <Link
                to={`/${tx._id}/edit`}
                className="text-sm px-2 py-1 border rounded"
              >
                Edit
              </Link>
              <Link
                to={`/${tx._id}/delete`}
                className="text-sm px-2 py-1 border rounded text-red-600"
              >
                Delete
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
