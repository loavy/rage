<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>notes</title>
    <link rel="stylesheet" href="protected.css" />
    <style>
      body {
        background: #efe8d3;
        color: #25211c;
        font-family: "Courier New", Courier, monospace;
      }

      main {
        width: min(900px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 2rem 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
      }

      article {
        min-height: 11rem;
        padding: 1rem;
        background: #fff8d8;
        border: 1px solid #8c826f;
        box-shadow: 6px 7px 0 rgba(37, 33, 28, 0.16);
        transform: rotate(var(--turn));
      }

      article p {
        line-height: 1.55;
      }

      @media (max-width: 760px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="grid">
        <article style="--turn:-1deg">
          <p>não contar tudo não é o mesmo que mentir. mas ele misturou os dois até não saber separar.</p>
        </article>
        <article style="--turn:1.2deg">
          <p>lista de coisas que parecem fáceis: levantar, responder, comer, existir sem pedir desculpa.</p>
        </article>
        <article style="--turn:-0.6deg">
          <p>se alguém ficar, talvez a noite não vença por completo.</p>
        </article>
      </section>
      <p><a class="protected-link" href="tomyfoureyes.php">voltar</a></p>
    </main>
    <script src="protected.js"></script>
  </body>
</html>
