# Guess the Number

A simple, responsive number-guessing game built with plain HTML, CSS, and JavaScript — no build step required.

## Play

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Features

- Three difficulty levels (Easy: 1–50, Medium: 1–100, Hard: 1–500)
- Too high / too low feedback with a guess history
- Attempt counter and a best-score record per difficulty (saved in `localStorage`)
- Fully responsive, no dependencies

## Other games in this repo

- [`lowest-ticket-wins/`](./lowest-ticket-wins) — "lowest unique number
  wins" game with an admin panel and English/Amharic language switch.
  Built as a Claude Artifact; see its README for why the copy here is
  reference-only.
