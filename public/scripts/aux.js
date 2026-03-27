export async function sendFormData(event, fetchUrl, method, redirectUrl) {
  const formData = new FormData(event.target);
  const body = new URLSearchParams(formData);

  await fetch(fetchUrl, method, redirectUrl, body)
}

export async function fetch(fetchUrl, method, redirectUrl, body = null) {
    try {
    const response = await fetch(fetchUrl, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body
    });

    if (response.ok) {
      window.location.href = redirectUrl;
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
