import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login(
        form.email,
        form.password
      );

      loginUser(
        response.data.user,
        response.data.token
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
          IBBUL TSS
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@ibbul.edu.ng"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}