/* =========================================================
   Algeria Pulse — UI Layer
   Everything here reads/writes the DOM. It never talks to
   localStorage directly for writes tied to business rules (that's
   storage.js) and never decides *whether* a link is valid to
   generate (that's app.js's validation gate) — it only renders
   whatever state it's given.

   `bindState(state)` is called once by app.js with its shared,
   mutable state object; every render function below reads through
   that live reference, so app.js never has to re-pass the same data
   on every call.
   ========================================================= */

import { I18N, TAGS, DEFAULT_TAG, DEFAULT_TAG_LABELS } from "./config.js";
import { loadFeed, deleteFeedEntry, clearFeedStorage, loadCachedUsername } from "./storage.js";

export const els = {};
let state = null;

export function bindState(sharedState) {
  state = sharedState;
}

const $ = (sel) => document.querySelector(sel);

/* ---------- Element cache ---------- */
export function cacheElements() {
  els.langToggle = $("#langToggle");
  els.langToggleLabel = $("#langToggleLabel");
  els.themeToggle = $("#themeToggle");
  els.themeIcon = $("#themeIcon");
  els.liveClock = $("#liveClock");
  els.provinceSelect = $("#provinceSelect");
  els.noticeToggle = $("#noticeToggle");
  els.noticeBody = $("#noticeBody");
  els.pulseText = $("#pulseText");
  els.textareaHome = $("#textareaHome");
  els.metricUsername = $("#metricUsername");
  els.metricTimestamp = $("#metricTimestamp");
  els.participationMetric = $("#participationMetric");
  els.userAvatar = $("#userAvatar");
  els.mapContainer = $("#mapContainer");
  els.mapReset = $("#mapReset");
  els.detailId = $("#detailId");
  els.detailName = $("#detailName");
  els.provinceSelectWrap = $("#provinceSelectWrap");
  els.mapWrap = $("#mapWrap");
  els.outputLink = $("#outputLink");
  els.copyBtn = $("#copyBtn");
  els.copySnippetBtn = $("#copySnippetBtn");
  els.shareBtn = $("#shareBtn");
  els.aboutNavBtn = $("#aboutNavBtn");
  els.aboutSection = $("#about");
  els.tickerTrack = $("#tickerTrack");
  els.scrollTopBtn = $("#scrollTopBtn");
  els.scrollBottomBtn = $("#scrollBottomBtn");
  els.usernameModal = $("#usernameModal");
  els.usernameForm = $("#usernameForm");
  els.usernameInput = $("#usernameInput");
  els.usernameModalTitle = $("#usernameModalTitle");
  els.usernameModalSub = $("#usernameModalSub");
  els.usernameAnonymousBtn = $("#usernameAnonymousBtn");
  els.newIdeaFab = $("#newIdeaFab");
  els.sharedBadge = $("#sharedBadge");
  els.feedNavBtn = $("#feedNavBtn");
  els.feedModal = $("#feedModal");
  els.feedCloseBtn = $("#feedCloseBtn");
  els.feedSearch = $("#feedSearch");
  els.feedFilterTabs = document.querySelectorAll(".feed-filter-tab");
  els.feedList = $("#feedList");
  els.feedEmpty = $("#feedEmpty");
  els.feedClearBtn = $("#feedClearBtn");
  els.toastContainer = $("#toastContainer");
  els.tagsRow = $("#tagsRow");
  els.tagsInputRow = $("#tagsInputRow");
  els.customTagInput = $("#customTagInput");
  els.addTagBtn = $("#addTagBtn");
  els.expandTextBtn = $("#expandTextBtn");
  els.expandModal = $("#expandModal");
  els.expandModalTitle = $("#expandModalTitle");
  els.expandCloseBtn = $("#expandCloseBtn");
  els.expandTextareaSlot = $("#expandTextareaSlot");
  els.expandMetrics = $("#expandMetrics");
  els.expandCharCount = $("#expandCharCount");
  els.expandWordCount = $("#expandWordCount");
  els.expandLineCount = $("#expandLineCount");
}

/* ---------- Content protection (soft client-side deterrents) ----------
   These only discourage casual copying/inspection — they cannot truly
   block a determined user or the browser's built-in dev tools. Form
   fields (input/textarea) stay selectable so the app remains usable. */
export function applyContentProtections() {
  const isFormField = (el) => {
    const tag = (el && el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea";
  };

  document.addEventListener("contextmenu", (e) => e.preventDefault());

  document.addEventListener("selectstart", (e) => {
    if (isFormField(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener("copy", (e) => {
    if (isFormField(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener("cut", (e) => {
    if (isFormField(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener("dragstart", (e) => e.preventDefault());

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const isDevToolsCombo =
      key === "F12" ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(key)) ||
      ((e.ctrlKey || e.metaKey) && ["U", "u", "S", "s"].includes(key));
    if (isDevToolsCombo) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

/* ---------- Theme ---------- */
export function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  els.themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* ---------- Language helpers ----------
   Resolve a value for the active language, falling back to whichever of
   the two is available. */
export function pickLang(en, ar) {
  if (state.currentLang === "ar") return ar || en || "";
  return en || ar || "";
}

export function localizedProvinceName(p) {
  if (!p) return "";
  return pickLang(p.name_en, p.name_ar);
}

export function tagLabel(id) {
  if (id === DEFAULT_TAG) return DEFAULT_TAG_LABELS[state.currentLang] || DEFAULT_TAG_LABELS.en;
  const def = TAGS.find((t) => t.id === id);
  if (!def) return id;
  return state.currentLang === "en" ? def.en : def.ar;
}

/* ---------- Notice (collapsible) ---------- */
export function toggleNotice() {
  const expanded = els.noticeToggle.getAttribute("aria-expanded") === "true";
  els.noticeToggle.setAttribute("aria-expanded", String(!expanded));
  els.noticeBody.classList.toggle("collapsed", expanded);
}

/* ---------- Full language + i18n DOM refresh ----------
   Applies `state.currentLang` to every translated element and
   re-renders every language-dependent widget. Called by app.js whenever
   the language toggles. */
export function applyLanguage() {
  const lang = state.currentLang;
  const dict = I18N[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", dir);
  els.langToggleLabel.textContent = lang === "en" ? "AR" : "EN";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    if (node === els.feedClearBtn && feedClearArmed) return;
    const key = node.getAttribute("data-i18n");
    if (dict[key]) node.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (dict[key]) node.setAttribute("placeholder", dict[key]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria");
    if (dict[key]) node.setAttribute("aria-label", dict[key]);
  });

  populateSelect();
  updateProvinceDetails();
  updateClock();
  updateIdentityDisplay();
  renderTicker();
  refreshUsernameModalCopy();
  renderTagChips();
  if (els.feedModal && !els.feedModal.hidden) renderFeedList();
}

export function refreshUsernameModalCopy() {
  if (!els.usernameModal || els.usernameModal.hidden) return;
  const dict = I18N[state.currentLang];
  const editing = els.usernameModal.dataset.mode === "edit";
  if (els.usernameModalTitle) els.usernameModalTitle.textContent = editing ? dict.modal_title_edit : dict.modal_title;
  if (els.usernameModalSub) els.usernameModalSub.textContent = editing ? dict.modal_sub_edit : dict.modal_sub;
}

/* ---------- Username modal ---------- */
export function showUsernameModal(opts = {}) {
  const dict = I18N[state.currentLang];
  const editing = !!opts.editing;

  els.usernameModal.hidden = false;
  els.usernameModal.dataset.mode = editing ? "edit" : "create";

  if (editing) {
    els.usernameInput.value = state.username || "";
    if (els.usernameModalTitle) els.usernameModalTitle.textContent = dict.modal_title_edit;
    if (els.usernameModalSub) els.usernameModalSub.textContent = dict.modal_sub_edit;
  } else {
    els.usernameInput.value = loadCachedUsername();
    if (els.usernameModalTitle) els.usernameModalTitle.textContent = dict.modal_title;
    if (els.usernameModalSub) els.usernameModalSub.textContent = dict.modal_sub;
  }

  window.setTimeout(() => {
    els.usernameInput.focus();
    els.usernameInput.select();
  }, 60);
}

export function hideUsernameModal() {
  els.usernameModal.hidden = true;
}

/* ---------- Lock state (read-only shared pulse) ---------- */
export function updateLockState() {
  const locked = state.sharedView;
  if (els.provinceSelectWrap) els.provinceSelectWrap.classList.toggle("locked", locked);
  if (els.provinceSelect) els.provinceSelect.tabIndex = locked ? -1 : 0;
  if (els.mapWrap) els.mapWrap.classList.toggle("locked", locked);
}

/* ---------- Identity bar (avatar + username + conditional timestamp) ---------- */
function formatAbsoluteTimestamp(ts) {
  const locale = state.currentLang === "ar" ? "ar-DZ" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(new Date(ts));
}

// Uses Intl.RelativeTimeFormat, which natively localizes to Arabic or
// English (e.g. "5 minutes ago" / "قبل 5 دقائق") without any manual
// string tables.
export function relativeTimeString(ts) {
  if (!ts) return null;
  const divisions = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Number.POSITIVE_INFINITY, unit: "year" }
  ];
  let duration = (ts - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(state.currentLang === "ar" ? "ar" : "en", { numeric: "auto" });
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return null;
}

// Renders the circular avatar in the identity bar: the first letter of
// the display name (uppercased) for a named user/author, or the
// user-secret icon when anonymous / no name is available. Built with
// DOM methods rather than innerHTML so arbitrary usernames are always
// treated as plain text, never markup.
function updateAvatar(displayName, anonymous) {
  if (!els.userAvatar) return;
  els.userAvatar.innerHTML = "";
  els.userAvatar.classList.toggle("user-avatar--anon", !!anonymous || !displayName);

  if (anonymous || !displayName) {
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-user-secret";
    icon.setAttribute("aria-hidden", "true");
    els.userAvatar.appendChild(icon);
  } else {
    const initial = document.createElement("span");
    initial.textContent = displayName.trim().charAt(0).toUpperCase();
    els.userAvatar.appendChild(initial);
  }
}

export function updateIdentityDisplay() {
  const dict = I18N[state.currentLang];

  let isDisplayingAnonymous;
  let displayName = "";
  if (els.metricUsername) {
    if (state.sharedView) {
      isDisplayingAnonymous = !state.sharedAuthorLabel;
      displayName = state.sharedAuthorLabel || "";
      els.metricUsername.textContent = state.sharedAuthorLabel || dict.anonymous_label;
    } else if (state.isAnonymous) {
      isDisplayingAnonymous = true;
      els.metricUsername.textContent = dict.anonymous_label;
    } else {
      isDisplayingAnonymous = false;
      displayName = state.username || "";
      els.metricUsername.textContent = state.username || dict.metric_no_user;
    }
  }

  updateAvatar(displayName, isDisplayingAnonymous);

  if (els.metricTimestamp) {
    const ts = state.sharedView ? state.sharedAuthorTimestamp : state.participationTimestamp;
    if (ts) {
      els.metricTimestamp.textContent = relativeTimeString(ts) || formatAbsoluteTimestamp(ts);
      els.metricTimestamp.title = formatAbsoluteTimestamp(ts);
    } else {
      els.metricTimestamp.textContent = dict.metric_no_user;
      els.metricTimestamp.removeAttribute("title");
    }
  }

  // The participation timestamp only means something once a real link
  // exists to attach it to — stay hidden until then. While reading a
  // shared pulse, it reflects the original author's timestamp instead.
  if (els.participationMetric) {
    const showTimestamp = state.sharedView ? !!state.sharedAuthorTimestamp : !!(els.outputLink && els.outputLink.value);
    els.participationMetric.hidden = !showTimestamp;
  }

  if (els.userAvatar) els.userAvatar.classList.toggle("user-avatar--locked", state.sharedView);
  if (els.metricUsername) els.metricUsername.classList.toggle("username-edit--locked", state.sharedView);
  if (els.sharedBadge) els.sharedBadge.hidden = !state.sharedView;
}

/* ---------- Expandable writing workspace ----------
   The #pulseText textarea is the same live DOM node throughout — opening
   the expanded workspace physically relocates it into the modal (so
   value, cursor position, readOnly state, and every existing listener
   keep working untouched), and closing moves it straight back into its
   home slot in the text-input card. */
export function openExpandModal() {
  if (!els.pulseText || !els.expandTextareaSlot || !els.expandModal) return;
  els.expandTextareaSlot.appendChild(els.pulseText);
  els.expandModal.hidden = false;
  updateExpandMetrics();
  window.setTimeout(() => els.pulseText.focus(), 60);
}

export function closeExpandModal() {
  if (!els.pulseText || !els.textareaHome || !els.expandModal) return;
  els.textareaHome.appendChild(els.pulseText);
  els.expandModal.hidden = true;
}

export function updateExpandMetrics() {
  if (!els.pulseText) return;
  const val = els.pulseText.value;
  if (els.expandCharCount) els.expandCharCount.textContent = val.length;
  const words = val.trim().length ? val.trim().split(/\s+/).length : 0;
  if (els.expandWordCount) els.expandWordCount.textContent = words;
  const lines = val.length ? val.split(/\n/).length : 0;
  if (els.expandLineCount) els.expandLineCount.textContent = lines;
}

/* ---------- Live clock ---------- */
export function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}
export function updateClock() {
  const now = new Date();
  const locale = state.currentLang === "ar" ? "ar-DZ" : "en-GB";
  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(now);
  els.liveClock.textContent = formatted;
}

/* ---------- News ticker (powered by the local feed) ----------
   Rather than an external/hardcoded news source, the ticker surfaces the
   user's own local activity — pulses they've created or opened, read
   straight from localStorage via storage.js. */
const TICKER_MAX_ITEMS = 20;

export function startTicker() {
  renderTicker();
  window.setInterval(renderTicker, 25000); // periodically reshuffle
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function renderTicker() {
  if (!els.tickerTrack) return;
  const dict = I18N[state.currentLang];
  const feed = loadFeed().slice(0, TICKER_MAX_ITEMS);

  if (!feed.length) {
    els.tickerTrack.innerHTML = `<span class="ticker__item">${escapeHtml(dict.ticker_empty)}</span>`;
    return;
  }

  const order = shuffle(feed);
  const html = order
    .map((entry) => {
      const wilayaName = state.currentLang === "ar" ? entry.provinceName_ar : entry.provinceName_en;
      const who = entry.isAnonymous || !entry.username ? dict.anonymous_label : entry.username;
      const snippet = (entry.text || "").slice(0, 80);
      return `<span class="ticker__item">[${escapeHtml(wilayaName || "—")}] ${escapeHtml(snippet)} — ${escapeHtml(who)}</span>`;
    })
    .join("");
  // duplicate the sequence so the CSS marquee loop is seamless
  els.tickerTrack.innerHTML = html + html;
}

/* ---------- Province dropdown & details ---------- */
export function populateSelect() {
  if (!state.provinces.length) return;
  const dict = I18N[state.currentLang];
  const prevValue = els.provinceSelect.value;
  els.provinceSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.disabled = true;
  placeholder.selected = !state.currentProvinceId;
  placeholder.textContent = dict.select_placeholder;
  els.provinceSelect.appendChild(placeholder);

  state.provinces.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    const num = String(p.number).padStart(2, "0");
    const primary = localizedProvinceName(p);
    const secondary = state.currentLang === "ar" ? p.name_en : p.name_ar;
    opt.textContent = `${num} — ${primary} (${secondary})`;
    els.provinceSelect.appendChild(opt);
  });

  if (state.currentProvinceId) els.provinceSelect.value = state.currentProvinceId;
  else if (prevValue) els.provinceSelect.value = prevValue;
}

export function updateProvinceDetails() {
  const p = state.currentProvinceId ? state.provinceById.get(state.currentProvinceId) : null;
  if (els.detailId) els.detailId.textContent = p ? p.id : "—";
  if (els.detailName) {
    els.detailName.textContent = p ? localizedProvinceName(p) : "—";
    els.detailName.setAttribute("dir", state.currentLang === "ar" ? "rtl" : "ltr");
  }
}

/* ---------- Smart hashtags ---------- */
export function renderTagChips() {
  if (!els.tagsRow) return;
  els.tagsRow.innerHTML = "";

  if (els.tagsInputRow) els.tagsInputRow.hidden = state.sharedView;

  if (state.sharedView) {
    state.sharedTags.forEach((id) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip active";
      chip.textContent = `#${tagLabel(id)}`;
      els.tagsRow.appendChild(chip);
    });
    return;
  }

  // The pinned, always-on default tag — shown first, never removable.
  const pinned = document.createElement("span");
  pinned.className = "tag-chip tag-chip--pinned";
  const pinnedIcon = document.createElement("i");
  pinnedIcon.className = "fa-solid fa-thumbtack";
  pinnedIcon.setAttribute("aria-hidden", "true");
  pinned.appendChild(pinnedIcon);
  pinned.appendChild(document.createTextNode(`#${tagLabel(DEFAULT_TAG)}`));
  els.tagsRow.appendChild(pinned);

  TAGS.forEach((tagDef) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "tag-chip" + (state.selectedTags.includes(tagDef.id) ? " active" : "");
    chip.dataset.tag = tagDef.id;
    chip.textContent = `#${tagLabel(tagDef.id)}`;
    els.tagsRow.appendChild(chip);
  });

  // Any selected tag that isn't in the preset catalog (and isn't the
  // pinned default) was typed in by the user via the custom tag input —
  // render it as its own chip with a dedicated remove control.
  const catalogIds = TAGS.map((t) => t.id);
  state.selectedTags
    .filter((id) => id !== DEFAULT_TAG && !catalogIds.includes(id))
    .forEach((id) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip tag-chip--custom";

      const label = document.createElement("span");
      label.textContent = `#${id}`;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "tag-chip__remove";
      removeBtn.setAttribute("aria-label", "Remove tag");
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-xmark";
      icon.setAttribute("aria-hidden", "true");
      removeBtn.appendChild(icon);
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.selectedTags = state.selectedTags.filter((t) => t !== id);
        renderTagChips();
        if (state.onTagsChanged) state.onTagsChanged();
      });

      chip.appendChild(label);
      chip.appendChild(removeBtn);
      els.tagsRow.appendChild(chip);
    });
}

// Sanitizes free-form input into a compact, URL-safe tag id (letters,
// numbers, dashes/underscores only). Returns "" if nothing usable remains.
export function sanitizeTagInput(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_-]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 20);
}

/* ---------- Toast notifications ---------- */
export function showToast(message, opts = {}) {
  if (!els.toastContainer || !message) return;
  const toast = document.createElement("div");
  toast.className = "toast" + (opts.variant ? ` toast--${opts.variant}` : "");

  const icon = document.createElement("i");
  icon.className = `fa-solid ${opts.icon || "fa-circle-check"}`;
  icon.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  els.toastContainer.appendChild(toast);

  // Force a reflow so the enter transition actually plays.
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 350);
  }, opts.duration || 2600);
}

/* ---------- Local feed modal ---------- */
let feedFilter = "all";
let feedSearchTerm = "";
let feedClearArmed = false;

export function openFeedModal() {
  els.feedModal.hidden = false;
  renderFeedList();
}
export function closeFeedModal() {
  els.feedModal.hidden = true;
}

export function setFeedSearchTerm(term) {
  feedSearchTerm = term.trim().toLowerCase();
  renderFeedList();
}

export function setFeedFilter(filter, tabEl) {
  feedFilter = filter;
  els.feedFilterTabs.forEach((t) => t.classList.toggle("active", t === tabEl));
  renderFeedList();
}

export function handleFeedClearClick() {
  const dict = I18N[state.currentLang];
  if (!feedClearArmed) {
    feedClearArmed = true;
    els.feedClearBtn.classList.add("confirming");
    els.feedClearBtn.textContent = dict.feed_clear_confirm;
    window.setTimeout(() => {
      feedClearArmed = false;
      els.feedClearBtn.classList.remove("confirming");
      els.feedClearBtn.textContent = dict.feed_clear;
    }, 3000);
    return;
  }
  feedClearArmed = false;
  els.feedClearBtn.classList.remove("confirming");
  els.feedClearBtn.textContent = dict.feed_clear;

  clearFeedStorage();
  showToast(dict.feed_cleared_toast, { icon: "fa-trash" });
  renderFeedList();
  renderTicker();
}

function feedEntryWilayaName(entry) {
  return pickLang(entry.provinceName_en, entry.provinceName_ar);
}

export function renderFeedList() {
  if (!els.feedList) return;
  const dict = I18N[state.currentLang];
  const feed = loadFeed();

  const filtered = feed.filter((entry) => {
    if (feedFilter === "mine" && entry.type !== "created") return false;
    if (feedFilter === "viewed" && entry.type !== "viewed") return false;
    if (feedSearchTerm) {
      const wilayaName = feedEntryWilayaName(entry);
      const tagText = (entry.tags || []).map((id) => tagLabel(id)).join(" ");
      const haystack = `${entry.text || ""} ${wilayaName || ""} ${entry.username || ""} ${tagText}`.toLowerCase();
      if (!haystack.includes(feedSearchTerm)) return false;
    }
    return true;
  });

  els.feedList.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "feed-empty";
    empty.textContent = feed.length ? dict.feed_empty_filtered : dict.feed_empty;
    els.feedList.appendChild(empty);
    return;
  }

  filtered.forEach((entry) => els.feedList.appendChild(buildFeedItemElement(entry)));
}

function buildFeedItemElement(entry) {
  const dict = I18N[state.currentLang];
  const item = document.createElement("div");
  item.className = "feed-item";
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");

  const body = document.createElement("div");
  body.className = "feed-item__body";

  const top = document.createElement("div");
  top.className = "feed-item__top";

  const badge = document.createElement("span");
  badge.className = "feed-item__badge" + (entry.type === "viewed" ? " feed-item__badge--viewed" : "");
  badge.textContent = entry.type === "viewed" ? dict.feed_badge_viewed : dict.feed_badge_created;

  const wilaya = document.createElement("span");
  wilaya.className = "feed-item__wilaya";
  wilaya.textContent = feedEntryWilayaName(entry) || "—";

  top.appendChild(badge);
  top.appendChild(wilaya);

  const text = document.createElement("p");
  text.className = "feed-item__text";
  text.textContent = entry.text || "";

  body.appendChild(top);
  body.appendChild(text);

  if (entry.tags && entry.tags.length) {
    const tagsRow = document.createElement("div");
    tagsRow.className = "feed-item__tags";
    entry.tags.forEach((id) => {
      const tagChip = document.createElement("span");
      tagChip.className = "feed-item__tag";
      tagChip.textContent = `#${tagLabel(id)}`;
      tagsRow.appendChild(tagChip);
    });
    body.appendChild(tagsRow);
  }

  const meta = document.createElement("div");
  meta.className = "feed-item__meta";
  const who = entry.isAnonymous || !entry.username ? dict.anonymous_label : entry.username;
  const metaIcon = entry.isAnonymous || !entry.username ? "fa-user-secret" : "fa-user";
  meta.innerHTML = `<i class="fa-solid ${metaIcon}" aria-hidden="true"></i>`;
  meta.appendChild(document.createTextNode(` ${who} · `));
  const timeSpan = document.createElement("span");
  timeSpan.textContent = relativeTimeString(entry.timestamp) || "";
  meta.appendChild(timeSpan);

  body.appendChild(meta);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "feed-item__delete";
  deleteBtn.setAttribute("aria-label", dict.feed_deleted_toast);
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash" aria-hidden="true"></i>`;
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (deleteFeedEntry(entry.id)) {
      showToast(dict.feed_deleted_toast, { icon: "fa-trash", variant: "warn" });
      renderFeedList();
      renderTicker();
    }
  });

  const navigate = () => {
    window.location.href = entry.url;
  };
  item.addEventListener("click", navigate);
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate();
    }
  });

  item.appendChild(body);
  item.appendChild(deleteBtn);
  return item;
}

/* ---------- Stepped multi-section scroll (floating icons) ---------- */
// Down sequence (6 stops): dropdown -> map -> text input -> output -> about -> footer.
function getDownSteps() {
  return [
    $("#provinceSection"),
    $("#mapSection"),
    $("#textSection"),
    $("#outputSection"),
    $("#about"),
    $("#footerSection")
  ].filter(Boolean);
}

// Up sequence (5 sections, then a 6th step that goes to the very top of the page).
function getUpSteps() {
  return [
    $("#footerSection"),
    $("#about"),
    $("#outputSection"),
    $("#textSection"),
    $("#mapSection")
  ].filter(Boolean);
}

let scrollDownIndex = 0;
let scrollUpIndex = 0;

export function scrollStepDown() {
  const steps = getDownSteps();
  if (!steps.length) return;
  steps[scrollDownIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  scrollDownIndex = Math.min(scrollDownIndex + 1, steps.length - 1);
}

export function scrollStepUp() {
  const steps = getUpSteps();
  if (scrollUpIndex < steps.length) {
    steps[scrollUpIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    scrollUpIndex = Math.min(scrollUpIndex + 1, steps.length);
  } else {
    // Final (6th) stop: the very top of the page (main header title).
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* ---------- Ambient particle background ---------- */
export function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles = [];
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(24, Math.min(70, Math.floor((w * h) / 22000)));
    particles = Array.from({ length: count }, () => makeParticle());
  }

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: 0.25 + Math.random() * 0.4
    };
  }

  function getColor() {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--particle-color").trim() || "76,149,108";
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const color = getColor();
    const linkDist = 140;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x, dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.strokeStyle = `rgba(${color}, ${0.12 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.a})`;
      ctx.fill();

      if (!reduceMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
    });

    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}
