(function () {
  function openModal(title, body) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h2 id="modal-title">${title}</h2>
          <button type="button" data-close>close</button>
        </div>
        <div>${body}</div>
      </section>`;
    document.body.appendChild(backdrop);
    backdrop.querySelector("[data-close]").addEventListener("click", () => backdrop.remove());
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) backdrop.remove();
    });
    backdrop.querySelector("button").focus();
    return backdrop;
  }

  function picnic() {
    const items = ["sandwich", "juice", "blanket", "sun", "photo", "sorry"];
    const memories = [
      "the sandwich is cut into the shape of an ordinary day.",
      "the juice is warm. nobody says why.",
      "the blanket has grass on it from a day I cannot reach.",
      "the sun is too bright to accuse.",
      "the photo loads everyone except the boy.",
      "every item eventually becomes sorry."
    ];
    const modal = openModal("Picnic Panic", `<p>Collect enough pieces to build a normal day.</p><div class="reply-row">${items.map((item, i) => `<button data-item="${i}">${item}</button>`).join("")}</div><p data-game-log class="small"></p><meter min="0" max="6" value="0" data-basket style="width:100%"></meter>`);
    let count = 0;
    modal.querySelectorAll("[data-item]").forEach((button) => {
      button.addEventListener("click", () => {
        count += 1;
        button.textContent = "sorry";
        modal.querySelector("[data-basket]").value = count;
        modal.querySelector("[data-game-log]").textContent = memories[Math.min(count - 1, memories.length - 1)];
        if (count >= 4) window.RageFragments?.recover("f13");
        if (count >= 6) window.RageUI?.speakFromSite("the picnic was never outside.");
      });
    });
  }

  function messageHero() {
    const modal = openModal("Message Hero", `<p>Type a reply before anyone hears the delay.</p><label for="hero-reply">reply</label><textarea id="hero-reply" rows="5" style="width:100%"></textarea><p data-game-log class="small">some keys already know what to say.</p><p class="typing" data-typing></p>`);
    const box = modal.querySelector("textarea");
    const typing = modal.querySelector("[data-typing]");
    let timer = window.setTimeout(() => {
      modal.querySelector("[data-game-log]").textContent = "silence is the first honest input.";
      window.RageFragments?.recover("f14");
    }, 4200);
    box.addEventListener("input", () => {
      clearTimeout(timer);
      typing.textContent = "you are typing... the mask is typing faster.";
      if (box.value.length > 10 && !window.RageStore?.isFlagged(window.RageStore.keys.saidFine)) {
        box.value = "im fine";
        window.RageStore?.flag(window.RageStore.keys.saidFine);
        window.RageFragments?.recover("f08");
        modal.querySelector("[data-game-log]").textContent = "the reply sent itself before the truth could stand up.";
      }
    });
  }

  function cleanRoom() {
    const modal = openModal("Clean Room Rush", `<p>Clean before the door opens.</p><p>mess counter: <strong data-mess>3</strong></p><div class="reply-row"><button>shirt</button><button>cup</button><button>note</button><button>chair</button><button>mirror</button></div><p data-game-log class="small">some games are just rooms with rules.</p>`);
    let mess = 3;
    modal.querySelectorAll(".reply-row button").forEach((button) => {
      button.addEventListener("click", () => {
        mess += 1;
        button.textContent = button.textContent === "mirror" ? "not you" : "under bed";
        modal.querySelector("[data-mess]").textContent = mess;
        modal.querySelector("[data-game-log]").textContent = "the cleaner it looks, the more the floor remembers.";
        if (mess >= 6) window.RageFragments?.recover("f15");
        if (mess >= 8) modal.querySelector("[data-game-log]").textContent = "you did not clean the room. you taught it where to hide.";
      });
    });
  }

  function bodyNormalizer() {
    const labels = ["pulse", "breath", "voice", "face", "sleep", "hunger"];
    const controls = labels.map((label) => `<label>${label}<input type="range" min="0" max="100" value="50" data-label="${label}"> <output>normal</output></label>`).join("<br>");
    const modal = openModal("Body Normalizer", `<p>Make every reading acceptable.</p>${controls}<p data-game-log class="small">presence: missing</p>`);
    modal.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        input.nextElementSibling.textContent = "normal";
        input.value = 50;
        modal.querySelector("[data-game-log]").textContent = "normal is a costume the body learned.";
        window.RageFragments?.recover("f16");
      });
    });
  }

  function bottomlessRunner() {
    const modal = openModal("Bottomless Runner", `<p>There is no score.</p><p>seconds not gone: <strong data-seconds>0</strong></p><button data-fall>keep falling</button><p data-game-log class="small">if you win, nobody asks why you were playing.</p><p><a href="void.html">open the long version</a></p>`);
    let seconds = 0;
    const tick = window.setInterval(() => {
      if (!document.body.contains(modal)) return window.clearInterval(tick);
      seconds += 1;
      modal.querySelector("[data-seconds]").textContent = seconds;
      if (seconds === 6) {
        window.RageFragments?.recover("f17");
        window.RageStore?.flag(window.RageStore.keys.reachedVoid);
      }
      if (seconds === 10) modal.querySelector("[data-game-log]").textContent = "survival is not the same as a score, but the counter keeps asking.";
    }, 1000);
  }

  function meaningMachine() {
    const count = window.RageStore?.countFragments() || 0;
    if (count < 8) {
      openModal("The Meaning Machine", "<p>LOCKED: insufficient fragments. the machine refuses easy math.</p>");
      return;
    }
    const modal = openModal("The Meaning Machine", `<div class="terminal-lines"><p>INPUT: why stay?</p><p data-machine>calculating...</p></div><button data-ask>ask again</button>`);
    let asks = 0;
    const answers = [
      "answer unstable. grief is not a number.",
      "error: the question assumes pain is a court case.",
      "no clean answer found. searching for interruption instead.",
      "the machine cannot calculate a reason to stay.\nbut a voice can interrupt the fall."
    ];
    modal.querySelector("[data-ask]").addEventListener("click", () => {
      asks += 1;
      const line = answers[Math.min(asks - 1, answers.length - 1)];
      modal.querySelector("[data-machine]").textContent = line;
      if (asks >= 4) window.RageFragments?.recover("f26");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const games = { picnic, messageHero, cleanRoom, bodyNormalizer, bottomlessRunner, meaningMachine };
    document.querySelectorAll("[data-game]").forEach((button) => {
      button.addEventListener("click", () => games[button.dataset.game]?.());
    });
  });
})();
