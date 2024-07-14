
![Screenshot](screenshot.png)
# Divine Prayer Chrome Extension
## Description
This Chrome extension displays a random dua/prayer/zikr from the Quran and Sahih Hadith on each new tab. It also features a clock and date display at the bottom left corner. The user can change the wallpaper by clicking a button or selecting from predefined wallpapers.


## How to use this extension - Watch Demo.
[![Watch the video](https://img.youtube.com/vi/rcGMmEGJER0/maxresdefault.jpg)](https://youtu.be/rcGMmEGJER0)



## Features
- Displays a random dua/prayer/zikr from the Quran and Sahih Hadith with English translation.
- Shows the current time with AM/PM and the current date.
- Allows changing the wallpaper with a random wallpaper button.
- Provides a dropdown to select from predefined wallpapers.

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
    wallpaper3.jpg
    ...
  /background.jpg
  /screenshot.png
  /newtab.html
  /newtab.js
  /styles.css
  /verses.js
  /manifest.json
  /README.md
```

## Usage
- Open a new tab to see a random prayer/dua/zikr from the Quran along with the current time and date.
- Click the "Random Wallpaper" button to change the wallpaper to a random one.
- Use the dropdown menu to select a specific wallpaper from the predefined set.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License
