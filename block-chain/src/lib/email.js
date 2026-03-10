export async function sendSubmissionEmail(data) {
  try {
    console.log("Sending email with:", data);

    // Example API call (you can connect to backend later)
    await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  } catch (err) {
    console.error("Email sending failed:", err);
  }
}