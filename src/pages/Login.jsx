import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 text-white w-full">
      <div className="w-full max-w-md bg-[#1a1d29] rounded-3xl p-10 border border-gray-800/50 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-primary-accent tracking-tighter mb-2">
            CINEMA
          </h1>
          <p className="text-gray-400">Sign in to your premium account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#11131a] border border-transparent rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-accent transition-colors"
              placeholder="mohamed@gmail.com"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#11131a] border border-transparent rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-accent transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-primary-accent text-white font-bold py-4 mt-2 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          New to Cinema?{" "}
          <Link
            to="/signup"
            className="text-primary-accent font-bold hover:text-white transition-colors"
          >
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
}
