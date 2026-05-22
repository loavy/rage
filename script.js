const fragments = {
  1: {
    title: "picnicpanic_save_01.txt",
    text: "He told his friends the park was fun. He laughed in the right places and took pictures of the sky so nobody would ask why his hands were shaking."
  },
  2: {
    title: "messagehero_autoreply.txt",
    text: "His best talent was typing 'I'm good' before feeling anything. The lie became a costume. After a while, the costume started answering for him."
  },
  3: {
    title: "cleanroom_hidden_object.txt",
    text: "Before anyone visited, he hid the laundry, the old cups, the unread messages, the version of himself that could not explain what life was supposed to mean."
  },
  4: {
    title: "devlog_draft_do_not_post.txt",
    text: "I keep writing cheerful updates because cheerful updates have edges. You can hold them. The truth has no handle, and I do not know where to put it."
  },
  5: {
    title: "storepage_rejected.txt",
    text: "The game was about reaching a final door. Every ending said the same thing: meaning was not hidden behind the door. It was in who you told before opening it."
  },
  6: {
    title: "guestbook_deleted.txt",
    text: "Someone wrote: 'You don't have to become a lesson to be worth staying for.' He refreshed the page until the words looked like they belonged to him."
  }
};

const found = new Set(JSON.parse(localStorage.getItem("sunnyFound") || "[]"));
const secretDialog = document.querySelector("#secretDialog");
const secretTitle = document.querySelector("#secretTitle");
const secretText = document.querySelector("#secretText");
const loginDialog = document.querySelector("#loginDialog");
const loginResponse = document.querySelector("#loginResponse");
const passwordInput = document.querySelector("#passwordInput");

function save() {
  localStorage.setItem("sunnyFound", JSON.stringify([...found]));
}

function signal() {
  document.body.classList.add("bad-signal");
  window.setTimeout(() => document.body.classList.remove("bad-signal"), 280);
}

function updateRecoveredState() {
  Object.keys(fragments).forEach((id) => {
    document.querySelectorAll(`[data-fragment="${id}"]`).forEach((node) => {
      node.classList.toggle("recovered", found.has(id));
    });
  });
}

function showFragment(id) {
  const fragment = fragments[id];
  if (!fragment) return;
  found.add(String(id));
  save();
  updateRecoveredState();
  secretTitle.textContent = fragment.title;
  secretText.textContent = fragment.text;
  signal();
  secretDialog.showModal();

  if (found.size >= 4) {
    document.querySelector("#normalLine").textContent = "Everything is normal here, except the part that keeps trying to be found.";
  }
}

document.querySelectorAll("[data-fragment]").forEach((node) => {
  node.tabIndex = -1;
  node.addEventListener("click", () => showFragment(node.dataset.fragment));
});

document.querySelectorAll("[data-open-page]").forEach((node) => {
  node.addEventListener("click", () => {
    const page = node.dataset.openPage;
    document.body.classList.add("page-open");
    document.querySelector(".notice h2").textContent = `${page[0].toUpperCase()}${page.slice(1)} page`;
    document.querySelector(".notice p").textContent = "This section is still being restored. Some files may appear in places they should not.";
    signal();
  });
});

document.querySelector("#archiveDust").addEventListener("click", () => {
  window.location.href = "protected/tomyfoureyes.php";
});

document.querySelector("#mascotButton").addEventListener("click", () => {
  const face = document.querySelector(".mascot-face");
  face.textContent = face.textContent === ":)" ? ":|" : ":)";
  signal();
});

document.querySelector("#lockedGame").addEventListener("dblclick", () => {
  loginDialog.showModal();
  passwordInput.focus();
});

document.querySelector("#loginButton").addEventListener("click", () => {
  loginDialog.showModal();
  passwordInput.focus();
});

document.querySelector("#sourceButton").addEventListener("click", () => {
  loginResponse.textContent = "The source is not code. It is the part he kept editing around.";
  loginDialog.showModal();
});

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim().toLowerCase();
  const complete = found.size >= 6;

  if (password === "truth" && complete) {
    loginResponse.textContent = "Upload accepted: the story does not solve him, but it stops being alone.";
    signal();
    return;
  }

  if (password === "truth") {
    loginResponse.textContent = "Password accepted, but the archive is incomplete. Recover every file first.";
    return;
  }

  loginResponse.textContent = "Incorrect. Hint: the thing he stopped performing.";
  loginDialog.classList.remove("wrong");
  window.requestAnimationFrame(() => loginDialog.classList.add("wrong"));
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "m") {
    showFragment(5);
  }
});

document.querySelector("#closeDialog").addEventListener("click", () => secretDialog.close());
document.querySelector("#closeLogin").addEventListener("click", () => loginDialog.close());

updateRecoveredState();
