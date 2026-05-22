(function () {
  const titles = [
    "Sunny Room Games",
    "Sunny Room Games - everything is normal here",
    "Sunny Room Games - wrong password, correct feeling",
    "RAGE - the body is still online",
    "RAGE - the room saves what the mouth deletes",
    "RAGE - there is no bottom element",
    "THE ROOM UNDERNEATH"
  ];

  const mascotStates = ["happy", "strained", "strained", "tired", "sore", "hollow", "absent"];
  const mascotLines = [
    "please stop making me perform.",
    "the smile is not the boy.",
    "the mascot is where the pain learned customer service.",
    "I was drawn before the boy learned how to ask.",
    "the smile was the lock. the boy was underneath."
  ];

  const noticedLines = [
    "the page waited until you stopped skimming.",
    "{name}, do you also answer too fast?",
    "the cursor is not a hand. it is a witness.",
    "some buttons are doors that learned to look harmless.",
    "the room does not know you. it recognizes looking."
  ];

  function applyCorruption() {
    const level = window.RageStore ? window.RageStore.getCorruption() : 0;
    document.body.classList.remove(...Array.from({ length: 7 }, (_, i) => `corruption-${i}`));
    document.body.classList.add(`corruption-${level}`);
    document.title = titles[level] || titles[0];
    document.querySelectorAll("[data-corrupt-label]").forEach((node) => {
      const labels = (node.dataset.corruptLabel || "").split("|");
      node.textContent = labels[Math.min(level, labels.length - 1)] || node.textContent;
    });
    const mascot = document.querySelector("[data-mascot]");
    if (mascot) mascot.dataset.state = mascotStates[Math.min(level, mascotStates.length - 1)];
  }

  function personalize(text) {
    return window.RageFragments?.formatName(text) || text;
  }

  function speakFromSite(text, id) {
    const node = document.querySelector("[data-site-whisper]");
    if (!node) return;
    node.textContent = personalize(text);
    node.classList.remove("is-visible");
    window.setTimeout(() => node.classList.add("is-visible"), 30);
    if (id) window.RageFragments?.recover(id);
  }

  function setupName() {
    const form = document.querySelector("[data-name-form]");
    const input = document.querySelector("[data-name-input]");
    if (!form || !input || !window.RageStore) return;
    const existing = window.RageStore.getName();
    if (existing) input.value = existing;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      window.RageStore.setName(input.value);
      window.RageFragments?.recover("f27", `${window.RageStore.getName() || "visitor"}, you found a door that was pretending to be a button.`);
    });
  }

  function setupFragments() {
    document.querySelectorAll("[data-fragment-id]").forEach((node) => {
      node.addEventListener("click", () => {
        window.RageFragments?.recover(node.dataset.fragmentId);
      });
    });
    window.RageFragments?.updateCounters();
  }

  function setupFragmentDrawer() {
    const list = document.querySelector("[data-fragment-list]");
    const toggle = document.querySelector("[data-fragment-toggle]");
    if (!list || !toggle || !window.RageFragments) return;
    function render() {
      const found = window.RageStore.getFragments();
      list.innerHTML = window.RageFragments.all.map((fragment) => {
        const discovered = found.includes(fragment.id);
        const text = discovered ? fragment.revealedText : fragment.visibleDecoy;
        return `<li class="${discovered ? "found" : "missing"}"><strong>${fragment.id}</strong> ${window.RageFragments.formatName(text)}</li>`;
      }).join("");
    }
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      list.hidden = expanded;
      render();
    });
    render();
  }

  function setupScrollNotice() {
    const whisper = document.querySelector("[data-site-whisper]");
    if (!whisper) return;
    let index = 0;
    let lastLevel = -1;
    const onScroll = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
      const level = Math.floor(progress * 5);
      if (level > lastLevel) {
        lastLevel = level;
        speakFromSite(noticedLines[Math.min(index, noticedLines.length - 1)]);
        index += 1;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.setTimeout(() => speakFromSite("welcome back to the cheerful part."), 1400);
  }

  function setupDelayedText() {
    document.querySelectorAll("[data-delay-text]").forEach((node) => {
      const delay = Number(node.dataset.delayText) || 1800;
      const text = node.textContent;
      node.textContent = "";
      window.setTimeout(() => {
        node.textContent = personalize(text);
        node.classList.add("is-visible");
      }, delay);
    });
  }

  function setupMascot() {
    const mascot = document.querySelector("[data-mascot]");
    if (!mascot) return;
    let clicks = 0;
    mascot.addEventListener("click", () => {
      const line = mascotLines[Math.min(clicks, mascotLines.length - 1)];
      clicks += 1;
      mascot.querySelector("[data-mascot-line]").textContent = line;
      if (clicks === 2) window.RageFragments?.recover("f03");
      if (clicks >= 5) window.RageStore?.setCorruption(5);
      applyCorruption();
    });
  }

  function setupReset() {
    document.querySelectorAll("[data-reset-progress]").forEach((button) => {
      button.addEventListener("click", () => {
        window.RageStore?.reset();
        window.RageFragments?.recover("f11");
        location.reload();
      });
    });
  }

  function setupConsole() {
    console.info("sunny room games loaded successfully.");
    console.info("mask layer active.");
    if ((window.RageStore?.countFragments() || 0) > 5) console.info("user is looking too closely.");
    if ((window.RageStore?.getCorruption() || 0) >= 4) console.info("do not inspect the room unless you are ready to be seen.");
    console.info("survival is not the same as being okay.");
    if ((window.RageStore?.countFragments() || 0) > 14) console.info("fragment recovered: he was not joking.");
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.RageStore?.bump(window.RageStore.keys.returns);
    applyCorruption();
    setupName();
    setupFragments();
    setupFragmentDrawer();
    setupMascot();
    setupReset();
    setupScrollNotice();
    setupDelayedText();
    setupConsole();
  });

  window.RageUI = { applyCorruption, speakFromSite };
})();
