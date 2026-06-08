"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation Login($email:String!, $password:String!) {
                login(email:$email, password:$password)
              }
            `,
            variables: {
              email,
              password,
            },
          }),
        }
      );

      const result =
        await response.json();

      if (result.data) {
        localStorage.setItem(
          "token",
          result.data.login
        );

        alert("Login Successful!");

        window.location.href = "/students";
      } else {
        alert(
          result.errors?.[0]
            ?.message ||
            "Login Failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-2xl p-10 w-[450px]">
      
      <h1 className="text-2xl font-bold text-center text-black mb-2">
        Login
      </h1>

      <p className="text-center text-slate-500 mb-8">
        Welcome Back
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-6 text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}