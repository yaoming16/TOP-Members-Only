import { sendFormData, addError, clearError } from "./aux.js";

const form = document.getElementById("statusForm");

const passcode = document.getElementById("passcode");
const passcodeError = document.getElementById("passcodeError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(passcode, passcodeError);

  const errors = await sendFormData(e, "/status/update", "PUT", "/messages");

  if (errors) {
    for (const e of errors) {
      switch (e.path) {
        case "passcode":
          addError(passcode, passcodeError, e.msg);
          break;
      }
    }
  }
});
