"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/profile"); 
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#614419] min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-xl shadow-2xl max-w-4xl w-full p-10  min-h-[65vh] transition-all duration-300 animate-fade-in">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login to your account
          </h1>
          <form onSubmit={handleForm} className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-bold">{error}</p>
            )}

            <button
              type="submit"
              className="w-full text-white bg-[#614419] hover:bg-[#FFB343] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-black">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
