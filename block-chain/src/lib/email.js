export async function sendSubmissionEmail(data) {
  try {
    console.log("Sending email with:", data);

    const apiUrl = import.meta.env.DEV 
      ? import.meta.env.VITE_API_URL_DEV 
      : import.meta.env.VITE_API_URL_PROD;
    
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