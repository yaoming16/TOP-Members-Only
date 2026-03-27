import {sendFormData} from "./aux.js";

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await sendFormData(e, "/signup", "POST", "/")

  const formData = new FormData(e.target);
  const body = new URLSearchParams(formData);

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
