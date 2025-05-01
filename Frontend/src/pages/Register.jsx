import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      console.log("Registration Failed", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-r from-[#23486F] to-cyan-600 text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-6 px-4 leading-snug">
        "The journey of a thousand miles begins with a single step." <br />
        <span className="text-sm">~ Lao Tzu</span>
      </h1>

      <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in-down">
        <h2 className="text-3xl font-extrabold text-center text-cyan-500">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
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
              type="password"
              name="password"
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
              <path d="M12 2a10 10 0 0 0-7.75 16.39l-1.26 3.13a1 1 0 0 0 1.32 1.32l3.13-1.26A10 10 0 1 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
            </svg>
            Register
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
