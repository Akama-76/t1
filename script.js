// SHA-256 hash of the password, NOT the password itself.
// Anyone reading this file only sees this scrambled string.
const correctPasswordHash = "00f3cd9dc93af578907d5c6951894ff08401f9aca946cac563de4dd850c5ec66";

async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function tryLogin() {
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  const enteredHash = await hashText(password);

  if (enteredHash === correctPasswordHash) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("successBox").style.display = "block";
  } else {
    errorMessage.textContent = "Incorrect password";
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  tryLogin();
});

document.getElementById("password").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    tryLogin();
  }
});

document.getElementById("backBtn").addEventListener("click", function () {
  document.getElementById("successBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("password").value = "";
  document.getElementById("errorMessage").textContent = "";
});
