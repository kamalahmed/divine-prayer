document.addEventListener("DOMContentLoaded", () => {
  const verseElement = document.getElementById("verse");
  const verseEnElement = document.getElementById("verse-en");
  const changeWallpaperButton = document.getElementById("change-wallpaper");
  const wallpaperSelector = document.getElementById("wallpaper-selector");
  const count = 19;
  const wallpapers = [];
  for (let i = 0; i < count; i++) {
    const wallpaperURL = `wallpapers/wallpaper${i + 1}.jpg`;
    wallpapers.push(wallpaperURL);
  }

  const verses = [
    {
      ar: "الحَمْـدُ لِلّهِ الّذي أَحْـيانا بَعْـدَ ما أَماتَـنا وَإليه النُّـشور",
      en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    },
    {
      ar: "(بِسْمِ الله ) اللّهُـمَّ إِنِّـي أَعـوذُ بِـكَ مِـنَ الْخُـبْثِ وَالْخَبائِث",
      en: "(In the name of Allah). O Allah, I take refuge with you from all evil and evil-doers.",
    },
    {
      ar: "لا إلهَ إلاّ اللّه وحدَهُ لا شريكَ لهُ، لهُ المُلْـكُ ولهُ الحَمْـد، يُحْيـي وَيُميـتُ وَهُوَ حَيٌّ لا يَمـوت، بِيَـدِهِ الْخَـيْرُ وَهوَ على كلّ شيءٍ قدير",
      en: "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise. He gives life and causes death, and He is living and does not die. In His hand is all good and He is over all things, omnipotent.",
    },
  ];

  function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  }

  function getRandomWallpaper() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  }

  function displayVerse() {
    let verse = getRandomVerse();
    verseElement.textContent = verse.ar;
    verseEnElement.textContent = verse.en;
  }

  function changeWallpaper() {
    const randomWallpaper = getRandomWallpaper();
    document.body.style.backgroundImage = `url(${randomWallpaper})`;
    localStorage.setItem("wallpaper", randomWallpaper);
  }

  function setWallpaper(url) {
    document.body.style.backgroundImage = `url(${url})`;
    localStorage.setItem("wallpaper", url);
  }

  changeWallpaperButton.addEventListener("click", changeWallpaper);

  wallpaperSelector.addEventListener("change", () => {
    const selectedWallpaper = wallpaperSelector.value;
    setWallpaper(selectedWallpaper);
  });

  const savedWallpaper = localStorage.getItem("wallpaper");
  if (savedWallpaper) {
    setWallpaper(savedWallpaper);
    wallpaperSelector.value = savedWallpaper;
  } else {
    changeWallpaper(); // Set a random wallpaper on the first load
  }

  // Display a verse when the new tab is opened
  displayVerse();
});
