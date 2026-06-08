"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[450px] text-center">
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          User Profile Portal
        </h1>

        <p className="text-slate-500 mb-8">
          Manage student profiles efficiently
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Signup
          </Link>
        </div>       
      </div>
    </div>
  );
}