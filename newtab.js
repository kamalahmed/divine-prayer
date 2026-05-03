import verses from "./verses.js";

const WALLPAPER_COUNT = 19;
const STORAGE_KEYS = {
  wallpaper: "wallpaper",
  verseIndex: "verseIndex",
  timeFormat: "timeFormat",
};

// Thin wrapper over chrome.storage.local with a one-time migration from the
// pre-1.1 localStorage keys. Falls back to localStorage if chrome.storage is
// unavailable (e.g. when this page is opened directly during development).
const storage = {
  available: typeof chrome !== "undefined" && chrome.storage?.local,
  async get(key, fallback) {
    if (this.available) {
      const result = await chrome.storage.local.get(key);
      return result[key] ?? fallback;
    }
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw;
  },
  async set(key, value) {
    if (this.available) {
      await chrome.storage.local.set({ [key]: value });
      return;
    }
    localStorage.setItem(key, String(value));
  },
};

async function migrateLegacyStorage() {
  if (!storage.available) return;
  const migrated = await chrome.storage.local.get("__migrated_v1_1");
  if (migrated.__migrated_v1_1) return;
  for (const key of Object.values(STORAGE_KEYS)) {
    const legacy = localStorage.getItem(key);
    if (legacy !== null) await chrome.storage.local.set({ [key]: legacy });
  }
  await chrome.storage.local.set({ __migrated_v1_1: true });
}

const wallpapers = Array.from(
  { length: WALLPAPER_COUNT },
  (_, i) => `wallpapers/wallpaper${i + 1}.jpg`,
);

const wrap = (n, len) => ((n % len) + len) % len;

function safeIndex(raw, len) {
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? wrap(parsed, len) : 0;
}

function pickRandomWallpaper(exclude) {
  if (wallpapers.length <= 1) return wallpapers[0];
  let url;
  do {
    const i = crypto.getRandomValues(new Uint32Array(1))[0] % wallpapers.length;
    url = wallpapers[i];
  } while (url === exclude);
  return url;
}

document.addEventListener("DOMContentLoaded", async () => {
  await migrateLegacyStorage();

  const verseEl = document.getElementById("verse");
  const verseEnEl = document.getElementById("verse-en");
  const verseSourceEl = document.getElementById("verse-source");
  const verseCounterEl = document.getElementById("verse-counter");
  const prevBtn = document.getElementById("prev-verse");
  const nextBtn = document.getElementById("next-verse");
  const changeWallpaperBtn = document.getElementById("change-wallpaper");
  const wallpaperSelect = document.getElementById("wallpaper-selector");
  const timeFormatBtn = document.getElementById("time-format");
  const clockEl = document.getElementById("clock");
  const dateEl = document.getElementById("date");

  // ── Wallpapers ────────────────────────────────────────────────────────────
  const optionsFragment = document.createDocumentFragment();
  wallpapers.forEach((url, i) => {
    const opt = document.createElement("option");
    opt.value = url;
    opt.textContent = `Wallpaper ${i + 1}`;
    optionsFragment.appendChild(opt);
  });
  wallpaperSelect.appendChild(optionsFragment);

  let currentWallpaper = null;
  function setWallpaper(url, { persist = true } = {}) {
    currentWallpaper = url;
    document.body.style.backgroundImage = `url("${encodeURI(url)}")`;
    wallpaperSelect.value = url;
    if (persist) storage.set(STORAGE_KEYS.wallpaper, url);
  }

  const savedWallpaper = await storage.get(STORAGE_KEYS.wallpaper, null);
  if (savedWallpaper && wallpapers.includes(savedWallpaper)) {
    setWallpaper(savedWallpaper, { persist: false });
  } else {
    setWallpaper(pickRandomWallpaper());
  }

  changeWallpaperBtn.addEventListener("click", () => {
    setWallpaper(pickRandomWallpaper(currentWallpaper));
  });
  wallpaperSelect.addEventListener("change", () => {
    setWallpaper(wallpaperSelect.value);
  });

  // ── Verses ────────────────────────────────────────────────────────────────
  if (!Array.isArray(verses) || verses.length === 0) {
    verseEl.textContent = "";
    verseEnEl.textContent = "No verses available.";
    return;
  }

  const savedIndexRaw = await storage.get(STORAGE_KEYS.verseIndex, "0");
  // Stored value is the index of the LAST shown verse; advance by one on each
  // new tab so the user sees a fresh verse.
  let verseIndex = wrap(safeIndex(savedIndexRaw, verses.length) + 1, verses.length);

  function showVerse(index, { persist = true } = {}) {
    verseIndex = wrap(index, verses.length);
    const v = verses[verseIndex];
    verseEl.textContent = v.ar;
    verseEnEl.textContent = v.en;
    if (v.source) {
      verseSourceEl.textContent = `— ${v.source}`;
      verseSourceEl.hidden = false;
    } else {
      verseSourceEl.textContent = "";
      verseSourceEl.hidden = true;
    }
    verseCounterEl.textContent = `${verseIndex + 1} / ${verses.length}`;
    if (persist) storage.set(STORAGE_KEYS.verseIndex, verseIndex);
  }

  showVerse(verseIndex);

  prevBtn.addEventListener("click", () => showVerse(verseIndex - 1));
  nextBtn.addEventListener("click", () => showVerse(verseIndex + 1));
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, select, textarea")) return;
    if (e.key === "ArrowLeft") showVerse(verseIndex - 1);
    else if (e.key === "ArrowRight") showVerse(verseIndex + 1);
  });

  // ── Clock ─────────────────────────────────────────────────────────────────
  let use24h = (await storage.get(STORAGE_KEYS.timeFormat, "12h")) === "24h";
  timeFormatBtn.setAttribute("aria-pressed", String(use24h));
  timeFormatBtn.textContent = use24h ? "12h" : "24h";

  let lastTime = "";
  let lastDate = "";
  let clockTimeout = null;

  function renderClock() {
    const now = new Date();
    const time = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: !use24h,
    });
    if (time !== lastTime) {
      clockEl.textContent = time;
      lastTime = time;
    }
    const date = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (date !== lastDate) {
      dateEl.textContent = date;
      lastDate = date;
    }
  }

  function scheduleClock() {
    cancelClock();
    if (document.hidden) return;
    renderClock();
    const msUntilNextMinute = 60_000 - (Date.now() % 60_000);
    clockTimeout = setTimeout(scheduleClock, msUntilNextMinute);
  }

  function cancelClock() {
    if (clockTimeout !== null) {
      clearTimeout(clockTimeout);
      clockTimeout = null;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelClock();
    else scheduleClock();
  });

  timeFormatBtn.addEventListener("click", () => {
    use24h = !use24h;
    timeFormatBtn.setAttribute("aria-pressed", String(use24h));
    timeFormatBtn.textContent = use24h ? "12h" : "24h";
    storage.set(STORAGE_KEYS.timeFormat, use24h ? "24h" : "12h");
    lastTime = "";
    renderClock();
  });

  scheduleClock();
});
