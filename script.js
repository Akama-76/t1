//fuck you.
// fuck you.
const correctPasswordHash = "454b8d1911501c355b6cc674f65d5c92c0d3c75b92d08cd9923bb52e266a8134";

const tools = [
  "Ban All",
  "Unban All",
  "Ban Player",
  "Unban Player",
  "Lookup Player",
  "Give All Cosmetics",
  "Give Player Cosmetic",
  "Get All User Data"
];

async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function renderDashboard() {
  const mount = document.getElementById("successMount");

  const box = document.createElement("div");
  box.className = "box success";
  box.id = "successBox";
  box.style.display = "block";

  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.id = "backBtn";
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back to Home Page";
  backBtn.addEventListener("click", removeDashboard);

  const heading = document.createElement("h2");
  heading.textContent = "Toms Playfab Tools";

  const grid = document.createElement("div");
  grid.className = "tool-grid";
  tools.forEach(name => {
    const tile = document.createElement("div");
    tile.className = "tool-tile";
    tile.textContent = name;
    grid.appendChild(tile);
  });

  box.appendChild(backBtn);
  box.appendChild(heading);
  box.appendChild(grid);
  mount.appendChild(box);
}

function removeDashboard() {
  const mount = document.getElementById("successMount");
  mount.innerHTML = "";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("password").value = "";
  document.getElementById("errorMessage").textContent = "";
}

async function tryLogin() {
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  const enteredHash = await hashText(password);

  if (enteredHash === correctPasswordHash) {
    document.getElementById("loginBox").style.display = "none";
    errorMessage.textContent = "";
    renderDashboard();
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
