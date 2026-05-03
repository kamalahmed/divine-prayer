# Divine Prayer Chrome Extension
[Download it from Google Chrome WebStore](https://chromewebstore.google.com/detail/divine-prayer/deghiahojmjleifepimmipmbakakpfag)
## Description
This Chrome extension cycles through a curated collection of **82 duas, prayers, and zikr** from the Qur'an and authentic Hadith — one per new tab — so you read through them sequentially over time. Each entry that has a verifiable canonical source (Qur'an verse or hadith collection) shows that citation under the translation. The page also features Gregorian + Hijri dates, an optional on-device prayer-times widget, a favorites system, English/Arabic UI, and a wallpaper picker.


## How to use this extension - Watch Demo.
[![Watch the video](https://img.youtube.com/vi/rcGMmEGJER0/maxresdefault.jpg)](https://youtu.be/rcGMmEGJER0)



## Features
- **82 duas with citations**: a dua/prayer/zikr from the Qur'an and authentic Hadith with English translation, cycling sequentially across new tabs. 52 entries cite their canonical source (Qur'an chapter:verse, or hadith collection — e.g. *Sahih al-Bukhari*, *Sahih Muslim*, *Sunan al-Tirmidhi*). Navigate with prev/next buttons or the ←/→ arrow keys.
- **Favorites**: star verses you want to revisit (`F` key or the star button); filter to favorites-only from the settings panel. Favorites are keyed by the Arabic text, so they survive any future reordering of the verse list.
- **Copy verse**: copy the Arabic + English + source to your clipboard (`C` key or the copy button).
- **Hijri date**: shown alongside the Gregorian date, computed locally via the browser's built-in Umm-al-Qura calendar (zero dependencies).
- **Prayer times** (opt-in): six daily prayer times calculated entirely on-device using the [adhan-js](https://github.com/batoulapps/adhan-js) library. Enter your latitude/longitude once in the settings panel — **nothing leaves your browser**. Pick from 12 calculation methods (MWL, Egyptian, Karachi, Umm al-Qura, ISNA, Moonsighting Committee, etc.) and Shafi/Hanafi madhab for Asr. The next prayer + countdown is shown next to the clock.
- **English / Arabic UI**: full RTL layout in Arabic mode, with localized prayer names (الفجر، الظهر…), settings labels, and date formatting. Defaults to your browser language; switchable from the settings panel.
- **Clock**: 12h (AM/PM) or 24h format. Updates once per minute and pauses when the tab is hidden.
- **Wallpapers**: 19 bundled wallpapers; pick one or randomize.
- **Settings panel**: a clean side panel (gear icon top-right, or `,` key) keeps all controls out of the way. Auto-hides idle controls after a few seconds for an uncluttered view.
- **Privacy-first**: zero network requests. Self-hosted fonts, vendored library, strict Content Security Policy. Settings persist locally via `chrome.storage`.
- **Accessible**: keyboard navigation, focus rings, semantic markup, proper `lang`/`dir` attributes for screen readers.

## Keyboard shortcuts
| Key | Action |
| --- | --- |
| `←` / `→` | Previous / next verse |
| `F` | Toggle favorite on current verse |
| `C` | Copy current verse |
| `,` | Open / close settings panel |
| `Esc` | Close settings panel |

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:kamalahmed/divine-prayer.git
   ```
   Or you can download the zip by clicking on the Green button on the repository page or from the relaese page. 
   Here is direct download link: https://github.com/kamalahmed/divine-prayer/archive/refs/tags/v1.0.0.zip
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch in the top right.
4. Click "Load unpacked" and select the folder where you cloned the repository. Remember, the folder should be unzipped. 

## Folder Structure
```
/divine-prayer
  /_locales
    /en/messages.json   # store metadata (name, description)
    /ar/messages.json
  /icons
    icon16.png  icon48.png  icon128.png
  /wallpapers
    wallpaper1.jpg … wallpaper19.jpg
  /fonts
    scheherazade-arabic.woff2
    scheherazade-latin.woff2
  /vendor
    adhan.esm.min.js   # MIT, https://github.com/batoulapps/adhan-js
    adhan-LICENSE
  /newtab.html
  /newtab.js
  /styles.css
  /i18n.js              # runtime UI translations (en + ar)
  /verses.js            # 82 duas with optional source citations
  /manifest.json
  /README.md
  /Privacy.md
```

## Usage
- Open a new tab to see the next prayer/dua/zikr in the sequence, along with the current time and date.
- Click the prev/next buttons (or press ←/→) to navigate verses manually.
- Click "24h" / "12h" to toggle the clock format.
- Click "Random Wallpaper" to swap to a random wallpaper, or pick a specific one from the dropdown.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.



## Custom wallpapers
- Replace any image in `wallpapers/` to use your own — file names must stay as `wallpaper1.jpg`, `wallpaper2.jpg`, etc.
- To use more or fewer than the default 19 wallpapers, change the `WALLPAPER_COUNT` constant at the top of `newtab.js` and add/remove the matching `wallpaperN.jpg` files. The dropdown is generated from this constant, so it updates automatically.

## A note on sources
Citations follow conservative practice — the canonical collection name only (e.g. *Sahih al-Bukhari*), without hadith numbers, so the attribution is unambiguous and easy to verify by searching the Arabic text on resources like [sunnah.com](https://sunnah.com) or in *Hisn al-Muslim*. Qur'anic du'as carry exact `Surah:Ayah` references. Several short, ubiquitous dhikr (e.g. *Subhan Allah*, *Alhamdulillah* alone) appear without a single‑hadith citation because they are practiced based on many narrations rather than a single locus.

If you spot an inaccurate or missing citation, please open an issue or PR — corrections from people with formal training are welcome.

## Credits
- Prayer-time calculations by [adhan-js](https://github.com/batoulapps/adhan-js) (MIT, vendored under `vendor/`).
- Arabic typography: [Scheherazade](https://software.sil.org/scheherazade/) (OFL, self-hosted under `fonts/`).

## License
This project is licensed under the MIT License
