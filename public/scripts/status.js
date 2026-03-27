import { sendFormData } from "./aux.js";

const form = document.getElementById("statusForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendFormData(e, "/status/update", "PUT", "/messages");
});
