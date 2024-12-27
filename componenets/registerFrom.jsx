"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error: ", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#614419] min-h-screen flex items-center justify-center">
      <div className="bg-gray-200 rounded-xl shadow-2xl w-full max-w-3xl p-10 min-h-[65vh] transition-all duration-300 animate-fade-in">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Your name"
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Your email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
  
            {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
  
            <button
              type="submit"
              className="w-full text-white bg-[#614419] hover:bg-[#FFB343] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-full text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-black">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
  
}
