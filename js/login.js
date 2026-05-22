(function () {
  const routes = {
    SUNNY: { href: "index.html", min: 0 },
    ROOM: { href: "protected/room.html", min: 3 },
    FINE: { href: "protected/messages.html", min: 2 },
    ORGANIC: { href: "protected/body-log.html", min: 5 },
    MOUTH: { href: "protected/mirror.html", min: 7 },
    VOID: { href: "void.html", min: 10, flag: "reachedVoid" },
    BOTTOM: { href: "protected/bottom.html", min: 12 },
    STILLHERE: { href: "protected/old-save.html", min: 8 },
    THELOCK: { href: "protected/room.html?lock=1", min: 10 },
    UNDERNEATH: { href: "underneath.html", min: 24, flag: "reachedUnderneath" }
  };

  const invalid = [
    "invalid password.",
    "try the word you use when you are lying.",
    "you typed wrong, but the feeling matched.",
    "access denied: not deep enough.",
    "the login form is tired of pretending this is security.",
    "you are not logging in. you are descending."
  ];

  const success = [
    "the room accepted you.",
    "access granted: the mask remembers.",
    "route unlocked.",
    "this door was always a sentence.",
    "you came back."
  ];

  function message(text) {
    const node = document.querySelector("[data-login-message]");
    if (node) node.textContent = window.RageFragments?.formatName(text) || text;
  }

  function canEnter(route) {
    const count = window.RageStore.countFragments();
    const flagOk = route.flag ? window.RageStore.isFlagged(window.RageStore.keys[route.flag]) : false;
    return count >= route.min || flagOk;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-login-form]");
    const forgot = document.querySelector("[data-forgot]");
    const guest = document.querySelector("[data-guest]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const code = String(new FormData(form).get("password") || "").trim().toUpperCase();
      const user = String(new FormData(form).get("username") || "").trim();
      if (user) window.RageStore.setName(user);
      window.RageFragments?.recover("f02");
      const route = routes[code];
      if (!route) {
        const attempts = window.RageStore.bump(window.RageStore.keys.attempts);
        const name = window.RageStore.getName();
        const personal = attempts > 4 && name ? `${name}, ${invalid[Math.min(attempts - 1, invalid.length - 1)]}` : invalid[Math.min(attempts - 1, invalid.length - 1)];
        message(personal);
        if (attempts === 3) window.RageFragments?.recover("f07");
        if (attempts > 5) window.RageUI?.speakFromSite("you are not logging in. you are descending.");
        return;
      }
      if (!canEnter(route)) {
        message("access denied: not deep enough. fragments make doors remember hinges.");
        window.RageStore.increaseCorruption(1);
        window.RageUI?.applyCorruption();
        return;
      }
      window.RageStore.unlockCode(code);
      message(success[Math.floor(Math.random() * success.length)]);
      window.setTimeout(() => { window.location.href = route.href; }, 700);
    });

    forgot?.addEventListener("click", (event) => {
      event.preventDefault();
      message("you did not forget the password. you forgot which version of yourself made it.");
    });

    guest?.addEventListener("click", () => {
      window.RageFragments?.recover("f28");
      message("guest mode cannot enter the room.");
    });
  });
})();
