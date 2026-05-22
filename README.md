# Sunny Room Games

Sunny Room Games is a static interactive psychological mystery disguised as an old browser-games archive. It begins as a bright, awkward, nostalgic site about fake browser games. As the visitor finds fragments, the cheerful surface decays into a hidden narrative about masking pain, dissociation, memory gaps, shame, survival, and the fear of being found.

The horror is not a monster. The horror is how long the boy had to act normal while falling.

## Content Warning

This project deals with heavy emotional themes, including surviving an attempt to end one’s life, numbness, shame, isolation, and not knowing how to explain pain. It does not include graphic content, methods, instructions, gore, or romanticized death.

If the experience feels too close or overwhelming, step away. The project is designed to be disturbing, quiet, and emotionally honest, not harmful.

## Running Locally

You can open `index.html` directly in a browser.

For protected routes like `protected/tomyfoureyes.php`, use the included static server:

```bash
node dev-server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

The server does not execute PHP. It serves `.php` files as static HTML so the hidden archive keeps its old-web shape without needing a build step.

## Structure

- `index.html` is the fake Sunny Room Games homepage.
- `styles.css` controls the bright mask, corruption states, modal windows, and void descent.
- `fragments.js` contains the narrative map, fragment data, and fake game scripts.
- `script.js` handles discovery, localStorage progress, mascot states, fake game windows, console messages, reset memory, and the secret ending.
- `protected/` contains hidden narrative files and static protected pages.

## Interaction Notes

The site includes hidden words, fake games, changing button labels, console messages, source comments, idle text, a Konami-code fragment, protected files, and a secret descent called “the void underneath.”

The project intentionally does not explain every secret. The visitor is meant to notice that the cute site is a mask and that each discovery makes the page less safe.
