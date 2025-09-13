import API from "../api/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function DeleteTransaction() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTx() {
            try {
                const res = await API.get(`/transactions/${id}`);
                setTransaction(res.data);
            } catch (err) {
                console.error("Error fetching transaction", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTx();
    }, [id]);

    async function handleDelete() {
        try {
            await API.delete(`/transactions/${id}`);
            toast.success("Transaction deleted!");
            navigate("/");
        } catch (err) {
            console.error("Delete failed", err);
            toast.error("Delete failed");
        }
    }

    if (loading) return <div className="p-6">Loading...</div>;
    if (!transaction) return <div className="p-6">Transaction not found</div>;

    return (

            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

                <h1 className="text-xl font-semibold mb-4">
                    Confirm Delete
                </h1>

                <div className="mb-4">

                    <p className="font-medium">
                        {transaction.title}
                    </p>

                    <p className="text-sm text-gray-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>

                    <p
                        className={`mt-2 font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {transaction.amount >= 0
                            ? `+ ₹${transaction.amount}`
                            : `- ₹${Math.abs(transaction.amount)}`}
                    </p>

                </div>

                <p className="mb-6">
                    Are you sure you want to delete this transaction?
                </p>

                <div className="flex gap-4">

                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Yes, Delete
                    </button>

                    <Link to="/" className="px-4 py-2 border rounded">
                        Cancel
                    </Link>

                </div>

            </div>
    );
}


export default DeleteTransaction