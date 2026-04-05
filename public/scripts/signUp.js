import { sendFormData } from "./aux.js";

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await sendFormData(e, "/signup", "POST", "/");
});
