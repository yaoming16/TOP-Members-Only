import {sendFormData} from "./aux.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendFormData(e, "/login", "POST", "/");
});
