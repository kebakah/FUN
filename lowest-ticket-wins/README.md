# Lowest Ticket Wins

Source for a "lowest unique number wins" game with a bilingual (English /
Amharic) interface and an admin panel for setting the prize and closing
the round.

## ⚠️ This copy is not functional as-is

This page was built as a **Claude Artifact**, which relies on a runtime
object (`window.claude.use('db')` / `window.claude.use('user')`) that
Claude's artifact viewer injects to provide shared live data and
owner/admin detection. That object does not exist on GitHub Pages or any
other plain web host, so opening `index.html` outside claude.ai will show
the static shell (title, rules, language switch) but the entries form,
live tally, results, and admin panel will not work — there's no database
behind it here.

**To actually play the live version**, use the published Claude Artifact
link (ask whoever built this for the current URL) — it's shared from
claude.ai and works for anyone with view/interact access to that page.

**To make this work as a standalone hosted app**, it would need to be
rewritten against a real backend (e.g. a small API + database) and
deployed somewhere like Render, Railway, or Vercel. This folder is kept
here purely for version history / reference of the game's design and
logic (validation rules, winner-selection algorithm, translations).

## What's here

- `index.html` — the full single-file page (HTML/CSS/JS), wrapped with a
  standard document skeleton so it at least *renders* outside claude.ai.
