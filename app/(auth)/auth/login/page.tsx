"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "./login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await login(formData);
      if (response.error) {
        setError(response.error);
        setLoading(false);
      } else {
        router.push(response.redirect);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-2">
      {/* Overlay Spinner */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-[280px] max-w-[90vw] bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-center mb-3">
          <Image
            src="/favicon.svg"
            alt="Cravings Logo"
            width={28}
            height={28}
            priority
          />
        </div>

        <h1 className="text-[13px] mb-4 font-bold text-gray-800 text-center">
          Cravings
        </h1>

        {error && (
          <p className="mb-2 text-[9px] text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-[10px] placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none transition-colors disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-[10px] placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-1 rounded-md text-[10px] font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}