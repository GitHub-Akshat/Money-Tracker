import API from "../api/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TransactionForm({ editMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", amount: "", date: "", category: "" });

  useEffect(() => {
    if (editMode && id) {
      API.get(`/transactions/${id}`).then(res => {
        setForm({
          title: res.data.title,
          amount: res.data.amount,
          date: res.data.date.slice(0, 10),
          category: res.data.category,
        });
      });
    }
  }, [editMode, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editMode) {
        await API.put(`/transactions/${id}`, form);
        toast.success("Transaction updated!");
      } else {
        await API.post("/transactions", form);
        toast.success("Transaction added!");
      }
      navigate("/");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-xl">

      <input
        className="w-full border p-2 mb-2"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Amount"
        type="number" value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-2"
        type="date"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      />

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">{editMode ? "Update" : "Add"}
        Transaction
      </button>

    </form>
  );
}
