import { customFetch, sendFormData } from "./aux.js";

const messagesContainer = document.getElementById("messagesContainer");

messagesContainer.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;

  await customFetch(`/messages/${e.target.id}/delete`, "DELETE", "/messages");
});

const addMessageBtn = document.getElementById("addMessageBtn");
const addModal = document.getElementById("addModal");
const cancelBtn = document.getElementById("cancelBtn");
const addForm = document.getElementById("addForm");

addMessageBtn.addEventListener("click", () => {
  addModal.showModal();
});

cancelBtn.addEventListener("click", () => {
  addModal.close();
});

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendFormData(e, "/messages/add", "POST", "/messages");
});
