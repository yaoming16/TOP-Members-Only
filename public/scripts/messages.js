import { customFetch, sendFormData, addError } from "./aux.js";

const messagesContainer = document.getElementById("messagesContainer");

messagesContainer.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;

  await customFetch(`/messages/${e.target.id}/delete`, "DELETE", "/messages");
});

const addMessageBtn = document.getElementById("addMessageBtn");
const addModal = document.getElementById("addModal");
const cancelBtn = document.getElementById("cancelBtn");
const addForm = document.getElementById("addForm");

const message = document.getElementById("message");
const title = document.getElementById("title");
const titleError = document.getElementById("titleError");
const messageError = document.getElementById("messageError");

if (addMessageBtn) {
  addMessageBtn.addEventListener("click", () => {
    addModal.showModal();
  });
}

if (addModal) {
  cancelBtn.addEventListener("click", () => {
    [message, title].forEach((e) => {
      e.value = "";
      e.classList.remove("errorInput");
    });

    titleError.textContent = "";
    messageError.textContent = "";

    addModal.close();
  });
}

if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    message.classList.remove("errorInput");
    title.classList.remove("errorInput");
    titleError.textContent = "";
    messageError.textContent = "";

    const errors = await sendFormData(e, "/messages/add", "POST", "/messages");

    if (errors) {
      for (let e of errors) {
        switch (e.path) {
          case "title":
            addError(title, titleError, e.msg);
            break;
          case "message":
            addError(message, messageError, e.msg);
            break;
        }
      }
    }
  });
}
