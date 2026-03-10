const KEY = "latest_submission";

export function saveLatestSubmission(payload) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ payload, ts: Date.now() }));
  } catch (e) {
    console.error("saveLatestSubmission failed:", e);
  }
}

export function getLatestSubmission() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("getLatestSubmission failed:", e);
    return null;
  }
}

export function clearLatestSubmission() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error("clearLatestSubmission failed:", e);
  }
}