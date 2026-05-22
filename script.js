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
const subtitleShift = document.querySelector("#subtitleShift");
const voidPanel = document.querySelector("#voidPanel");
const voidDescent = document.querySelector("#voidDescent");

const pageTitles = [
  "Sunny Room Games",
  "Sunny Room Games :)",
  "Sunny Room Games is fine",
  "Sunny Room Games is still loading",
  "Sunny Room Games could not return",
  "the room underneath"
];

function save() {
  localStorage.setItem(storageKey, JSON.stringify([...found]));
}

function signal() {
  body.classList.add("bad-signal");
  window.setTimeout(() => body.classList.remove("bad-signal"), 280);
}

function corruptionLevel() {
  const maxFragmentLevel = fragmentData
    .filter((fragment) => found.has(fragment.id))
    .reduce((level, fragment) => Math.max(level, fragment.corruptionLevel || 0), 0);

  if (found.size >= 22) return 5;
  if (found.size >= 17) return Math.max(4, maxFragmentLevel);
  if (found.size >= 12) return Math.max(3, maxFragmentLevel);
  if (found.size >= 7) return Math.max(2, maxFragmentLevel);
  if (found.size >= 3) return Math.max(1, maxFragmentLevel);
  return 0;
}

function updateMascot() {
  const faces = [":)", ":|", ":/", ":.", "◌", ""];
  const index = Math.min(Math.max(corruptionLevel(), Math.floor(mascotClicks / 2)), faces.length - 1);
  mascotFace.textContent = faces[index];
  const mascot = document.querySelector("#mascotButton");
  mascot.dataset.mood = String(index);
  mascot.title = ["happy", "tired", "forced smile", "hollow", "watching", "the smile was not the boy. it was the lock."][index];
}

function updateRecoveredState() {
  const count = found.size;
  const totalForCounter = 18;
  const level = corruptionLevel();

  body.dataset.corruption = String(level);
  body.dataset.state = (window.SUNNY_STATES || [])[level] || "normal";
  document.title = pageTitles[level] || pageTitles[0];
  fragmentCounter.textContent = `${Math.min(count, totalForCounter)}/${totalForCounter}`;
  fragmentMeter.textContent = `${count} recovered`;
  mirrorHealth.textContent = ["stable", "uneasy", "wrong", "hollow", "void", "underneath"][level];
  subtitleShift.textContent = [
    "everything is normal here",
    "the page is still smiling",
    "the buttons remember previous clicks",
    "the room is listening through the bright parts",
    "there is no bottom element",
    "the smile was not the boy. it was the lock."
  ][level];
  if (level >= 4) console.warn("survival is not the same as being okay.");
  if (level >= 5) console.warn("the room underneath is active.");

  fragmentData.forEach((fragment) => {
    document.querySelectorAll(`[data-fragment="${fragment.id}"], [data-fragment-trigger="${fragment.id}"]`).forEach((node) => {
      node.classList.toggle("recovered", found.has(fragment.id));
    });
  });

  document.querySelector("#meaningButton").textContent = found.size >= 8 ? "Run" : "Wishlist";
  document.querySelector("[data-game-card='meaning']").classList.toggle("unlocked", found.size >= 8);
  document.querySelector("[data-game-card='bottomless']").classList.toggle("visible", found.size >= 12);
  document.querySelectorAll(".play-button").forEach((button) => {
    if (button.dataset.game === "meaning" && found.size < 8) return;
    const game = gameData[button.dataset.game];
    if (game?.buttonAfter && found.has(game.fragment)) button.textContent = game.buttonAfter;
    else if (button.dataset.game === "bottomless") button.textContent = "Start";
    else if (button.dataset.game !== "meaning") button.textContent = level >= 3 ? "Continue" : "Play";
  });
  buildPoem();

  if (found.size >= 8) {
    secretPanel.hidden = false;
    document.querySelector("#memoryTab").setAttribute("aria-expanded", "true");
  }

  finalRoom.hidden = found.size < 18;
  document.querySelector("#openVoid").hidden = found.size < 18;
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
    console.info(`[sunny-room] fragment recovered: ${fragment.reveal}`);
    if (fragment.corruptionLevel >= 4) console.warn("there is no bottom element.");
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
      "the machine refuses to answer a question asked alone",
      "button label changed: Wishlist -> Not yet"
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
  discover("loading", { open: false });
  discover(game.fragment, { open: false });
  if (game.extraFragment) discover(game.extraFragment, { open: false });
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
  if (mascotClicks >= 8) {
    gameCrumb.textContent = "sunny_face_rig.txt";
    gameTitle.textContent = "Mascot";
    gameScreen.innerHTML = [
      "please stop making me perform.",
      "",
      "smile rig: locked",
      "boy: not found",
      "mask layer: active"
    ].map((line) => `<code>${line || "&nbsp;"}</code>`).join("");
    gameResponse.textContent = "It keeps smiling after the room goes quiet.";
    gameDialog.showModal();
  }
});

document.querySelector("#mascotButton").addEventListener("mouseenter", () => {
  if (corruptionLevel() >= 3) subtitleShift.textContent = "the site is watching you notice it";
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
  const confirmed = window.confirm("Are you sure? The room forgets slower than you do.");
  if (!confirmed) return;
  found.clear();
  save();
  localStorage.removeItem("sunnyRoom.mascotClicks");
  mascotClicks = 0;
  hideSecretPanel();
  updateRecoveredState();
  signal();
});

document.querySelector("#openVoid").addEventListener("click", () => {
  voidPanel.hidden = false;
  discover("void", { open: false });
  window.setTimeout(() => {
    voidDescent.insertAdjacentHTML("beforeend", "<p>i thought scrolling would count as leaving</p>");
  }, 1600);
  window.setTimeout(() => {
    voidDescent.insertAdjacentHTML("beforeend", "<p>the page kept making more down</p>");
  }, 3600);
});

document.querySelector("#closeVoid").addEventListener("click", () => {
  voidPanel.hidden = true;
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

console.log("%csunny room games loaded successfully.", "color:#3555c7;font-weight:bold");
console.log("mask layer active.");
console.log("user is looking too closely.");
console.log("do not inspect the room unless you are ready to be seen.");
console.log("survival is not the same as being okay.");

updateRecoveredState();
resetIdleTimer();
