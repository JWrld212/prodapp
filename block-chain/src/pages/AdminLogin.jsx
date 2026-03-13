import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();

    if (!code.trim()) {
      return toast.error("Enter owner code");
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log("API URL:", apiUrl);

      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      toast.success("Owner access enabled");
      nav("/owner/submission");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg p-6 text-text dark:bg-darkbg dark:text-darktext">
      <div className="mx-auto max-w-[520px] rounded-xl bg-card p-6 shadow-card dark:bg-darkcard">
        <h1 className="font-montserrat text-2xl font-bold text-primary dark:text-white">
          Owner Access
        </h1>

        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Enter owner code to view the submission page. Everyone else should see
          404.
        </p>

        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <input
            type="password"
            className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none dark:bg-darkbg dark:text-white"
            placeholder="Owner code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            disabled={loading}
            className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}