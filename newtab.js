document.addEventListener("xlosdingDOMContentLoaded", () => {
  const verseElement = document.getElementById("verse");
  const changeWallpaperButton = document.getElementById("change-wallpaper");

  const count = 19;
  const wallpapers = [];
  for (let i = 0; i < count; i++) {
    const wallpaperURL = `wallpapers/wallpaper${i + 1}.jpg`;
    wallpapers.push(wallpaperURL);
  }

  const verses = [
    "Indeed, this Qur'an guides to that which is most suitable...",
    "And We have certainly made the Qur'an easy for remembrance...",
    // Add more verses here
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
    verseElement.textContent = getRandomVerse();
  }

  function changeWallpaper() {
    const randomWallpaper = getRandomWallpaper();
    document.body.style.backgroundImage = `url(${randomWallpaper})`;
    localStorage.setItem("wallpaper", randomWallpaper);
  }

  changeWallpaperButton.addEventListener("click", changeWallpaper);

  const savedWallpaper = localStorage.getItem("wallpaper");
  if (savedWallpaper) {
    document.body.style.backgroundImage = `url(${savedWallpaper})`;
  } else {
    changeWallpaper(); // Set a random wallpaper on the first load
  }

  // Display a verse when the new tab is opened
  displayVerse();
});

document.addEventListener("DOMContentLoaded", () => {
  const verseElement = document.getElementById("verse");
  const changeWallpaperButton = document.getElementById("change-wallpaper");
  const wallpaperSelector = document.getElementById("wallpaper-selector");
  const count = 19;
  const wallpapers = [];
  for (let i = 0; i < count; i++) {
    const wallpaperURL = `wallpapers/wallpaper${i + 1}.jpg`;
    wallpapers.push(wallpaperURL);
  }

  const verses = [
    "Indeed, this Qur'an guides to that which is most suitable...",
    "And We have certainly made the Qur'an easy for remembrance...",
    // Add more verses here
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
    verseElement.textContent = getRandomVerse();
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
