import API from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password });
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-xl font-semibold mb-4">
        Register
      </h1>

      {
        error &&
        <div className="mb-3 text-red-600">
          {error}
        </div>
      }

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email" value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-indigo-600 text-white p-2 rounded">
          Register
        </button>
        <button
          className="w-full bg-indigo-600 text-white p-2 rounded"
          onClick={()=>navigate('/login')}
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Register