<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>protected</title>
    <link rel="stylesheet" href="protected.css" />
    <style>
      body {
        overflow: hidden;
        background: radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.035), transparent 22rem), #101010;
        color: #f2eee7;
        font-family: "Courier New", Courier, monospace;
      }

      .poem {
        position: relative;
        min-height: 100vh;
      }

      .word {
        position: absolute;
        z-index: 1;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: clamp(0.9rem, 1.55vw, 1.45rem);
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 0 12px rgba(242, 238, 231, 0.08);
        transition:
          left 900ms cubic-bezier(0.18, 0.9, 0.18, 1),
          top 900ms cubic-bezier(0.18, 0.9, 0.18, 1),
          opacity 360ms ease,
          transform 900ms cubic-bezier(0.18, 0.9, 0.18, 1);
      }

      button.word {
        cursor: pointer;
      }

      button.word:hover {
        text-decoration: underline;
      }

      .ghost-line {
        position: absolute;
        inset: auto 0 12%;
        opacity: 0;
        color: rgba(242, 238, 231, 0.22);
        text-align: center;
        transition: opacity 280ms ease;
      }

      body.arranging .ghost-line {
        opacity: 1;
      }

      body.arranging .word {
        opacity: 0.78;
      }

      body.solved {
        overflow: auto;
      }

      body.solved .poem {
        width: min(860px, calc(100% - 2rem));
        min-height: auto;
        margin: 0 auto;
        padding: clamp(2rem, 6vw, 5rem) 0;
      }

      .final-text {
        opacity: 0;
        font-size: clamp(1.05rem, 2vw, 1.42rem);
        line-height: 1.75;
        white-space: pre-wrap;
        animation: textArrives 900ms ease forwards;
      }

      .archive-links {
        display: flex;
        margin-top: 3rem;
        gap: 1.2rem;
        flex-wrap: wrap;
        opacity: 0;
        animation: textArrives 900ms ease 450ms forwards;
      }

      .noise {
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 0;
        opacity: 0.16;
        background: repeating-linear-gradient(0deg, transparent 0 7px, rgba(255, 255, 255, 0.06) 8px);
      }

      @keyframes textArrives {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>
  <body>
    <div class="noise" aria-hidden="true"></div>
    <main class="poem" id="poem" aria-label="Texto protegido embaralhado">
      <div class="ghost-line">as palavras lembram antes dele</div>
    </main>

    <script src="protected.js"></script>
    <script>
      const finalText = `às vezes,
ele acorda antes do próprio nome,
com os olhos abertos no escuro
e a vida parada em cima do peito,
pesada,
como se o mundo inteiro tivesse esquecido
que ele ainda era só um garoto.

não entende por que o dia começa
se dentro dele nada levanta,
não entende por que as pessoas dizem “vai passar”
como quem fecha uma porta
sem olhar se alguém ficou preso do outro lado.

na escola,
ele aprende fórmulas, datas, verbos,
mas ninguém explica
como respirar quando existir dói,
como sorrir sem mentir demais,
como pedir ajuda
sem parecer fraco, quebrado, pequeno.

ele olha pela janela
e pensa que a vida talvez seja uma língua antiga,
uma frase escrita por mãos cansadas,
um texto sem pontuação
onde ele tropeça em cada linha
tentando descobrir
se ainda existe sentido
ou se sentido é só uma invenção
dos que nunca afundaram tanto.

de noite,
o quarto cresce.
as paredes se aproximam em silêncio,
o teto parece escutar,
o chão parece chamar,
e ele fica no meio,
entre cair e continuar,
entre sumir e ser encontrado,
entre o medo de viver
e o medo de nunca saber
quem poderia ter sido.

mas mesmo quando ele pensa
que não há amanhã dentro dele,
alguma coisa mínima resiste:
não uma esperança brilhante,
não uma resposta bonita,
apenas um fio,
quase nada,
um resto de luz escondido
na parte mais cansada do coração.

talvez continuar
não seja acreditar na vida inteira,
talvez seja só aguentar esta noite,
depois a próxima manhã,
depois mais um passo torto,
até que um dia
ele perceba
que não precisava entender tudo
para merecer ficar.

e se a vida parece impossível agora,
que alguém sente ao lado dele
sem exigir explicações,
que alguém diga seu nome devagar,
como quem segura uma vela no vento,
e prove, com presença,
que até os garotos perdidos
ainda podem ser encontrados.`;

      const scatter = finalText
        .replace(/[“”]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .sort((a, b) => (a.length * 13 + a.charCodeAt(0)) - (b.length * 13 + b.charCodeAt(0)));

      const poem = document.querySelector("#poem");
      const placedWords = [];

      function positionFor(index) {
        return {
          x: 2 + ((index * 17) % 94),
          y: 3 + ((index * 29) % 92)
        };
      }

      function makeWord(text, index, isTrigger = false) {
        const node = document.createElement(isTrigger ? "button" : "span");
        const position = positionFor(index);
        node.className = "word";
        node.textContent = text;
        node.style.left = `${position.x}%`;
        node.style.top = `${position.y}%`;
        node.style.transform = `translate(-50%, -50%) rotate(${(index % 7) - 3}deg)`;
        poem.appendChild(node);
        placedWords.push(node);
        return node;
      }

      scatter.slice(0, 130).forEach((word, index) => makeWord(word, index));
      const trigger = makeWord("vai passar", 47, true);

      function arrangeIntoRows() {
        document.body.classList.add("arranging");
        placedWords.forEach((node, index) => {
          const column = index % 10;
          const row = Math.floor(index / 10);
          node.style.left = `${8 + column * 9.2}%`;
          node.style.top = `${10 + row * 5.2}%`;
          node.style.transform = "translate(-50%, -50%) rotate(0deg)";
        });
      }

      function revealText() {
        poem.innerHTML = "";

        const text = document.createElement("div");
        text.className = "final-text";
        text.textContent = finalText;
        poem.appendChild(text);

        const links = document.createElement("nav");
        links.className = "archive-links";
        links.setAttribute("aria-label", "Arquivos relacionados");
        links.innerHTML = `
          <a class="protected-link" href="classroom.php">classroom</a>
          <a class="protected-link" href="guestbook.php">guestbook</a>
          <a class="protected-link" href="oldsave.php">oldsave</a>
          <a class="protected-link" href="mirror.php">mirror</a>
          <a class="protected-link" href="notes.php">notes</a>
        `;
        poem.appendChild(links);
        document.body.classList.remove("arranging");
        document.body.classList.add("solved");
      }

      trigger.addEventListener("click", () => {
        arrangeIntoRows();
        window.setTimeout(revealText, 1120);
      });
    </script>
  </body>
</html>
