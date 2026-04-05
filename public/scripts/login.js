import { sendFormData } from "./aux.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.classList.remove("errorInput");
  passwordInput.classList.remove("errorInput");

  const errors = await sendFormData(e, "/login", "POST", "/");
  if (errors) {
    for (let e of errors) {
      if (e.path === "email" || e.msg === "Invalid email") {
        emailError.textContent = e.msg;
        emailInput.classList.add("errorInput");
      }
      if (e.path === "password" || e.msg === "Invalid password") {
        passwordError.textContent = e.msg;
        passwordInput.classList.add("errorInput");
      }
    }
  }
});
