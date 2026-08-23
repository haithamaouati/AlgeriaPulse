/* =========================================================
   Algeria Pulse — Application Entry Point
   Owns the single shared, mutable state object and every event
   binding. Delegates rendering to ui.js, map mechanics to map.js,
   sound to audio.js, and persistence to storage.js — this file is
   the only place that decides *when* those things should happen,
   including the strict link-generation validation gate: a link is
   only produced once a wilaya is selected, the idea has text, and
   at least one hashtag (the pinned default tag always counts) is
   active.
   ========================================================= */

import { I18N, LANGUAGES, DEFAULT_TAG } from "./config.js";
import { playMapBeep, playLockedBeep, playCopyBeep, playSaveBeep } from "./audio.js";
import { initMap, focusProvince, resetMapView } from "./map.js";
import { saveFeedEntry, cacheUsername } from "./storage.js";
import * as ui from "./ui.js";

/* ---------- Shared application state ----------
   A single mutable object, bound once into ui.js via ui.bindState()
   so every render function reads through the same live reference. */
const state = {
  currentLang: "en",
  provinces: [],
  provinceById: new Map(),
  currentProvinceId: null,
  username: null,
  isAnonymous: false,
  participationTimestamp: null,
  sharedView: false,
  sharedAuthorLabel: null,
  sharedAuthorTimestamp: null,
  selectedTags: [DEFAULT_TAG],
  sharedTags: [],
  // Set below, after ui.js is bound — lets ui.js's custom-tag remove
  // button trigger a fresh validation/link-generation pass without
  // importing app.js (which would create a circular dependency).
  onTagsChanged: null
};

async function init() {
  ui.cacheElements();
  ui.bindState(state);
  state.onTagsChanged = generateLink;

  bindStaticEvents();
  ui.applyContentProtections();
  ui.startClock();
  ui.initParticles();

  try {
    await loadProvinces();
    ui.populateSelect();
  } catch (e) {
    console.error("Failed to load data.json", e);
  }

  try {
    await initMap({
      containerEl: ui.els.mapContainer,
      isLocked: () => state.sharedView,
      onSelect: (id) => selectProvince(id)
    });
  } catch (e) {
    console.error("Failed to load algeria.svg", e);
  }

  ui.applyLanguage();
  hydrateFromURL();
  ui.updateLockState();
  resolveIdentity();
  ui.startTicker();

  // Keep the relative "X minutes ago" timestamp in the identity bar live.
  window.setInterval(ui.updateIdentityDisplay, 30000);
}

async function loadProvinces() {
  const res = await fetch("data.json");
  const json = await res.json();
  state.provinces = json.provinces;
  state.provinceById = new Map(state.provinces.map((p) => [p.id, p]));
}

/* ---------- Static event bindings ---------- */
function bindStaticEvents() {
  ui.els.langToggle.addEventListener("click", () => {
    const nextIndex = (LANGUAGES.indexOf(state.currentLang) + 1) % LANGUAGES.length;
    state.currentLang = LANGUAGES[nextIndex];
    ui.applyLanguage();
  });

  ui.els.themeToggle.addEventListener("click", ui.toggleTheme);
  ui.els.noticeToggle.addEventListener("click", ui.toggleNotice);

  ui.els.usernameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dict = I18N[state.currentLang];
    const val = ui.els.usernameInput.value.trim();
    if (val.length < 2) {
      ui.els.usernameInput.setCustomValidity(dict.modal_error);
      ui.els.usernameInput.reportValidity();
      return;
    }
    ui.els.usernameInput.setCustomValidity("");
    state.username = val;
    state.isAnonymous = false;
    cacheUsername(val);
    if (!state.participationTimestamp) state.participationTimestamp = Date.now();
    ui.hideUsernameModal();
    finalizeIdentity();
  });

  ui.els.usernameAnonymousBtn.addEventListener("click", () => {
    ui.els.usernameInput.setCustomValidity("");
    state.username = null;
    state.isAnonymous = true;
    if (!state.participationTimestamp) state.participationTimestamp = Date.now();
    ui.hideUsernameModal();
    finalizeIdentity();
  });

  // Clicking the avatar or the username text itself opens the edit
  // flow — no separate pencil icon. Both are inert while reading a
  // shared pulse (there's no "your" identity to edit yet).
  const openUsernameEdit = () => {
    if (state.sharedView) return;
    ui.showUsernameModal({ editing: true });
  };
  ui.els.userAvatar.addEventListener("click", openUsernameEdit);
  ui.els.metricUsername.addEventListener("click", openUsernameEdit);

  ui.els.newIdeaFab.addEventListener("click", () => {
    startNewIdea();
    if (ui.els.textareaHome) ui.els.textareaHome.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  ui.els.provinceSelectWrap.addEventListener("click", () => {
    if (state.sharedView) playLockedBeep();
  });

  ui.els.provinceSelect.addEventListener("change", (e) => {
    if (state.sharedView) {
      e.target.value = state.currentProvinceId || "";
      playLockedBeep();
      return;
    }
    if (e.target.value) {
      playMapBeep();
      selectProvince(e.target.value);
    }
  });

  ui.els.pulseText.addEventListener("input", () => {
    generateLink();
    ui.updateExpandMetrics();
  });

  ui.els.tagsRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".tag-chip");
    if (!chip || chip.disabled) return;
    const tag = chip.dataset.tag;
    if (!tag) return;
    if (state.selectedTags.includes(tag)) {
      state.selectedTags = state.selectedTags.filter((t) => t !== tag);
    } else {
      state.selectedTags.push(tag);
    }
    chip.classList.toggle("active", state.selectedTags.includes(tag));
    generateLink();
  });

  ui.els.addTagBtn.addEventListener("click", addCustomTag);
  ui.els.customTagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomTag();
    }
  });

  ui.els.mapReset.addEventListener("click", resetMapView);

  ui.els.copyBtn.addEventListener("click", copyLink);
  ui.els.copySnippetBtn.addEventListener("click", copySnippet);
  ui.els.shareBtn.addEventListener("click", shareLink);

  ui.els.aboutNavBtn.addEventListener("click", () => {
    ui.els.aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  ui.els.scrollBottomBtn.addEventListener("click", ui.scrollStepDown);
  ui.els.scrollTopBtn.addEventListener("click", ui.scrollStepUp);

  ui.els.feedNavBtn.addEventListener("click", ui.openFeedModal);
  ui.els.feedCloseBtn.addEventListener("click", ui.closeFeedModal);
  ui.els.feedModal.addEventListener("click", (e) => {
    if (e.target === ui.els.feedModal) ui.closeFeedModal();
  });
  ui.els.feedSearch.addEventListener("input", (e) => ui.setFeedSearchTerm(e.target.value));
  ui.els.feedFilterTabs.forEach((tab) => {
    tab.addEventListener("click", () => ui.setFeedFilter(tab.dataset.filter, tab));
  });
  ui.els.feedClearBtn.addEventListener("click", ui.handleFeedClearClick);

  ui.els.expandTextBtn.addEventListener("click", ui.openExpandModal);
  ui.els.expandCloseBtn.addEventListener("click", ui.closeExpandModal);
  ui.els.expandModal.addEventListener("click", (e) => {
    if (e.target === ui.els.expandModal) ui.closeExpandModal();
  });
}

function addCustomTag() {
  const id = ui.sanitizeTagInput(ui.els.customTagInput.value);
  ui.els.customTagInput.value = "";
  if (!id) return;
  if (!state.selectedTags.includes(id)) {
    state.selectedTags.push(id);
    ui.renderTagChips();
    generateLink();
  }
  ui.els.customTagInput.focus();
}

/* ---------- Province selection ---------- */
function selectProvince(id) {
  const province = state.provinceById.get(id);
  if (!province) return;

  focusProvince(id);
  state.currentProvinceId = id;
  ui.els.provinceSelect.value = id;

  ui.updateProvinceDetails();
  generateLink();
}

/* ---------- Username identity (prompt modal + shared-link hydration) ---------- */
function resolveIdentity() {
  // Reading someone else's shared pulse: never prompt on load. The modal
  // only appears once the visitor chooses to start their own new idea.
  if (state.sharedView) {
    ui.updateIdentityDisplay();
    return;
  }
  ui.showUsernameModal();
}

function startNewIdea() {
  if (ui.els.expandModal && !ui.els.expandModal.hidden) ui.closeExpandModal();

  state.sharedView = false;
  state.sharedAuthorLabel = null;
  state.sharedAuthorTimestamp = null;
  state.sharedTags = [];
  state.selectedTags = [DEFAULT_TAG];

  ui.els.pulseText.readOnly = false;
  ui.els.pulseText.value = "";

  state.username = null;
  state.isAnonymous = false;
  state.participationTimestamp = null;

  ui.updateLockState();
  ui.updateIdentityDisplay();
  ui.renderTagChips();
  generateLink();
  ui.showUsernameModal();
}

function finalizeIdentity() {
  ui.updateIdentityDisplay();
  generateLink();
}

/* ---------- Link generation ---------- */
function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}

// Strict validation gate: a shareable link is only produced once every
// mandatory field is complete — a wilaya is selected, the idea has text,
// and at least one hashtag is active (the pinned default tag alone
// already satisfies that last condition).
function generateLink() {
  const text = ui.els.pulseText.value.trim();
  const hasIdentity = state.isAnonymous || !!state.username;
  const hasTag = state.selectedTags.length > 0;

  if (state.sharedView || !state.currentProvinceId || !text || !hasIdentity || !hasTag) {
    ui.els.outputLink.value = "";
    ui.updateIdentityDisplay();
    return;
  }

  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  if (!state.isAnonymous) url.searchParams.set("u", state.username);
  url.searchParams.set("t", (state.participationTimestamp || Date.now()).toString());
  url.searchParams.set("p", state.currentProvinceId);
  if (state.selectedTags.length) url.searchParams.set("tags", state.selectedTags.join(","));
  url.searchParams.set("d", b64EncodeUnicode(text));
  ui.els.outputLink.value = url.toString();
  ui.updateIdentityDisplay();

  const ts = state.participationTimestamp || Date.now();
  const p = state.provinceById.get(state.currentProvinceId);
  const { isNew } = saveFeedEntry({
    id: `created:${state.currentProvinceId}:${state.participationTimestamp}`,
    type: "created",
    url: ui.els.outputLink.value,
    provinceId: state.currentProvinceId,
    provinceName_en: p ? p.name_en : "",
    provinceName_ar: p ? p.name_ar : "",
    text,
    username: state.isAnonymous ? null : state.username,
    isAnonymous: state.isAnonymous,
    tags: state.selectedTags.slice(),
    timestamp: ts
  });

  if (isNew) {
    playSaveBeep();
    ui.showToast(I18N[state.currentLang].feed_saved_toast, { icon: "fa-bookmark", variant: "save" });
    if (!ui.els.feedModal.hidden) ui.renderFeedList();
    ui.renderTicker();
  }
}

function hydrateFromURL() {
  const params = new URLSearchParams(window.location.search);
  const p = params.get("p");
  const u = params.get("u");
  const t = params.get("t");
  const d = params.get("d");
  const tagsParam = params.get("tags");

  if (p && state.provinceById.has(p)) {
    selectProvince(p);
  }

  if (d) {
    try {
      ui.els.pulseText.value = b64DecodeUnicode(d);
      ui.els.pulseText.readOnly = true;
      state.sharedView = true;
      state.sharedAuthorLabel = u ? decodeURIComponent(u) : null;
      state.sharedAuthorTimestamp = t ? Number(t) : null;
      state.sharedTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
      ui.renderTagChips();

      const province = p ? state.provinceById.get(p) : null;
      const { isNew } = saveFeedEntry({
        id: `viewed:${p || "unknown"}:${state.sharedAuthorTimestamp || "0"}`,
        type: "viewed",
        url: window.location.href,
        provinceId: p || null,
        provinceName_en: province ? province.name_en : "",
        provinceName_ar: province ? province.name_ar : "",
        text: ui.els.pulseText.value,
        username: state.sharedAuthorLabel,
        isAnonymous: !state.sharedAuthorLabel,
        tags: state.sharedTags.slice(),
        timestamp: state.sharedAuthorTimestamp || Date.now()
      });
      if (isNew) {
        playSaveBeep();
        ui.showToast(I18N[state.currentLang].feed_saved_toast, { icon: "fa-bookmark", variant: "save" });
        ui.renderTicker();
      }
    } catch (e) {
      console.warn("Could not decode shared text", e);
    }
  }
}

/* ---------- Copy / Share ---------- */
async function copyLink() {
  const dict = I18N[state.currentLang];
  if (!ui.els.outputLink.value) {
    ui.showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
    return;
  }
  try {
    await navigator.clipboard.writeText(ui.els.outputLink.value);
    playCopyBeep();
    ui.showToast(dict.copied, { icon: "fa-circle-check" });
  } catch (e) {
    ui.els.outputLink.select();
    try {
      document.execCommand("copy");
      playCopyBeep();
      ui.showToast(dict.copied, { icon: "fa-circle-check" });
    } catch (err) {
      ui.showToast(dict.copy_failed, { variant: "warn", icon: "fa-triangle-exclamation" });
    }
  }
}

// "[Algeria Pulse - Wilaya Name] Idea/News: ... #tags | By: Username | Link: ..."
function buildSnippet() {
  if (!ui.els.outputLink.value) return null;
  const dict = I18N[state.currentLang];
  const p = state.currentProvinceId ? state.provinceById.get(state.currentProvinceId) : null;
  const wilayaName = p ? ui.localizedProvinceName(p) : "";
  const text = ui.els.pulseText.value.trim();
  const who = state.isAnonymous ? dict.anonymous_label : (state.username || "");
  const tagsText = state.selectedTags.length
    ? ` ${state.selectedTags.map((id) => `#${ui.tagLabel(id)}`).join(" ")}`
    : "";
  return `[${dict.app_title} - ${wilayaName}] ${dict.write_label}: ${text}${tagsText} | ${dict.metric_user_label}: ${who} | ${dict.output_label}: ${ui.els.outputLink.value}`;
}

async function copySnippet() {
  const dict = I18N[state.currentLang];
  const snippet = buildSnippet();
  if (!snippet) {
    ui.showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
    return;
  }
  try {
    await navigator.clipboard.writeText(snippet);
    playCopyBeep();
    ui.showToast(dict.snippet_copied, { icon: "fa-hashtag" });
  } catch (e) {
    try {
      const temp = document.createElement("textarea");
      temp.value = snippet;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      playCopyBeep();
      ui.showToast(dict.snippet_copied, { icon: "fa-hashtag" });
    } catch (err) {
      ui.showToast(dict.copy_failed, { variant: "warn", icon: "fa-triangle-exclamation" });
    }
  }
}

async function shareLink() {
  const dict = I18N[state.currentLang];
  if (!ui.els.outputLink.value) {
    ui.showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
    return;
  }
  if (navigator.share) {
    try {
      const p = state.currentProvinceId ? state.provinceById.get(state.currentProvinceId) : null;
      const wilayaName = p ? ui.localizedProvinceName(p) : "";
      const text = ui.els.pulseText.value.trim();
      const tagsText = state.selectedTags.length
        ? ` ${state.selectedTags.map((id) => `#${ui.tagLabel(id)}`).join(" ")}`
        : "";
      const shareText = `[${dict.app_title} - ${wilayaName}] ${text}${tagsText}`;
      await navigator.share({ title: dict.app_title, text: shareText, url: ui.els.outputLink.value });
      playCopyBeep();
    } catch (e) {
      /* user cancelled — no-op */
    }
  } else {
    copyLink();
  }
}

document.addEventListener("DOMContentLoaded", init);
