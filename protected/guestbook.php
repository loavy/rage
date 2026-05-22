<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>guestbook</title>
    <link rel="stylesheet" href="protected.css" />
    <style>
      body {
        background: #f6f3ef;
        color: #1b1b1b;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }

      main {
        width: min(760px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 2rem 0;
      }

      h1 {
        font-size: 1.4rem;
      }

      article {
        border: 1px solid #b9b2aa;
        margin: 0 0 0.8rem;
        padding: 0.8rem;
        background: #fff;
      }

      .deleted {
        color: #aaa;
      }

      .small {
        color: #666;
        font-size: 0.82rem;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>guestbook</h1>
      <article>
        <p class="small">ana - 22/05</p>
        <p>quando você responder "tô bem", eu vou perguntar de novo.</p>
      </article>
      <article>
        <p class="small">tom - 22/05</p>
        <p>não precisa explicar tudo pra aparecer no servidor hoje.</p>
      </article>
      <article class="deleted">
        <p class="small">deleted_user - 22/05</p>
        <p>vai passar não é senha. é só onde clicar.</p>
      </article>
      <article>
        <p class="small">sem nome - 23/05</p>
        <p>se o site ficar preto, não fecha. espera as palavras pararem.</p>
      </article>
      <p><a class="protected-link" href="tomyfoureyes.php">voltar</a></p>
    </main>
    <script src="protected.js"></script>
  </body>
</html>
