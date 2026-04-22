"use client";

import { useState, FormEvent } from "react";
// import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     // login() in AuthContext handles routing to the correct dashboard
  //     await login(username, password);
  //   } catch (err: any) {
  //     setError(
  //       err.message || "Invalid username or password. Please try again.",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Gif<span className="text-orange-200">tech</span>
          </h1>
          <p className="text-orange-100 text-lg mt-2">
            Learning Management System
          </p>
        </div>

        <div className="text-white">
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-orange-100">
            Continue your learning journey with personalised courses,
            assignments, and progress tracking.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: "📚", text: "Access all your enrolled courses" },
              { icon: "📊", text: "Track your learning progress" },
              { icon: "✅", text: "Submit and review assignments" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-orange-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-orange-200 text-sm">
          © 2026 Giftech LMS. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Gif<span className="text-orange-500">tech</span>
            </h1>
            <p className="text-gray-500 mt-1">Learning Management System</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2>
          <p className="text-gray-500 mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Create one
            </Link>
          </p>

          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={() => {}} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg
                           placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           disabled:bg-gray-100 disabled:cursor-not-allowed
                           transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg
                             placeholder:text-gray-400
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                             disabled:bg-gray-100 disabled:cursor-not-allowed
                             transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                         text-white font-semibold rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
