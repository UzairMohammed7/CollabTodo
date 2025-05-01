import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-r from-[#23486F] to-cyan-600 text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-6 px-4 leading-snug">
        "Small deeds done are better than great deeds planned." <br />
        <span className="text-sm">~ Peter Marshall</span>
      </h1>

      <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in-down">
        <h2 className="text-3xl font-extrabold text-center text-cyan-500">
          TODO
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm font-semibold">
              {error.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.626 11.769a6 6 0 1 0-7.252 0A9.008 9.008 0 0 0 3 20a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0-5.374-8.231zM8 7a4 4 0 1 1 4 4 4 4 0 0 1-4-4zm10 14H6a1 1 0 0 1-1-1 7 7 0 0 1 14 0 1 1 0 0 1-1 1z" />
            </svg>
            Login
          </button>
        </form>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
