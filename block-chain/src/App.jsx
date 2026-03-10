import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import SubmissionTable from "./pages/SubmissionTable.jsx";
import NotFound from "./pages/NotFound.jsx";

function AdminOnly({ children }) {
  const [allowed, setAllowed] = useState(null); // null=loading

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) return setAllowed(false);

        const data = await res.json();
        setAllowed(!!data.isAdmin);
      } catch {
        setAllowed(false);
      }
    }

    check();
  }, []);

  if (allowed === null) return null; // or a spinner
  if (!allowed) return <NotFound />;

  return children;
}

export default function App() {
  return (
    <>
      <Routes>
       
        <Route path="/" element={<Home />} />

        {/* Admin unlock page */}
        <Route path="/owner" element={<AdminLogin />} />

        {/* Admin-only submissions */}
        <Route
          path="/owner/submission"
          element={
            <AdminOnly>
              <SubmissionTable />
            </AdminOnly>
          }
        />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="bottom-center" autoClose={2500} />
    </>
  );
}