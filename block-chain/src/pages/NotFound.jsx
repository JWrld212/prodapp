import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg p-6 text-text dark:bg-darkbg dark:text-darktext">
      <div className="mx-auto max-w-[720px] rounded-xl bg-card p-10 text-center shadow-card dark:bg-darkcard">
        <h1 className="font-montserrat text-4xl font-bold text-primary dark:text-white">
          404
        </h1>
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">
          Page not found.
        </p>
      </div>
    </div>
  );
}
