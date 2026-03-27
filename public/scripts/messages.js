import { fetch } from "./aux.js";

const messagesContainer = document.getElementById("messagesContainer")


messagesContainer.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;

  await fetch(`/messages/${e.target.id}/delete`);
})
