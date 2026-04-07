import { sendFormData, addError } from "./aux.js";

const form = document.getElementById("statusForm");

const passcode = document.getElementById("passcode");
const passcodeError = document.getElementById("passcodeError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errors = await sendFormData(e, "/status/update", "PUT", "/messages");

    if (errors) {
      for (let e of errors) {
        switch (e.path) {
          case "name":
            addError(passcode, passcodeError, e.msg);
            break;
        }
      }
    }
});
