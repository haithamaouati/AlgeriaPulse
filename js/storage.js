/* =========================================================
   Algeria Pulse — LocalStorage Manager
   A pure data layer: every function here only reads/writes
   localStorage and returns data. It never touches the DOM, never
   plays a sound, and never shows a toast — callers (app.js/ui.js)
   decide what UI side effects a given change deserves.

   Every read/write is wrapped in try/catch so the app keeps working
   even where storage is unavailable or blocked (private browsing,
   restricted iframes, etc.) — these functions just quietly no-op.
   ========================================================= */

const FEED_STORAGE_KEY = "algeriaPulse:feed";
const FEED_MAX_ENTRIES = 100;
const USERNAME_STORAGE_KEY = "algeriaPulse:username";

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------- Persistent username caching ----------
   Remembers the last name a visitor submitted (named, not anonymous) so
   returning users don't have to retype it every session. The modal still
   always appears — this only prefills it — and choosing Anonymous never
   touches or clears the cached name. */
export function loadCachedUsername() {
  return safeStorageGet(USERNAME_STORAGE_KEY) || "";
}

export function cacheUsername(name) {
  if (name) safeStorageSet(USERNAME_STORAGE_KEY, name);
}

/* ---------- Local feed / archive ---------- */
export function loadFeed() {
  const raw = safeStorageGet(FEED_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function persistFeed(list) {
  return safeStorageSet(FEED_STORAGE_KEY, JSON.stringify(list.slice(0, FEED_MAX_ENTRIES)));
}

// Upserts by stable id: repeated calls while drafting (every keystroke)
// update the same entry in place rather than spamming new rows. Returns
// { isNew, entry } so the caller can decide whether a save toast/beep and
// a feed/ticker re-render are warranted (only on true first insert).
export function saveFeedEntry(entry) {
  const feed = loadFeed();
  const existingIndex = feed.findIndex((e) => e.id === entry.id);
  const isNew = existingIndex === -1;
  const savedAt = isNew ? Date.now() : feed[existingIndex].savedAt;
  const record = { ...entry, savedAt };

  if (isNew) {
    feed.unshift(record);
  } else {
    feed[existingIndex] = record;
  }

  const ok = persistFeed(feed);
  return { isNew: ok && isNew, entry: record };
}

// Returns true if the entry existed and the feed was successfully
// persisted without it.
export function deleteFeedEntry(id) {
  const feed = loadFeed();
  const filtered = feed.filter((e) => e.id !== id);
  if (filtered.length === feed.length) return false;
  return persistFeed(filtered);
}

export function clearFeedStorage() {
  try {
    window.localStorage.removeItem(FEED_STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}
