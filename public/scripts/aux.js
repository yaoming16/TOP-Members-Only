export async function sendFormData(event, fetchUrl, method, redirectUrl) {
  const formData = new FormData(event.target);
  const body = new URLSearchParams(formData);

  const response = await customFetch(fetchUrl, method, redirectUrl, body);
  if (response.errors) {
    return response.errors;
  }
}

export async function customFetch(fetchUrl, method, redirectUrl, body = null) {
  try {
    const response = await fetch(fetchUrl, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    });

    if (response.ok) {
      window.location.href = redirectUrl;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}
