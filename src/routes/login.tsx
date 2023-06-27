import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import { BaseResponse, SiakCookie } from "../interface";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    const result = await toast.promise(
      ky
        .post(`${import.meta.env.VITE_API_URL}/login`, {
          json: {
            username,
            password,
          },
        })
        .json<BaseResponse<SiakCookie>>(),
      {
        loading: "Logging In...",
        success: "Logged in",
        error: "Failed to log in, check your username and password",
      }
    );

    localStorage.setItem("auth", JSON.stringify(result.data));
    navigate("/");
  }

  return (
    <div className="max-w-md h-screen flex flex-col justify-center gap-4 p-4 mx-auto">
      <h1 className="text-xl font-bold">Login</h1>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold">Username</label>
        <input
          className="p-2 rounded-md border-primary-2 border-2"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold">Password</label>
        <input
          className="p-2 rounded-md border-primary-2 border-2"
          type="password"
          placeholder="**********"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={onLogin}
        className="font-semibold px-4 py-2 bg-primary-0 rounded-md"
      >
        Login
      </button>
    </div>
  );
}
