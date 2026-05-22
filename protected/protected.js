(() => {
  const shield = document.createElement("div");
  shield.className = "shield";
  shield.innerHTML = "<span>arquivo protegido</span>";
  document.body.appendChild(shield);
  document.body.classList.add("locked");

  function flash(message = "arquivo protegido") {
    shield.querySelector("span").textContent = message;
    shield.classList.add("visible");
    window.setTimeout(() => shield.classList.remove("visible"), 720);
  }

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    flash("sem menu aqui");
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const blocked =
      key === "f12" ||
      (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
      (event.ctrlKey && ["u", "s", "p"].includes(key));

    if (blocked) {
      event.preventDefault();
      flash("não abra por fora");
    }
  });
})();
