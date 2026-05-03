# Divine Prayer Chrome Extension
[Download it from Google Chrome WebStore](https://chromewebstore.google.com/detail/divine-prayer/deghiahojmjleifepimmipmbakakpfag)
## Description
This Chrome extension cycles through a curated collection of duas/prayers/zikr from the Quran and Sahih Hadith — one per new tab — so you read through them sequentially over time. It also features a clock and date display at the bottom left corner, and you can change the wallpaper by clicking a button or selecting from a predefined list.


## How to use this extension - Watch Demo.
[![Watch the video](https://img.youtube.com/vi/rcGMmEGJER0/maxresdefault.jpg)](https://youtu.be/rcGMmEGJER0)



## Features
- Displays a dua/prayer/zikr from the Quran and Sahih Hadith with English translation, cycling sequentially across new tabs.
- Navigate verses with prev/next buttons or the ←/→ arrow keys.
- Shows the current time and date; toggle between 12h (AM/PM) and 24h format.
- Random wallpaper button plus dropdown for picking from the predefined set.
- Settings (verse position, wallpaper, time format) persist across sessions via `chrome.storage`.
- Self-hosted fonts and a strict Content Security Policy — no external network requests.
- Accessible: keyboard navigation, focus rings, semantic markup, `lang="ar"` for screen readers.

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
  /icons
    icon16.png
    icon48.png
    icon128.png
  /wallpapers
    wallpaper1.jpg
    wallpaper2.jpg
    ...
  /fonts
    scheherazade-arabic.woff2
    scheherazade-latin.woff2
  /newtab.html
  /newtab.js
  /styles.css
  /verses.js
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

## License
This project is licensed under the MIT License
