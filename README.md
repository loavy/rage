# RAGE / Sunny Room Games

Sunny Room Games is a static psychological horror mystery disguised as a cute old browser-game portal. The site begins as a cheerful game page, then gradually reveals hidden memories, fake systems, corrupted routes, and a plain-text ending underneath the mask.

## Content Warning

Themes include masking, dissociation, emotional collapse, survival after severe crisis, shame, memory, isolation, and a bottomless void metaphor. The project avoids graphic gore, self-harm methods, instructions, flashing lights, and jumpscares.

## How To Run

Open `index.html` directly in a browser.

You can also serve the folder with any simple static server, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

The login system is narrative and puzzle-based. It is not real authentication, has no backend, and stores progress only in `localStorage`.

Progress uses hidden fragments, corruption levels, unlocked route codes, return counts, and a few story flags. The project is intentionally discoverable through clicking, revisiting, trying codes, reading fake systems, and noticing when the interface stops behaving like a cute game site.

The secrets are not fully listed here because finding them is part of the experience.
