(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const seconds = document.querySelector("[data-seconds-not-gone]");
    const depth = document.querySelector("[data-depth]");
    if (!seconds || !depth) return;
    window.RageStore?.flag(window.RageStore.keys.reachedVoid);
    window.RageFragments?.recover("f09");
    let elapsed = 0;
    const timer = window.setInterval(() => {
      elapsed += 1;
      seconds.textContent = String(elapsed);
      if (elapsed === 9) window.RageFragments?.recover("f24");
    }, 1000);
    window.addEventListener("scroll", () => {
      const y = Math.round(window.scrollY);
      depth.textContent = `${y} px below mask`;
      if (y > 2400) window.RageFragments?.recover("f25");
      if (y > 5200) {
        window.RageStore?.unlockCode("BOTTOM");
        window.RageStore?.flag(window.RageStore.keys.reachedUnderneath);
        window.RageUI?.speakFromSite("you are deep enough to know bottom was only a label.");
      }
    });
    window.addEventListener("beforeunload", () => window.clearInterval(timer));
    console.info("there is no bottom element.");
  });
})();
