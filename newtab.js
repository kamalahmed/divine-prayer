import verses from "./verses.js";
import * as adhan from "./vendor/adhan.esm.min.js";

const WALLPAPER_COUNT = 19;
const STORAGE_KEYS = {
  wallpaper: "wallpaper",
  verseIndex: "verseIndex",
  timeFormat: "timeFormat",
  favorites: "favorites",
  favoritesOnly: "favoritesOnly",
  prayer: "prayer",
};

// ── Storage adapter (chrome.storage.local with localStorage fallback) ──────
const storage = {
  available: typeof chrome !== "undefined" && chrome.storage?.local,
  async get(key, fallback) {
    if (this.available) {
      const result = await chrome.storage.local.get(key);
      return result[key] ?? fallback;
    }
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try { return JSON.parse(raw); } catch { return raw; }
  },
  async set(key, value) {
    if (this.available) {
      await chrome.storage.local.set({ [key]: value });
      return;
    }
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  },
};

async function migrateLegacyStorage() {
  if (!storage.available) return;
  const migrated = await chrome.storage.local.get("__migrated_v1_1");
  if (migrated.__migrated_v1_1) return;
  for (const key of [STORAGE_KEYS.wallpaper, STORAGE_KEYS.verseIndex, STORAGE_KEYS.timeFormat]) {
    const legacy = localStorage.getItem(key);
    if (legacy !== null) await chrome.storage.local.set({ [key]: legacy });
  }
  await chrome.storage.local.set({ __migrated_v1_1: true });
}

// ── Helpers ────────────────────────────────────────────────────────────────
const wrap = (n, len) => ((n % len) + len) % len;

function safeIndex(raw, len) {
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? wrap(parsed, len) : 0;
}

function pickRandom(arr, exclude) {
  if (arr.length <= 1) return arr[0];
  let pick;
  do {
    pick = arr[crypto.getRandomValues(new Uint32Array(1))[0] % arr.length];
  } while (pick === exclude);
  return pick;
}

// Stable id derived from Arabic text so favorites survive index reordering.
function verseId(v) {
  let h = 0;
  for (let i = 0; i < v.ar.length; i++) h = ((h << 5) - h + v.ar.charCodeAt(i)) | 0;
  return h.toString(36);
}

const wallpapers = Array.from(
  { length: WALLPAPER_COUNT },
  (_, i) => `wallpapers/wallpaper${i + 1}.jpg`,
);

document.addEventListener("DOMContentLoaded", async () => {
  await migrateLegacyStorage();

  const $ = (id) => document.getElementById(id);

  // Verse + nav
  const verseEl = $("verse"), verseEnEl = $("verse-en"), verseSourceEl = $("verse-source");
  const verseCounterEl = $("verse-counter");
  const prevBtn = $("prev-verse"), nextBtn = $("next-verse");
  const favBtn = $("favorite-verse"), copyBtn = $("copy-verse");

  // Clock + dates
  const clockEl = $("clock"), dateEl = $("date"), hijriEl = $("hijri-date");

  // Settings
  const openSettingsBtn = $("open-settings"), closeSettingsBtn = $("close-settings");
  const settingsPanel = $("settings-panel");
  const timeFormatBtn = $("time-format");
  const wallpaperSelect = $("wallpaper-selector"), changeWallpaperBtn = $("change-wallpaper");
  const favoritesOnlyEl = $("favorites-only"), favoritesCountEl = $("favorites-count");

  // Prayer
  const prayerWidget = $("prayer-widget");
  const nextPrayerName = $("next-prayer-name"), nextPrayerTime = $("next-prayer-time"), nextPrayerCountdown = $("next-prayer-countdown");
  const prayerEnable = $("prayer-enable"), prayerConfig = $("prayer-config");
  const prayerLat = $("prayer-lat"), prayerLon = $("prayer-lon");
  const prayerMethod = $("prayer-method"), prayerMadhab = $("prayer-madhab");
  const prayerTableBody = document.querySelector("#prayer-table tbody");

  // ── Wallpapers ───────────────────────────────────────────────────────────
  const fragment = document.createDocumentFragment();
  wallpapers.forEach((url, i) => {
    const opt = document.createElement("option");
    opt.value = url;
    opt.textContent = `Wallpaper ${i + 1}`;
    fragment.appendChild(opt);
  });
  wallpaperSelect.appendChild(fragment);

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
    setWallpaper(pickRandom(wallpapers));
  }

  changeWallpaperBtn.addEventListener("click", () => setWallpaper(pickRandom(wallpapers, currentWallpaper)));
  wallpaperSelect.addEventListener("change", () => setWallpaper(wallpaperSelect.value));

  // ── Favorites ────────────────────────────────────────────────────────────
  const favSet = new Set(await storage.get(STORAGE_KEYS.favorites, []));
  let favoritesOnly = !!(await storage.get(STORAGE_KEYS.favoritesOnly, false));
  favoritesOnlyEl.checked = favoritesOnly;

  function visibleVerses() {
    if (!favoritesOnly) return verses;
    const filtered = verses.filter((v) => favSet.has(verseId(v)));
    return filtered.length ? filtered : verses;
  }

  function updateFavoritesCount() {
    favoritesCountEl.textContent = String(favSet.size);
  }
  updateFavoritesCount();

  // ── Verses ───────────────────────────────────────────────────────────────
  if (!Array.isArray(verses) || verses.length === 0) {
    verseEl.textContent = "";
    verseEnEl.textContent = "No verses available.";
    return;
  }

  let pool = visibleVerses();
  const savedIndexRaw = await storage.get(STORAGE_KEYS.verseIndex, "0");
  let verseIndex = wrap(safeIndex(savedIndexRaw, pool.length) + 1, pool.length);

  function renderFavorite(v) {
    const isFav = favSet.has(verseId(v));
    favBtn.setAttribute("aria-pressed", String(isFav));
  }

  function showVerse(index, { persist = true } = {}) {
    pool = visibleVerses();
    verseIndex = wrap(index, pool.length);
    const v = pool[verseIndex];
    verseEl.textContent = v.ar;
    verseEnEl.textContent = v.en;
    if (v.source) {
      verseSourceEl.textContent = `— ${v.source}`;
      verseSourceEl.hidden = false;
    } else {
      verseSourceEl.textContent = "";
      verseSourceEl.hidden = true;
    }
    verseCounterEl.textContent = `${verseIndex + 1} / ${pool.length}`;
    renderFavorite(v);
    if (persist) storage.set(STORAGE_KEYS.verseIndex, verseIndex);
  }

  showVerse(verseIndex);

  prevBtn.addEventListener("click", () => showVerse(verseIndex - 1));
  nextBtn.addEventListener("click", () => showVerse(verseIndex + 1));

  function toggleFavorite() {
    const v = pool[verseIndex];
    const id = verseId(v);
    if (favSet.has(id)) favSet.delete(id);
    else favSet.add(id);
    storage.set(STORAGE_KEYS.favorites, [...favSet]);
    updateFavoritesCount();
    renderFavorite(v);
  }
  favBtn.addEventListener("click", toggleFavorite);

  async function copyCurrentVerse() {
    const v = pool[verseIndex];
    const text = `${v.ar}\n${v.en}${v.source ? `\n— ${v.source}` : ""}`;
    try {
      await navigator.clipboard.writeText(text);
      const original = copyBtn.getAttribute("aria-label");
      copyBtn.setAttribute("aria-label", "Copied!");
      copyBtn.title = "Copied!";
      setTimeout(() => {
        copyBtn.setAttribute("aria-label", original);
        copyBtn.title = "Copy (C)";
      }, 1200);
    } catch {
      // Clipboard API may be unavailable; ignore silently.
    }
  }
  copyBtn.addEventListener("click", copyCurrentVerse);

  favoritesOnlyEl.addEventListener("change", () => {
    favoritesOnly = favoritesOnlyEl.checked;
    storage.set(STORAGE_KEYS.favoritesOnly, favoritesOnly);
    showVerse(0);
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, select, textarea")) return;
    if (e.key === "ArrowLeft") showVerse(verseIndex - 1);
    else if (e.key === "ArrowRight") showVerse(verseIndex + 1);
    else if (e.key === "f" || e.key === "F") toggleFavorite();
    else if (e.key === "c" || e.key === "C") copyCurrentVerse();
    else if (e.key === ",") toggleSettings();
    else if (e.key === "Escape" && settingsPanel.getAttribute("aria-hidden") === "false") toggleSettings(false);
  });

  // ── Time format ──────────────────────────────────────────────────────────
  let use24h = (await storage.get(STORAGE_KEYS.timeFormat, "12h")) === "24h";
  function applyTimeFormatLabel() {
    timeFormatBtn.setAttribute("aria-pressed", String(use24h));
    timeFormatBtn.textContent = use24h ? "24h" : "12h";
  }
  applyTimeFormatLabel();

  timeFormatBtn.addEventListener("click", () => {
    use24h = !use24h;
    applyTimeFormatLabel();
    storage.set(STORAGE_KEYS.timeFormat, use24h ? "24h" : "12h");
    lastTime = "";
    renderClock();
    renderPrayer();
  });

  // ── Clock + Hijri date (Intl built-in, no library) ───────────────────────
  let lastTime = "", lastDate = "", lastHijri = "";
  let clockTimeout = null;

  function renderClock() {
    const now = new Date();
    const time = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: !use24h,
    });
    if (time !== lastTime) { clockEl.textContent = time; lastTime = time; }
    const date = now.toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric",
    });
    if (date !== lastDate) { dateEl.textContent = date; lastDate = date; }
    const hijri = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric", month: "long", year: "numeric",
    }).format(now);
    if (hijri !== lastHijri) { hijriEl.textContent = hijri; lastHijri = hijri; }
    renderPrayer(now);
  }

  function scheduleClock() {
    if (clockTimeout !== null) { clearTimeout(clockTimeout); clockTimeout = null; }
    if (document.hidden) return;
    renderClock();
    const msUntilNextMinute = 60_000 - (Date.now() % 60_000);
    clockTimeout = setTimeout(scheduleClock, msUntilNextMinute);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (clockTimeout !== null) { clearTimeout(clockTimeout); clockTimeout = null; }
    } else {
      scheduleClock();
    }
  });

  // ── Prayer times ─────────────────────────────────────────────────────────
  const PRAYER_LABELS = {
    fajr: "Fajr", sunrise: "Sunrise", dhuhr: "Dhuhr",
    asr: "Asr", maghrib: "Maghrib", isha: "Isha",
  };

  let prayerCfg = await storage.get(STORAGE_KEYS.prayer, {
    enabled: false, lat: "", lon: "",
    method: "MuslimWorldLeague", madhab: "Shafi",
  });

  prayerEnable.checked = !!prayerCfg.enabled;
  prayerLat.value = prayerCfg.lat ?? "";
  prayerLon.value = prayerCfg.lon ?? "";
  prayerMethod.value = prayerCfg.method ?? "MuslimWorldLeague";
  prayerMadhab.value = prayerCfg.madhab ?? "Shafi";
  prayerConfig.hidden = !prayerCfg.enabled;

  function savePrayerCfg() {
    storage.set(STORAGE_KEYS.prayer, prayerCfg);
  }

  function calcPrayerTimes(now = new Date()) {
    const lat = Number.parseFloat(prayerCfg.lat);
    const lon = Number.parseFloat(prayerCfg.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const coords = new adhan.Coordinates(lat, lon);
    const params = adhan.CalculationMethod[prayerCfg.method]
      ? adhan.CalculationMethod[prayerCfg.method]()
      : adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab[prayerCfg.madhab] || adhan.Madhab.Shafi;
    return new adhan.PrayerTimes(coords, now, params);
  }

  function fmtTime(d) {
    return d.toLocaleTimeString(undefined, {
      hour: "numeric", minute: "2-digit", hour12: !use24h,
    });
  }

  function fmtCountdown(targetMs) {
    const diff = Math.max(0, targetMs - Date.now());
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  function renderPrayer(now = new Date()) {
    if (!prayerCfg.enabled) {
      prayerWidget.hidden = true;
      prayerTableBody.innerHTML = "";
      return;
    }
    const pt = calcPrayerTimes(now);
    if (!pt) {
      prayerWidget.hidden = true;
      prayerTableBody.innerHTML = `<tr><td colspan="2">Enter latitude and longitude to enable.</td></tr>`;
      return;
    }
    const order = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
    const current = pt.currentPrayer(now);

    // Update widget with next prayer
    let nextKey = pt.nextPrayer(now);
    let nextDate = nextKey === "none" ? null : pt[nextKey];
    if (!nextDate) {
      // After Isha — next is tomorrow's Fajr
      const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
      const ptTomorrow = calcPrayerTimes(tomorrow);
      if (ptTomorrow) { nextKey = "fajr"; nextDate = ptTomorrow.fajr; }
    }
    if (nextDate) {
      prayerWidget.hidden = false;
      nextPrayerName.textContent = PRAYER_LABELS[nextKey] || nextKey;
      nextPrayerTime.textContent = fmtTime(nextDate);
      nextPrayerCountdown.textContent = `· in ${fmtCountdown(nextDate.getTime())}`;
    } else {
      prayerWidget.hidden = true;
    }

    // Update settings panel table
    const rows = order.map((key) => {
      const isCurrent = key === current ? " class=\"is-current\"" : "";
      return `<tr${isCurrent}><td>${PRAYER_LABELS[key]}</td><td>${fmtTime(pt[key])}</td></tr>`;
    });
    prayerTableBody.innerHTML = rows.join("");
  }

  prayerEnable.addEventListener("change", () => {
    prayerCfg.enabled = prayerEnable.checked;
    prayerConfig.hidden = !prayerCfg.enabled;
    savePrayerCfg();
    renderPrayer();
  });
  for (const [el, key, transform] of [
    [prayerLat, "lat", (v) => v],
    [prayerLon, "lon", (v) => v],
    [prayerMethod, "method", (v) => v],
    [prayerMadhab, "madhab", (v) => v],
  ]) {
    el.addEventListener("change", () => {
      prayerCfg[key] = transform(el.value);
      savePrayerCfg();
      renderPrayer();
    });
  }

  // ── Settings panel ───────────────────────────────────────────────────────
  function toggleSettings(force) {
    const isOpen = settingsPanel.getAttribute("aria-hidden") === "false";
    const open = typeof force === "boolean" ? force : !isOpen;
    settingsPanel.setAttribute("aria-hidden", String(!open));
    openSettingsBtn.setAttribute("aria-expanded", String(open));
    if (open) closeSettingsBtn.focus();
    else openSettingsBtn.focus();
  }
  openSettingsBtn.addEventListener("click", () => toggleSettings());
  closeSettingsBtn.addEventListener("click", () => toggleSettings(false));

  // ── Auto-hide controls when idle ─────────────────────────────────────────
  let idleTimer = null;
  function showControls() {
    document.body.dataset.controlsVisible = "true";
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (settingsPanel.getAttribute("aria-hidden") === "false") return;
      document.body.dataset.controlsVisible = "false";
    }, 3500);
  }
  ["mousemove", "keydown", "touchstart"].forEach((evt) => {
    document.addEventListener(evt, showControls, { passive: true });
  });
  showControls();

  // Kick off
  scheduleClock();
});
