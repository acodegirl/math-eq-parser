export async function processMathExp(expression) {
  try {
    const response = await fetch("http://localhost:4000/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API error");
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
