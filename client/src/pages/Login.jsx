import API from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-xl font-semibold mb-4">
        Login
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
          Login
        </button>
        <button
          className="w-full bg-indigo-600 text-white p-2 rounded"
          onClick={()=> navigate("/register")}  
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default Login