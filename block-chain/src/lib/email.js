export async function sendSubmissionEmail(data) {
  try {
    console.log("Sending email with:", data);

    // Use environment variable for API URL (set in .env)
    const apiUrl = import.meta.env.VITE_API_URL;
    
    await fetch(`${apiUrl}/api/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

  } catch (err) {
    console.error("Email sending failed:", err);
  }
}