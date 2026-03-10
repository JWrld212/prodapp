import React, { useEffect, useState } from "react";
import { clearSubmissions, getSubmissions } from "../lib/storage";

export default function Admin() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(getSubmissions());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Submissions</h1>

          <button
            onClick={() => {
              clearSubmissions();
              setRows([]);
            }}
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border p-3">Time</th>
                <th className="border p-3">Wallet</th>
                <th className="border p-3">Network</th>
                <th className="border p-3">Action</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Note</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td className="border p-4 text-center" colSpan={6}>
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                rows.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-3">
                      {new Date(r.timestamp).toLocaleString()}
                    </td>
                    <td className="border p-3">{r.walletType}</td>
                    <td className="border p-3">{r.network}</td>
                    <td className="border p-3">{r.action}</td>
                    <td className="border p-3 font-mono">{r.walletAddress}</td>
                    <td className="border p-3">{r.note || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}