import { customFetch } from "./aux.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    customFetch("/logout", "POST", "/");
  });
}
