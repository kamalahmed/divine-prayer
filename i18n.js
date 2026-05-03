// Runtime UI localization. Settings choose between English and Arabic.
// Verse content (Arabic + English) is unaffected — both are always shown.

export const SUPPORTED_LOCALES = ["en", "ar"];

export const messages = {
  en: {
    // Navigation
    prevVerse: "Previous verse",
    nextVerse: "Next verse",
    favoriteVerse: "Favorite this verse",
    copyVerse: "Copy verse to clipboard",
    copied: "Copied!",

    // Settings panel
    settings: "Settings",
    closeSettings: "Close settings",
    openSettings: "Open settings",
    display: "Display",
    timeFormat: "Time format",
    wallpaper: "Wallpaper",
    randomWallpaper: "Random Wallpaper",
    language: "Language",

    // Verses section
    versesSection: "Verses",
    showFavoritesOnly: "Show favorites only",
    favoritedSuffix: "favorited",

    // Prayer times
    prayerTimes: "Prayer times",
    enable: "Enable",
    latitude: "Latitude",
    longitude: "Longitude",
    method: "Method",
    madhab: "Madhab (Asr)",
    methodMWL: "Muslim World League",
    methodEgyptian: "Egyptian",
    methodKarachi: "Karachi",
    methodUmmAlQura: "Umm al-Qura (Makkah)",
    methodDubai: "Dubai",
    methodMoonsighting: "Moonsighting Committee",
    methodNorthAmerica: "ISNA (North America)",
    methodKuwait: "Kuwait",
    methodQatar: "Qatar",
    methodSingapore: "Singapore",
    methodTehran: "Tehran",
    methodTurkey: "Turkey",
    madhabShafi: "Shafi / Maliki / Hanbali",
    madhabHanafi: "Hanafi",
    onDeviceNotice: "Calculated entirely on-device. No location data leaves this browser.",
    enterLatLon: "Enter latitude and longitude to enable.",
    nextPrayerIn: "in {0}",

    // Prayer names
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",

    // About
    about: "About",
    aboutTagline: "Privacy-first new tab page. No network requests.",
    aboutCredits: "Prayer-time math by adhan-js (MIT, vendored).",

    // Misc
    wallpaperOption: "Wallpaper {0}",
    languageEnglish: "English",
    languageArabic: "العربية",
    loading: "Loading…",
    noVerses: "No verses available.",
  },

  ar: {
    prevVerse: "الدعاء السابق",
    nextVerse: "الدعاء التالي",
    favoriteVerse: "إضافة إلى المفضلة",
    copyVerse: "نسخ الدعاء",
    copied: "تم النسخ",

    settings: "الإعدادات",
    closeSettings: "إغلاق الإعدادات",
    openSettings: "فتح الإعدادات",
    display: "العرض",
    timeFormat: "تنسيق الوقت",
    wallpaper: "الخلفية",
    randomWallpaper: "خلفية عشوائية",
    language: "اللغة",

    versesSection: "الأدعية",
    showFavoritesOnly: "عرض المفضلة فقط",
    favoritedSuffix: "مُفضَّل",

    prayerTimes: "مواقيت الصلاة",
    enable: "تفعيل",
    latitude: "خط العرض",
    longitude: "خط الطول",
    method: "طريقة الحساب",
    madhab: "المذهب (العصر)",
    methodMWL: "رابطة العالم الإسلامي",
    methodEgyptian: "الهيئة المصرية العامة للمساحة",
    methodKarachi: "جامعة العلوم الإسلامية، كراتشي",
    methodUmmAlQura: "أم القرى (مكة)",
    methodDubai: "دبي",
    methodMoonsighting: "لجنة رؤية الهلال",
    methodNorthAmerica: "ISNA (أمريكا الشمالية)",
    methodKuwait: "الكويت",
    methodQatar: "قطر",
    methodSingapore: "سنغافورة",
    methodTehran: "طهران",
    methodTurkey: "تركيا",
    madhabShafi: "الشافعي / المالكي / الحنبلي",
    madhabHanafi: "الحنفي",
    onDeviceNotice: "يُحسب بالكامل على الجهاز. لا تغادر بيانات الموقع هذا المتصفح.",
    enterLatLon: "أدخل خط العرض وخط الطول للتفعيل.",
    nextPrayerIn: "بعد {0}",

    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",

    about: "حول",
    aboutTagline: "صفحة تبويب جديد تحترم الخصوصية. بدون أي اتصال بالإنترنت.",
    aboutCredits: "حسابات أوقات الصلاة بواسطة مكتبة adhan-js (MIT، مضمَّنة محليًا).",

    wallpaperOption: "خلفية {0}",
    languageEnglish: "English",
    languageArabic: "العربية",
    loading: "جارٍ التحميل…",
    noVerses: "لا توجد أدعية متاحة.",
  },
};

export function t(locale, key, ...args) {
  const dict = messages[locale] || messages.en;
  let s = dict[key] ?? messages.en[key] ?? key;
  for (let i = 0; i < args.length; i++) s = s.replace(`{${i}}`, args[i]);
  return s;
}

const ATTR_DATASET = {
  "i18nAriaLabel": "aria-label",
  "i18nTitle": "title",
  "i18nPlaceholder": "placeholder",
};

export function applyI18n(locale, root = document) {
  const isAr = locale === "ar";
  document.documentElement.setAttribute("lang", isAr ? "ar" : "en");
  document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");

  for (const el of root.querySelectorAll("[data-i18n]")) {
    el.textContent = t(locale, el.dataset.i18n);
  }
  for (const [datasetKey, attr] of Object.entries(ATTR_DATASET)) {
    const selector = `[data-${datasetKey.replace(/([A-Z])/g, "-$1").toLowerCase()}]`;
    for (const el of root.querySelectorAll(selector)) {
      el.setAttribute(attr, t(locale, el.dataset[datasetKey]));
    }
  }
}

export function detectInitialLocale() {
  // Best effort: prefer Arabic UI if browser language starts with "ar".
  const lang = (navigator.language || "en").toLowerCase();
  return lang.startsWith("ar") ? "ar" : "en";
}
