(function () {
  const fragments = [
    { id: "f01", act: 1, sourcePage: "index", visibleDecoy: "PLAY", revealedText: "I learned to press continue before I learned why.", unlockCodeHint: "SUNNY", corruptionIncrease: 1, theme: "mask" },
    { id: "f02", act: 2, sourcePage: "login", visibleDecoy: "LOGIN", revealedText: "the password was not a word. it was how well I lied.", unlockCodeHint: "FINE", corruptionIncrease: 1, theme: "lying" },
    { id: "f03", act: 2, sourcePage: "index", visibleDecoy: "HIGH SCORE", revealedText: "my best performance was being easy to not worry about.", unlockCodeHint: "FINE", corruptionIncrease: 1, theme: "performance" },
    { id: "f04", act: 3, sourcePage: "body-log", visibleDecoy: "HEALTH", revealedText: "the body reported normal. the boy did not.", unlockCodeHint: "ORGANIC", corruptionIncrease: 1, theme: "body" },
    { id: "f05", act: 4, sourcePage: "room", visibleDecoy: "ROOM", revealedText: "the room was the first witness and the last to forgive me.", unlockCodeHint: "ROOM", corruptionIncrease: 1, theme: "witness" },
    { id: "f06", act: 3, sourcePage: "body-log", visibleDecoy: "ORGANIC", revealedText: "I came back as a body before I came back as a person.", unlockCodeHint: "ORGANIC", corruptionIncrease: 1, theme: "survival" },
    { id: "f07", act: 5, sourcePage: "void", visibleDecoy: "ERROR", revealedText: "something survived. I am still asking if it was me.", unlockCodeHint: "STILLHERE", corruptionIncrease: 1, theme: "return" },
    { id: "f08", act: 2, sourcePage: "messages", visibleDecoy: "FRIEND", revealedText: "they loved the version that replied before thinking.", unlockCodeHint: "FINE", corruptionIncrease: 1, theme: "messages" },
    { id: "f09", act: 5, sourcePage: "void", visibleDecoy: "VOID", revealedText: "falling is quiet when nothing expects you to land.", unlockCodeHint: "VOID", corruptionIncrease: 1, theme: "falling" },
    { id: "f10", act: 5, sourcePage: "bottom", visibleDecoy: "BOTTOM", revealedText: "I thought the bottom would explain the fall.", unlockCodeHint: "BOTTOM", corruptionIncrease: 1, theme: "bottom" },
    { id: "f11", act: 4, sourcePage: "old-save", visibleDecoy: "RESET", revealedText: "the room forgets slower than I do.", unlockCodeHint: "ROOM", corruptionIncrease: 1, theme: "memory" },
    { id: "f12", act: 2, sourcePage: "messages", visibleDecoy: "SUPPORT", revealedText: "customer support cannot help with a haunted body.", unlockCodeHint: "THELOCK", corruptionIncrease: 1, theme: "support" },
    { id: "f13", act: 1, sourcePage: "index", visibleDecoy: "PICNIC", revealedText: "I gathered bread, juice, sun, napkins, and still could not assemble a day.", unlockCodeHint: "SUNNY", corruptionIncrease: 0, theme: "ordinary" },
    { id: "f14", act: 2, sourcePage: "index", visibleDecoy: "MESSAGE HERO", revealedText: "the fastest reply is sometimes the farthest one from the truth.", unlockCodeHint: "FINE", corruptionIncrease: 1, theme: "reply" },
    { id: "f15", act: 2, sourcePage: "index", visibleDecoy: "CLEAN", revealedText: "I hid the mess so nobody would ask what made it.", unlockCodeHint: "ROOM", corruptionIncrease: 1, theme: "hiding" },
    { id: "f16", act: 3, sourcePage: "index", visibleDecoy: "NORMAL", revealedText: "normal is a costume the body learned without asking me.", unlockCodeHint: "ORGANIC", corruptionIncrease: 1, theme: "normal" },
    { id: "f17", act: 5, sourcePage: "index", visibleDecoy: "RUN", revealedText: "the game had no score because surviving was already too much arithmetic.", unlockCodeHint: "MOUTH", corruptionIncrease: 1, theme: "runner" },
    { id: "f18", act: 4, sourcePage: "room", visibleDecoy: "BED", revealedText: "the bed kept my outline like a question nobody wanted to read.", unlockCodeHint: "ROOM", corruptionIncrease: 0, theme: "room" },
    { id: "f19", act: 4, sourcePage: "room", visibleDecoy: "DESK", revealedText: "the desk held drafts of sentences that were safer unfinished.", unlockCodeHint: "THELOCK", corruptionIncrease: 0, theme: "room" },
    { id: "f20", act: 4, sourcePage: "room", visibleDecoy: "WINDOW", revealedText: "outside kept happening, bright and rude and impossible to join.", unlockCodeHint: "ROOM", corruptionIncrease: 1, theme: "outside" },
    { id: "f21", act: 4, sourcePage: "mirror", visibleDecoy: "REFLECTION", revealedText: "the mirror returned a boy-shaped answer with the wrong weather inside.", unlockCodeHint: "MOUTH", corruptionIncrease: 1, theme: "dissociation" },
    { id: "f22", act: 3, sourcePage: "body-log", visibleDecoy: "PRESENCE", revealedText: "the lights were on because the body kept paying the bill.", unlockCodeHint: "ORGANIC", corruptionIncrease: 1, theme: "presence" },
    { id: "f23", act: 2, sourcePage: "messages", visibleDecoy: "PLEASE NOTICE", revealedText: "an honest message is heavier than a locked door.", unlockCodeHint: "STILLHERE", corruptionIncrease: 1, theme: "voice" },
    { id: "f24", act: 5, sourcePage: "void", visibleDecoy: "SECONDS", revealedText: "time passed. that was not proof I was inside it.", unlockCodeHint: "VOID", corruptionIncrease: 1, theme: "time" },
    { id: "f25", act: 5, sourcePage: "void", visibleDecoy: "NO BOTTOM", revealedText: "I named it bottom so someone would believe it ended.", unlockCodeHint: "BOTTOM", corruptionIncrease: 1, theme: "name" },
    { id: "f26", act: 6, sourcePage: "underneath", visibleDecoy: "VOICE", revealedText: "a voice near the hole is not a cure. it is a handrail made of breath.", unlockCodeHint: "UNDERNEATH", corruptionIncrease: 1, theme: "voice" },
    { id: "f27", act: 1, sourcePage: "index", visibleDecoy: "PATCH NOTES", revealedText: "removed: the sentence that made the page too honest.", unlockCodeHint: "THELOCK", corruptionIncrease: 1, theme: "revision" },
    { id: "f28", act: 2, sourcePage: "login", visibleDecoy: "GUEST", revealedText: "guest mode cannot enter the room because guests are allowed to leave.", unlockCodeHint: "ROOM", corruptionIncrease: 0, theme: "guest" },
    { id: "f29", act: 4, sourcePage: "old-save", visibleDecoy: "MISSING ASSETS", revealedText: "childhood was not deleted. it was stored in formats nobody opens now.", unlockCodeHint: "STILLHERE", corruptionIncrease: 1, theme: "save" },
    { id: "f30", act: 6, sourcePage: "bottom", visibleDecoy: "WORD BOTTOM", revealedText: "a word can look like a floor until you stand on it.", unlockCodeHint: "UNDERNEATH", corruptionIncrease: 1, theme: "language" }
  ];

  const byId = Object.fromEntries(fragments.map((fragment) => [fragment.id, fragment]));

  function formatName(text) {
    const name = window.RageStore ? window.RageStore.getName() : "";
    return text.replaceAll("{name}", name || "visitor");
  }

  function showToast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 5200);
  }

  function updateCounters() {
    document.querySelectorAll("[data-fragment-counter]").forEach((node) => {
      node.textContent = `${window.RageStore.countFragments()} / ${fragments.length} fragments`;
    });
  }

  function recover(id, customMessage) {
    const fragment = byId[id];
    if (!fragment || !window.RageStore) return false;
    const isNew = window.RageStore.addFragment(id);
    if (isNew) {
      window.RageStore.increaseCorruption(fragment.corruptionIncrease);
      if (fragment.unlockCodeHint) window.RageStore.unlockCode(fragment.unlockCodeHint);
      console.info(`fragment recovered: ${fragment.revealedText}`);
      showToast(customMessage || `fragment recovered: ${formatName(fragment.revealedText)}`);
      window.RageUI?.applyCorruption();
      updateCounters();
    } else {
      showToast(`already remembered: ${formatName(fragment.visibleDecoy)}`);
    }
    return isNew;
  }

  window.RageFragments = { all: fragments, byId, recover, updateCounters, formatName };
})();
