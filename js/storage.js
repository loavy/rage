(function () {
  const keys = {
    name: "rage_user_name",
    fragments: "rage_fragments_found",
    codes: "rage_unlocked_codes",
    corruption: "rage_corruption_level",
    attempts: "rage_login_attempts",
    returns: "rage_return_count",
    saidFine: "rage_said_fine",
    reachedVoid: "rage_reached_void",
    reachedUnderneath: "rage_reached_underneath",
    resetCount: "rage_reset_count"
  };

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const Store = {
    keys,
    getName() {
      return localStorage.getItem(keys.name) || "";
    },
    setName(name) {
      localStorage.setItem(keys.name, String(name || "").trim().slice(0, 40));
    },
    getFragments() {
      return readJSON(keys.fragments, []);
    },
    hasFragment(id) {
      return this.getFragments().includes(id);
    },
    addFragment(id) {
      const fragments = this.getFragments();
      if (!fragments.includes(id)) {
        fragments.push(id);
        writeJSON(keys.fragments, fragments);
        return true;
      }
      return false;
    },
    countFragments() {
      return this.getFragments().length;
    },
    getCodes() {
      return readJSON(keys.codes, []);
    },
    unlockCode(code) {
      const clean = String(code || "").toUpperCase();
      const codes = this.getCodes();
      if (clean && !codes.includes(clean)) {
        codes.push(clean);
        writeJSON(keys.codes, codes);
      }
    },
    hasCode(code) {
      return this.getCodes().includes(String(code || "").toUpperCase());
    },
    getNumber(key, fallback) {
      const value = Number(localStorage.getItem(key));
      return Number.isFinite(value) ? value : fallback;
    },
    setNumber(key, value) {
      localStorage.setItem(key, String(value));
    },
    bump(key, amount = 1) {
      const next = this.getNumber(key, 0) + amount;
      this.setNumber(key, next);
      return next;
    },
    getCorruption() {
      return Math.max(0, Math.min(6, this.getNumber(keys.corruption, 0)));
    },
    setCorruption(level) {
      this.setNumber(keys.corruption, Math.max(0, Math.min(6, Number(level) || 0)));
    },
    increaseCorruption(amount) {
      this.setCorruption(this.getCorruption() + (Number(amount) || 0));
    },
    flag(key) {
      localStorage.setItem(key, "true");
    },
    isFlagged(key) {
      return localStorage.getItem(key) === "true";
    },
    reset() {
      const resetCount = this.bump(keys.resetCount, 1);
      Object.values(keys).forEach((key) => {
        if (key !== keys.resetCount) localStorage.removeItem(key);
      });
      localStorage.setItem(keys.resetCount, String(resetCount));
    }
  };

  window.RageStore = Store;
})();
