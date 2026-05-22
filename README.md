# Sunny Room Games / Rage

Sunny Room Games is a static interactive psychological horror mystery disguised as an old browser-game archive. It begins as a bright, awkward, nostalgic game site and gradually becomes a network of hidden pages about masking pain, dissociation, body-as-interface horror, memory gaps, survival after emotional collapse, and the fear of being found.

The horror is not blood. The horror is being alive, unreachable, and still expected to smile.

## Content Warning

This project contains heavy themes: emotional crisis, dissociation, shame, isolation, survival after a severe personal collapse, and the difficulty of continuing afterward. It uses body-horror metaphors such as pressure, pulse, rooms breathing, and the body feeling unfamiliar.

It does **not** include graphic self-harm, methods, instructions, gore, or romanticized death. If the experience feels overwhelming, step away.

## Running Locally

You can open `index.html` directly in a browser.

For old-style routes like `.php` pages, use the included static server:

```bash
node dev-server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

No build step, backend, framework, or real authentication is required.

## Narrative Login

`login.html` is not real authentication. It is an ARG-style narrative gateway. Codes discovered across the site unlock hidden routes and memory pages. The login remembers attempts, discovered access levels, and the optional name/nickname the visitor gives the room.

The project intentionally does not list every code here.

## Structure

- `index.html`: fake Sunny Room Games surface.
- `login.html`: narrative access-code gateway.
- `void.html`: bottomless descent page.
- `fragments.js`: fragment data, acts, fake game scripts, code hints.
- `routes.js`: access-code route map.
- `script.js`: discovery system, localStorage memory, corruption states, mascot, games, void panel.
- `styles.css`: old-web mask, organic corruption, subsites, void, reduced-motion support.
- `protected/`: hidden pages and recovered files.

## Themes

- Act 1: The Site
- Act 2: The Mask
- Act 3: The Body
- Act 4: The Room
- Act 5: The Void
- Act 6: The Underneath

The experience is meant to feel intimate and unsettling: ordinary life mixed with mystery, fake games that become emotional memories, messages that force normal replies, and a login page that slowly stops asking for credentials and starts asking for confession.
