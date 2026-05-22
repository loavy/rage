const fragmentData = window.SUNNY_FRAGMENTS || [];
const gameData = window.SUNNY_GAMES || {};
const fragmentMap = new Map(fragmentData.map((fragment) => [fragment.id, fragment]));
const storageKey = "sunnyRoom.fragments.v2";

const found = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
let mascotClicks = Number(localStorage.getItem("sunnyRoom.mascotClicks") || "0");
let idleTimer;

const body = document.body;
const secretDialog = document.querySelector("#secretDialog");
const secretTitle = document.querySelector("#secretTitle");
const secretText = document.querySelector("#secretText");
const secretTheme = document.querySelector("#secretTheme");
const gameDialog = document.querySelector("#gameDialog");
const gameCrumb = document.querySelector("#gameCrumb");
const gameTitle = document.querySelector("#gameTitle");
const gameScreen = document.querySelector("#gameScreen");
const gameResponse = document.querySelector("#gameResponse");
const loginDialog = document.querySelector("#loginDialog");
const loginResponse = document.querySelector("#loginResponse");
const passwordInput = document.querySelector("#passwordInput");
const fragmentCounter = document.querySelector("#fragmentCounter");
const fragmentMeter = document.querySelector("#fragmentMeter");
const mirrorHealth = document.querySelector("#mirrorHealth");
const secretPanel = document.querySelector("#secretPanel");
const assembledPoem = document.querySelector("#assembledPoem");
const finalRoom = document.querySelector("#finalRoom");
const mascotFace = document.querySelector("#mascotFace");
const idleWords = document.querySelector("#idleWords");

function save() {
  localStorage.setItem(storageKey, JSON.stringify([...found]));
}

function signal() {
  body.classList.add("bad-signal");
  window.setTimeout(() => body.classList.remove("bad-signal"), 280);
}

function corruptionLevel() {
  if (found.size >= 18) return 4;
  if (found.size >= 12) return 3;
  if (found.size >= 7) return 2;
  if (found.size >= 3) return 1;
  return 0;
}

function updateMascot() {
  const faces = [":)", ":|", ":/", ":.", " "];
  const index = Math.min(Math.floor(mascotClicks / 2), faces.length - 1);
  mascotFace.textContent = faces[index];
  document.querySelector("#mascotButton").dataset.mood = String(index);
}

function updateRecoveredState() {
  const count = found.size;
  const totalForCounter = 12;
  const level = corruptionLevel();

  body.dataset.corruption = String(level);
  fragmentCounter.textContent = `${Math.min(count, totalForCounter)}/${totalForCounter}`;
  fragmentMeter.textContent = `${count} recovered`;
  mirrorHealth.textContent = ["stable", "odd", "drifting", "corrupted", "listening"][level];

  fragmentData.forEach((fragment) => {
    document.querySelectorAll(`[data-fragment="${fragment.id}"], [data-fragment-trigger="${fragment.id}"]`).forEach((node) => {
      node.classList.toggle("recovered", found.has(fragment.id));
    });
  });

  document.querySelector("#meaningButton").textContent = found.size >= 8 ? "Run" : "Wishlist";
  document.querySelector("[data-game-card='meaning']").classList.toggle("unlocked", found.size >= 8);
  buildPoem();

  if (found.size >= 8) {
    secretPanel.hidden = false;
    document.querySelector("#memoryTab").setAttribute("aria-expanded", "true");
  }

  finalRoom.hidden = found.size < 12;
  updateMascot();
}

function discover(id, options = {}) {
  const fragment = fragmentMap.get(id);
  if (!fragment) return false;

  const isNew = !found.has(id);
  found.add(id);
  save();
  updateRecoveredState();

  if (isNew) {
    signal();
    console.info(`[sunny-room] recovered ${fragment.id}: ${fragment.theme}`);
  }

  if (options.open !== false) {
    secretTheme.textContent = `${fragment.theme} / ${fragment.location}`;
    secretTitle.textContent = fragment.title;
    secretText.textContent = fragment.reveal;
    secretDialog.showModal();
  }

  return isNew;
}

function buildPoem() {
  const lines = fragmentData
    .filter((fragment) => found.has(fragment.id))
    .sort((a, b) => a.order - b.order)
    .map((fragment) => `<p><span>${String(fragment.order).padStart(2, "0")}</span>${fragment.line}</p>`);

  assembledPoem.innerHTML = lines.length
    ? lines.join("")
    : "<p><span>00</span>the room is still pretending to be empty</p>";
}

function openGame(gameId) {
  const game = gameData[gameId];
  if (!game) return;

  if (gameId === "meaning" && found.size < 8) {
    gameCrumb.textContent = "meaningmachine_locked.exe";
    gameTitle.textContent = "The Meaning Machine";
    gameScreen.innerHTML = [
      "ACCESS DENIED",
      "required: 8 recovered files",
      "current: " + found.size,
      "",
      "the machine refuses to answer a question asked alone"
    ].map((line) => `<code>${line || "&nbsp;"}</code>`).join("");
    gameResponse.textContent = "The door shakes, but it does not open yet.";
    gameDialog.showModal();
    discover("question", { open: false });
    return;
  }

  gameCrumb.textContent = game.crumb;
  gameTitle.textContent = game.title;
  gameScreen.innerHTML = game.screen.map((line) => `<code>${line || "&nbsp;"}</code>`).join("");
  gameResponse.textContent = game.response;
  gameDialog.showModal();
  discover(game.fragment, { open: false });
}

function showSecretPanel() {
  secretPanel.hidden = false;
  document.querySelector("#memoryTab").setAttribute("aria-expanded", "true");
}

function hideSecretPanel() {
  secretPanel.hidden = true;
  document.querySelector("#memoryTab").setAttribute("aria-expanded", "false");
}

function resetIdleTimer() {
  window.clearTimeout(idleTimer);
  idleWords.textContent = "";
  idleTimer = window.setTimeout(() => {
    idleWords.textContent = "the room speaks when the mouse stops";
    discover("idle", { open: false });
  }, 28000);
}

document.querySelectorAll("[data-fragment]").forEach((node) => {
  node.addEventListener("click", () => discover(node.dataset.fragment));
});

document.querySelectorAll("[data-fragment-trigger]").forEach((node) => {
  node.addEventListener("click", () => discover(node.dataset.fragmentTrigger, { open: false }));
});

document.querySelectorAll("[data-jump]").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelector(`#${node.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", () => openGame(button.dataset.game));
});

document.querySelectorAll("[data-store]").forEach((button) => {
  button.addEventListener("click", () => {
    gameCrumb.textContent = "store_redirect_failed";
    gameTitle.textContent = `${button.textContent} mirror`;
    gameScreen.innerHTML = [
      "404: store page not found",
      "reason: the game was never brave enough to publish",
      "",
      "try again after the developer becomes a person"
    ].map((line) => `<code>${line || "&nbsp;"}</code>`).join("");
    gameResponse.textContent = "The link apologizes without moving.";
    gameDialog.showModal();
  });
});

document.querySelector("#mascotButton").addEventListener("click", () => {
  mascotClicks += 1;
  localStorage.setItem("sunnyRoom.mascotClicks", String(mascotClicks));
  updateMascot();
  if (mascotClicks >= 3) discover("mascot", { open: mascotClicks === 3 });
});

document.querySelector("#sourceButton").addEventListener("click", () => {
  discover("source", { open: false });
  loginResponse.textContent = "The source is not code. It is the room he keeps editing around.";
  loginDialog.showModal();
});

document.querySelector("#archiveDust").addEventListener("click", () => {
  discover("archive", { open: false });
  window.location.href = "protected/tomyfoureyes.php";
});

document.querySelector("#bugForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.querySelector("#bugText").value.trim();
  discover("bug-report", { open: Boolean(text) });
  document.querySelector("#bugText").value = "";
});

document.querySelector("#memoryTab").addEventListener("click", () => {
  if (secretPanel.hidden) showSecretPanel();
  else hideSecretPanel();
});

document.querySelector("#resetMemory").addEventListener("click", () => {
  found.clear();
  save();
  localStorage.removeItem("sunnyRoom.mascotClicks");
  mascotClicks = 0;
  hideSecretPanel();
  updateRecoveredState();
  signal();
});

document.querySelector("#loginButton").addEventListener("click", () => {
  loginDialog.showModal();
  passwordInput.focus();
});

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim().toLowerCase();

  if (password === "truth" && found.size >= 12) {
    showSecretPanel();
    loginResponse.textContent = "Upload accepted. The room does not become easy, but it becomes shareable.";
    return;
  }

  if (password === "truth") {
    loginResponse.textContent = "Password accepted. Archive incomplete. The room is still missing pieces.";
    return;
  }

  loginResponse.textContent = "Incorrect. Hint: the opposite of pretending.";
  loginDialog.classList.remove("wrong");
  window.requestAnimationFrame(() => loginDialog.classList.add("wrong"));
});

document.querySelector("#closeDialog").addEventListener("click", () => secretDialog.close());
document.querySelector("#closeGame").addEventListener("click", () => gameDialog.close());
document.querySelector("#closeLogin").addEventListener("click", () => loginDialog.close());
document.querySelector("#closePanel").addEventListener("click", hideSecretPanel);

const konami = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
let keyBuffer = [];

document.addEventListener("keydown", (event) => {
  keyBuffer.push(event.key.toLowerCase());
  keyBuffer = keyBuffer.slice(-konami.length);
  if (keyBuffer.join(",") === konami.join(",")) {
    discover("konami");
    showSecretPanel();
  }
});

["mousemove", "keydown", "pointerdown", "scroll"].forEach((eventName) => {
  document.addEventListener(eventName, resetIdleTimer, { passive: true });
});

console.log("%cSunny Room Games", "color:#3555c7;font-weight:bold");
console.log("everything is normal here");
console.log("the room saves what the mouth deletes");
console.log("try not to inspect the smile too long");

updateRecoveredState();
resetIdleTimer();
