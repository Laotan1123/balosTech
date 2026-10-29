"use client";

import { useState } from "react";

export default function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!authed) {
    return (
      <div className="card max-w-md space-y-3">
        <h2 className="text-lg font-semibold text-white">Admin login</h2>
        <label className="flex flex-col gap-2">
          <span className="label">Email</span>
          <input
            className="input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Password</span>
          <input
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" className="btn w-full" onClick={() => setAuthed(true)}>
          Mock login
        </button>
        <p className="text-xs text-gray-500">Replace with real auth + API calls.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {["Orders", "Bookings", "Swaps"].map((panel) => (
        <div key={panel} className="card">
          <h3 className="text-sm font-semibold text-white">{panel}</h3>
          <p className="text-sm text-gray-300">Connect to backend endpoint for {panel.toLowerCase()} overview.</p>
        </div>
      ))}
    </div>
  );
}
