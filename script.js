// fuck you😘.
// Anyone reading your gay fag
const correctPasswordHash = "454b8d1911501c355b6cc674f65d5c92c0d3c75b92d08cd9923bb52e266a8134";

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
