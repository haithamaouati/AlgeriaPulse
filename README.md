# Algeria Pulse — نبض الجزائر

A lightweight, fully client-side web app for sharing an idea, event, or breaking
news item tied to any of Algeria's **58 wilayas (provinces)** — as a single
shareable link. No backend, no accounts, no server-side storage.

![version](https://img.shields.io/badge/version-1.2.0-2E6F40) ![license](https://img.shields.io/badge/license-MIT-4C956C)

---

## ✨ Features

- **58-wilaya interactive SVG map** — click any province to smoothly zoom/pan
  into it, with an animated radar-style "sensor pulse" ring emitted from the
  selected wilaya, a subtle grid overlay on the map surface, and a crisp
  **audio beep** (generated live via the Web Audio API) confirming every tap.
- **Province dropdown** — synced two-way with the map; populated from `data.json`.
- **Bilingual UI (English / Arabic)** — one-click language toggle that swaps all
  copy, flips the layout direction (LTR ⇄ RTL), and swaps the wilaya name order.
- **Light & dark mode** — a Green Forest visual identity (`#2E6F40` primary) in
  both themes, with glassmorphism surfaces throughout.
- **Live clock** — full localized date/time, updating every second.
- **Scrolling news ticker** — a slow, comfortably readable marquee (badge icon:
  `satellite-dish`) that cycles random bilingual sample headlines from
  `news.json`, reshuffling periodically.
- **Text composer with live metrics** — character, word, and line counters.
- **Instant shareable link generation** — every link encodes a timestamp, the
  wilaya ID, and your message (Base64, UTF‑8 safe) as URL query parameters —
  no server round-trip required.
- **Copy & native Share** — one-tap clipboard copy, or the Web Share API on
  supported devices/browsers.
- **Qur'anic reminder** — displayed just below the generated link:
  *"قال تعالى: ﴿مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ﴾ (سورة ق، الآية 18)"*,
  encouraging mindful, accountable sharing.
- **Legal notice** — a collapsible "Before you post" panel referencing
  Algeria's Law No. 09‑04 (5 August 2009) on electronic publishing conduct.
- **About / How it works section** — an in-page explainer reachable via the
  header's `tower-broadcast` info icon (smooth-scrolls down) or the floating
  scroll controls.
- **Stepped floating scroll navigation** — the floating down/up icons walk
  through the page's key sections one at a time instead of jumping straight
  to the top or bottom (see [Stepped scroll navigation](#-stepped-scroll-navigation)).
- **Ambient animated particle background**, respecting `prefers-reduced-motion`.
- **Fully responsive**, down to small mobile viewports.

---

## 🗂️ Project structure

```
algeria-pulse/
├── index.html      # Page structure & content (bilingual, i18n-tagged)
├── style.css        # Theme tokens, layout, animations, responsive rules
├── script.js         # App logic: i18n, map, ticker, link generation, particles
├── data.json          # The 58 wilayas: id, number, name_ar, name_en
├── news.json           # Sample bilingual ticker headlines (placeholder feed)
├── algeria.svg           # Wilaya-level administrative boundaries (amCharts geodata)
├── icon.ico                # Favicon
└── README.md                 # This file
```

No build step, no bundler, no package manager required — every file is used as-is.

---

## 🚀 Getting started

Because the app uses `fetch()` to load `data.json`, `news.json`, and
`algeria.svg`, it must be served over `http(s)://` rather than opened directly
via `file://` (browsers block `fetch` on the `file:` protocol).

Any static file server works, for example:

```bash
# Python
python3 -m http.server 8080

# Node (http-server package)
npx http-server -p 8080
```

Then open `http://localhost:8080` in your browser.

---

## 🧠 Architecture & how it works

### 1. Data layer
- **`data.json`** — an array of 58 province records: `id` (`DZ-01` … `DZ-58`),
  `number`, `name_ar`, `name_en`. Powers both the `<select>` dropdown and the
  province-details panel.
- **`news.json`** — an array of `{ en, ar }` sample headline pairs consumed by
  the ticker. Swap this file for a real news feed in production; the ticker
  logic only expects the same `{ news: [{ en, ar }, …] }` shape.

### 2. Map interaction (`script.js`)
- `algeria.svg` is fetched and injected inline (not via `<img>`/`<object>`) so
  its `<path id="DZ-XX">` elements are directly scriptable.
- All paths are moved into a single `<g id="mapGroup">`, which is the element
  actually transformed (translate + scale) for zoom/pan — keeping the SVG's
  own coordinate system as the source of truth.
- Selecting a province:
  1. Plays a short, clean **beep** (Web Audio API — a sine oscillator with a
     fast attack/decay gain envelope, no audio files or external assets)
     whenever a wilaya is clicked directly on the map.
  2. Highlights the corresponding `<path>` (`.selected` class).
  3. If another province was already focused, the view first **zooms out**
     to the full map, then **zooms/pans in** on the new selection (two-stage
     animation via a CSS `transition` on `#mapGroup`, chained with
     `setTimeout`). A first-ever selection zooms straight in.
  4. Spawns three staggered, looping "sensor ring" `<circle>` elements
     centered on the province's bounding-box centroid, animated purely in CSS
     (`@keyframes sensorPulse`).
- Clicking the map and choosing from the `<select>` are kept in sync through
  a shared `selectProvince(id)` function. The audio beep only fires for
  direct map clicks, not for dropdown selections.

### 3. Link generation
```
<origin>/<path>?t=<timestamp>&p=<wilaya-id>&d=<base64(text)>
```
- `t` — `Date.now()` timestamp.
- `p` — the wilaya id, e.g. `DZ-16`.
- `d` — the message, Base64-encoded via a UTF‑8-safe helper (safe for Arabic
  text). Regenerated live on every keystroke / province change.
- On load, the app also **hydrates itself from an incoming link** (`p` + `d`
  query params), so a shared link reopens with the same province and text
  pre-filled — entirely client-side, no server involved.

### 4. Stepped scroll navigation

The two floating buttons (bottom-right) don't jump straight to the top/bottom
of the page — each click advances one step through the same five key
sections, in opposite order:

| Click # | Down icon (▼) stops at | Up icon (▲) stops at |
|---|---|---|
| 1 | Province dropdown | About / Information section |
| 2 | Text input field | Output / generated link |
| 3 | Interactive map | Interactive map |
| 4 | Output / generated link | Text input field |
| 5 (final) | About / Information section | Province dropdown |

Each button keeps its own step index (`scrollStepDown` / `scrollStepUp` in
`script.js`), synced to a shared position so switching direction resumes
sensibly from wherever the last click landed, and clamps at the final section
rather than looping.

### 5. Internationalization
- A single `I18N` dictionary (`en` / `ar`) in `script.js` drives every string
  via `data-i18n` / `data-i18n-placeholder` / `data-i18n-aria` attributes in
  the HTML.
- Toggling language flips `<html lang>` and `<html dir>` (`ltr` ⇄ `rtl`),
  re-renders the select options (name order swaps), the live clock locale,
  and the news ticker content.

### 6. Theming
- CSS custom properties define the Green Forest palette once under `:root`
  and are overridden under `[data-theme="dark"]`. All surfaces reference the
  variables, so toggling `data-theme` on `<html>` re-themes the whole app
  instantly, including SVG map fills.

---

## 🎨 Design tokens

| Token | Light | Dark |
|---|---|---|
| `--primary` | `#2E6F40` | `#2E6F40` |
| `--primary-light` | `#4C956C` | `#4C956C` |
| `--primary-dark` | `#1B4332` | `#1B4332` |
| `--accent` | `#95D5B2` | `#95D5B2` |
| `--bg` | `#F1FAF4` | `#0B1F17` |
| `--text` | `#12271B` | `#E9F5EC` |

Typeface: **Cairo** (Google Fonts), supporting both Latin and Arabic scripts.
Icons: **Font Awesome 6**.

### Key icon mapping

| Element | Icon |
|---|---|
| App brand (pulsing) | `fa-tower-broadcast` |
| Header "About" navigation | `fa-tower-broadcast` |
| News ticker badge | `fa-satellite-dish` |
| Publish/copy notification | `fa-circle-check` (`#2E6F40`) |
| Warning notice | `fa-triangle-exclamation` |
| Footer heart | `fa-heart` (heartbeat animation) |
| Scroll up / down | `fa-angles-up` / `fa-angles-down` |

---

## 🔊 Audio feedback

Clicking any wilaya directly on the SVG map triggers a short, clean beep —
generated entirely in-browser with the **Web Audio API** (a sine oscillator
shaped by a fast attack/decay gain envelope). No audio files are loaded, so
there's nothing to fetch or fail; if the API is unavailable the app simply
stays silent. Selecting a province from the dropdown does not play a sound.

---

## 📖 Qur'anic reminder

Directly beneath the generated link, the Output section displays:

> قال تعالى: ﴿مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ﴾ (سورة ق، الآية 18)

This is a fixed, always-visible reminder (independent of the interface
language toggle) encouraging thoughtful, accountable sharing before a link
is copied or shared.

---

## ♿ Accessibility & performance notes

- Visible focus outlines on all interactive controls.
- `prefers-reduced-motion` disables the particle animation, the sensor
  pulse rings, and the news ticker's scroll animation.
- All icon-only buttons carry `aria-label`s that are translated with the UI
  language.
- The particle canvas and decorative overlays are `aria-hidden`.

---

## 🔒 Privacy & compliance

Algeria Pulse never uploads or stores any content — everything lives in the
generated link itself. A collapsible notice reminds users that Algeria's
**Law No. 09‑04 of 5 August 2009** governs online publishing conduct, and asks
that shared content stay lawful and non-harmful.

---

## 🛠️ Customizing

- **Add/rename wilayas or fix names** → edit `data.json`; the dropdown and
  province-details panel update automatically. If you add a province, also
  add a matching `<path id="...">` to `algeria.svg`.
- **Change the news feed** → replace the contents of `news.json` (keep the
  `{ news: [{ en, ar }, …] }` shape), or point `loadNews()` in `script.js` at
  a real endpoint.
- **Change the palette** → edit the CSS custom properties at the top of
  `style.css` (`:root` and `[data-theme="dark"]`).
- **Change the favicon** → replace `icon.ico`.

---

## 📄 License

MIT — do whatever you like, attribution appreciated.

## 👤 Author

**Developed with 💚 by [Haitham Aouati](https://github.com/haithamaouati)**
[Telegram](https://t.me/haithamaouati) · [GitHub](https://github.com/haithamaouati)
