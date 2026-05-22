# Sunny Room Games

Sunny Room Games is a static interactive narrative disguised as an old browser-games archive. On the surface it is bright, nostalgic, and slightly broken. Underneath, it tells a psychological mystery about a boy who hides memories inside fake games, patch notes, bug reports, and protected files.

The project is meant to feel melancholy, strange, and human rather than shocking. It uses rooms, corrupted saves, missing assets, fake errors, and social scripts as metaphors for isolation, confusion, and the difficulty of telling the truth.

## Running Locally

You can open `index.html` directly in a browser.

For routes like `protected/tomyfoureyes.php`, use the included static dev server:

```bash
node dev-server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

The server does not execute PHP. It serves `.php` files as static HTML so the hidden archive keeps its old-site shape without needing a build tool.

## Structure

- `index.html` is the fake Sunny Room Games homepage.
- `styles.css` controls the old-web visual style and corruption states.
- `fragments.js` contains the narrative fragment data and short internal story bible.
- `script.js` handles discovery, fake game windows, localStorage progress, easter eggs, and the secret panel.
- `protected/` contains hidden narrative pages and archive files.

## Interaction Notes

The site has hidden fragments, fake games, console messages, keyboard secrets, idle text, and protected routes. It is designed so the page starts cute and becomes less stable as more fragments are found.

Not every secret is explained here. That is part of the work.

## Content Note

This is a psychological mystery about emotional pain, social masking, and trying to be understood. It avoids graphic content and does not present despair as an answer. The ending is intentionally small: not a magical fix, but a possible opening toward being seen.
