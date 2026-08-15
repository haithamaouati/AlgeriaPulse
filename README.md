# Algeria Pulse — نبض الجزائر

A lightweight, fully client-side web app for sharing an idea, event, or breaking
news item tied to any of Algeria's **58 wilayas (provinces)** — as a single
shareable link. No backend, no accounts, no server-side storage.

![version](https://img.shields.io/badge/version-1.3.0-2E6F40) ![license](https://img.shields.io/badge/license-MIT-4C956C)

---

## ✨ Features

- **58-wilaya interactive SVG map** — click any province to smoothly zoom/pan
  into it, with an animated radar-style "sensor pulse" ring emitted from the
  selected wilaya, a subtle grid overlay on the map surface, and a crisp
  **audio beep** (generated live via the Web Audio API) confirming every tap
  — on the map itself, or when picking a wilaya from the dropdown.
- **Province dropdown** — synced two-way with the map; populated from `data.json`.
- **Bilingual UI (English / Arabic)** — one-click language toggle that swaps all
  copy, flips the layout direction (LTR ⇄ RTL), and swaps the wilaya name order.
- **Light & dark mode** — a Green Forest visual identity (`#2E6F40` primary) in
  both themes, with glassmorphism surfaces throughout.
- **Live clock** — full localized date/time, updating every second.
- **Scrolling news ticker** — a slow, comfortably readable marquee (badge icon:
  `satellite-dish`) that cycles random bilingual sample headlines from
  `news.json`, reshuffling periodically.
- **Username prompt on load** — a themed modal asks for a display name before
  the app is used; the name is woven into every generated link and shown in
  the identity bar. It's **editable at any time** afterwards via a small pencil
  icon next to your name (see [Username & participation identity](#-username--participation-identity)).
- **Identity bar** — below the text field, replacing the old character/word/line
  counters, showing the current **username** (with an inline edit control) and
  the **participation timestamp** (freshly generated, or extracted straight
  from a visited shareable link).
- **Instant shareable link generation** — every link encodes the username,
  a participation timestamp, the wilaya ID, and your message (Base64, UTF‑8
  safe) as URL query parameters — no server round-trip required.
- **Copy & native Share** — one-tap clipboard copy, or the Web Share API on
  supported devices/browsers.
- **Legal notice** — a collapsible "Before you post" panel (collapsed by
  default) referencing Algeria's Law No. 09‑04 (5 August 2009) on electronic
  publishing conduct.
- **About / How it works section** — an in-page explainer reachable via the
  header's `tower-broadcast` info icon (smooth-scrolls down) or the floating
  scroll controls.
- **Stepped floating scroll navigation** — the floating down/up icons walk
  through six stops across the page one at a time instead of jumping straight
  to the top or bottom (see [Stepped scroll navigation](#-stepped-scroll-navigation)).
- **Content-protection deterrents** — page-wide text selection, right-click,
  and common dev-tools shortcuts are soft-blocked (see [Content protection](#-content-protection)).
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
     whenever a wilaya is chosen — either clicked directly on the map, or
     picked from the `<select>` dropdown.
  2. Highlights the corresponding `<path>` (`.selected` class).
  3. If another province was already focused, the view first **zooms out**
     to the full map, then **zooms/pans in** on the new selection (two-stage
     animation via a CSS `transition` on `#mapGroup`, chained with
     `setTimeout`). A first-ever selection zooms straight in.
  4. Spawns three staggered, looping "sensor ring" `<circle>` elements
     centered on the province's bounding-box centroid, animated purely in CSS
     (`@keyframes sensorPulse`).
- Clicking the map and choosing from the `<select>` are kept in sync through
  a shared `selectProvince(id)` function; both trigger the same `playMapBeep()`
  audio cue.

### 3. Link generation
```
<origin>/<path>?u=<username>&t=<participation-timestamp>&p=<wilaya-id>&d=<base64(text)>
```
- `u` — the display name captured by the username modal (or hydrated from an
  incoming link), inserted **immediately before** `t`.
- `t` — the **participation timestamp**: set once, either the moment the
  username is submitted (a fresh `Date.now()`) or, when the page is opened
  from someone else's shared link, the exact `t` value extracted from that
  link. Unlike a per-keystroke timestamp, this value stays fixed for the
  whole session so it always matches what's shown in the identity bar.
- `p` — the wilaya id, e.g. `DZ-16`.
- `d` — the message, Base64-encoded via a UTF‑8-safe helper (safe for Arabic
  text). Regenerated live on every keystroke / province change.
- The link only populates once a username is known **and** a province and
  message are both filled in — `generateLink()` no-ops (empty output field)
  until all four pieces are ready.
- On load, the app also **hydrates itself from an incoming link**: `p` + `d`
  pre-fill the province and message immediately, while `u` + `t` are handed
  to the username modal (see below) as a prefill and an extracted timestamp
  rather than being applied automatically — entirely client-side, no server
  involved.

### 4. Username & participation identity
- `resolveIdentity()` runs after the page's data loads and **always** shows
  the themed modal (`#usernameModal`) — it is never skipped.
- If the URL already carries a `t` (timestamp) parameter — i.e. the page was
  opened from a shared pulse — that value is **extracted and reused as the
  participation timestamp** rather than generating a new one.
- If the URL carries a `u` (username) parameter, the modal's input is
  **prefilled** with it, so the current visitor only needs to confirm (or
  can change it) rather than retype it from scratch.
- Submitting the modal (name, minimum 2 characters) finalizes the username;
  a fresh `Date.now()` participation timestamp is only stamped if one wasn't
  already extracted from the URL. Nothing is persisted to
  `localStorage`/cookies — refreshing the page shows the modal again.
- **The username is editable at any time.** A small pencil icon
  (`#editUsernameBtn`, `fa-pen`) sits next to the name in the identity bar;
  clicking it reopens the same modal in an "edit" mode — copy switches to
  "Update your username", the field is prefilled with the current name, and
  submitting only updates `username` (the existing `participationTimestamp`
  is left untouched, so re-editing your name doesn't reset your session's
  participation time).
- The identity bar (`#metricUsername`, `#metricTimestamp`, under the text
  field) mirrors this state and re-formats the timestamp for the active
  language/locale whenever the UI language is toggled.

### 5. Stepped scroll navigation

The two floating buttons (bottom-right) don't jump straight to the top/bottom
of the page — each click advances one step through a sequence of stops.
The down and up sequences are **not** simple mirrors of each other: down
finishes at the page's very bottom, and up finishes at the page's very top.

| Click # | Down icon (▼) stops at | Up icon (▲) stops at |
|---|---|---|
| 1 | Province dropdown | Footer / developer credit |
| 2 | Text input field | About / Information section |
| 3 | Interactive map | Output / generated link |
| 4 | Output / generated link | Interactive map |
| 5 | About / Information section | Text input field |
| 6 (final) | Footer / developer credit | Very top of the page (main header) |

Each button keeps its own independent step index (`scrollStepDown` /
`scrollStepUp` in `script.js`) into its own six-stop sequence
(`getDownSteps()` / `getUpSteps()`), and clamps at its final stop rather than
looping back to the start.

### 6. Internationalization
- A single `I18N` dictionary (`en` / `ar`) in `script.js` drives every string
  via `data-i18n` / `data-i18n-placeholder` / `data-i18n-aria` attributes in
  the HTML.
- Toggling language flips `<html lang>` and `<html dir>` (`ltr` ⇄ `rtl`),
  re-renders the select options (name order swaps), the live clock locale,
  and the news ticker content.

### 7. Theming
- CSS custom properties define the Green Forest palette once under `:root`
  and are overridden under `[data-theme="dark"]`. All surfaces reference the
  variables, so toggling `data-theme` on `<html>` re-themes the whole app
  instantly, including SVG map fills.

### 8. Content protection
- `applyContentProtections()` (called once on init) attaches page-wide
  listeners that `preventDefault()` on `contextmenu` (right-click),
  `selectstart`, `copy`, `cut`, and `dragstart` — except when the event
  target is an `<input>` or `<textarea>`, so typing, editing, and copying
  your own draft text or the generated link still work normally.
- A `keydown` listener also blocks the most common dev-tools shortcuts:
  `F12`, `Ctrl/Cmd+Shift+I/J/C`, and `Ctrl/Cmd+U/S`.
- CSS backs this up with `user-select: none` on `html, body` (re-enabled for
  form fields via a targeted override) and `-webkit-user-drag: none` on
  images/SVG.
- **Important:** these are soft, client-side deterrents against casual
  copying/inspection only. They cannot reliably stop a determined user, and
  browser dev tools can always be opened through the menu regardless of
  blocked shortcuts. Treat this as a UX nudge, not a security boundary —
  never rely on it to protect sensitive data (this app has none by design).

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
| Username modal | `fa-user-pen` |
| Identity bar | `fa-user` (username) / `fa-stopwatch` (timestamp) |
| Edit username | `fa-pen` |

---

## 🔊 Audio feedback

Choosing a wilaya — either by clicking it directly on the SVG map, or by
picking it from the province dropdown — triggers a short, clean beep,
generated entirely in-browser with the **Web Audio API** (a sine oscillator
shaped by a fast attack/decay gain envelope). No audio files are loaded, so
there's nothing to fetch or fail; if the API is unavailable the app simply
stays silent.

---

## 👤 Username & participation identity

On **every** page load, Algeria Pulse shows a themed modal asking **"What
should we call you?"**. This isn't authentication — it's a lightweight
attribution step, and it always appears, even if you arrived via someone
else's shared link:

1. If the link you opened already carries a `u` (username) value, the input
   is **prefilled** with it as a courtesy — but you still need to confirm
   (or change it) before continuing.
2. If the link carries a `t` (timestamp) value, that **participation
   timestamp is extracted and reused as-is** — representing the moment the
   original pulse was created — instead of generating a new one.
3. If there's no `t` to extract, a fresh participation timestamp is stamped
   the moment you submit the modal.
4. Both the confirmed username and the resulting timestamp are held in
   memory for the session, displayed in the identity bar under the text
   field, and woven into every link you generate afterwards (`u` positioned
   directly before `t` in the query string).
5. **Changed your mind about your name?** Click the pencil icon next to it
   in the identity bar at any time — the same modal reopens pre-filled with
   your current name, and updating it only changes `username`; your
   participation timestamp stays exactly as it was.

No username is ever sent anywhere or stored server-side; it only ever lives
inside the URL you choose to share.

---

## 🖱️ Content protection

To discourage casual copying or right-click inspection of the page, Algeria
Pulse applies a set of soft client-side restrictions:

- Text selection is disabled across the page (form fields remain selectable
  and editable).
- Right-click / context menu is suppressed.
- Copy, cut, and drag-and-drop of page content are blocked outside of form
  fields.
- Common browser dev-tools shortcuts (`F12`, `Ctrl/Cmd+Shift+I/J/C`,
  `Ctrl/Cmd+U/S`) are intercepted.

These are UX-level deterrents, not real security — see the *Content
protection* subsection under Architecture above for the full technical
caveat.

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
generated link itself. A collapsible notice (collapsed by default so it
doesn't block the workspace, expandable via its chevron) reminds users that
Algeria's **Law No. 09‑04 of 5 August 2009** governs online publishing
conduct, and asks that shared content stay lawful and non-harmful.

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
- **Adjust or disable content protection** → edit/remove listeners inside
  `applyContentProtections()` in `script.js` if the restrictions are too
  aggressive for your deployment (e.g. an internal tool where copy/paste is
  expected).
- **Change the username requirement** → adjust the minimum-length check and
  copy inside the `usernameForm` submit handler in `script.js`, and the
  modal markup/i18n strings (`modal_*` keys) for wording changes.

---

## 📄 License

MIT — do whatever you like, attribution appreciated.

## 👤 Author

**Developed with 💚 by [Haitham Aouati](https://github.com/haithamaouati)**
[Telegram](https://t.me/haithamaouati) · [GitHub](https://github.com/haithamaouati)
