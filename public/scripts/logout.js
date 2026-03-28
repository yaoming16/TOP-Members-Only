import { customFetch } from "./aux.js";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  customFetch("/logout", "POST", "/");
});
