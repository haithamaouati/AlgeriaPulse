# Algeria Pulse / نبض الجزائر

![version](https://img.shields.io/badge/version-2.5.0-2E6F40)

A serverless way to share a local idea, event, or piece of breaking news
from any of Algeria's 58 wilayas — packed entirely into a single link.

## Table of Contents

- [Description](#description)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Developer](#developer)
- [License](#license)

## Description

Algeria Pulse is a lightweight, entirely client-side web app. Pick a
wilaya, write a short message, and the app generates a shareable link
that encodes everything needed to display it — no account, no
database, and no server storing your content. Anyone who opens the
link sees exactly what was written and where it's from.

## Key Features

- Interactive, zoomable map of all 58 wilayas with a radar-style
  pulse animation and clarified, high-contrast boundaries
- Dropdown and map-based wilaya selection, kept in sync
- Bilingual interface — English and Arabic, with instant layout
  direction switching
- Light and dark Green Forest theme
- Expandable writing workspace with live character, word, and line
  counts
- Hashtags: a localized default tag (`#Pulse` / `#نبضة`) plus presets
  and free-form custom tags
- Strict link-generation validation gate — a link is only produced
  once a wilaya, message, and at least one tag are all in place
- Two copy modes: plain link or a formatted, ready-to-post snippet
- Native share support
- Conditional, live-updating relative timestamps ("5 minutes ago")
- Optional username with dynamic initial avatars, inline editing, and
  persistent caching in `localStorage`
- Anonymous posting, represented with a dedicated icon
- Read-only locking of the map and dropdown when viewing a shared
  link, with distinct audio feedback for locked interactions
- Local feed archive (search, filter, reopen, delete) stored entirely
  in `localStorage`, powering a moving news ticker
- Toast notifications and a Howler.js-powered sound engine for key
  actions
- Floating "New Idea" action button and a 6-step floating scroll
  navigation system
- Collapsible "Before you post" legal/etiquette notice
- Soft client-side security and anti-inspection restrictions

## How It Works

1. **Pick a wilaya** from the dropdown or by tapping it on the map.
2. **Write a message** in the text field, expanding it for more room
   if needed.
3. **Add tags** — the default tag is applied automatically; add
   presets or type a custom one.
4. **Identify yourself**, or continue anonymously.
5. **Copy or share** the generated link once every required field is
   filled in.
6. **Opening a shared link** loads its content in a read-only view;
   starting a "New Idea" clears and unlocks the workspace to write a
   fresh pulse.

Every pulse created or opened is also saved to a local, on-device feed
that powers the app's own news ticker and a searchable local archive.

## Developer

Developed with 💚 by [Haitham Aouati](https://github.com/haithamaouati)

## License

MIT
