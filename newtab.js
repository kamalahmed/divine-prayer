// Import the verses array
import verses from "./verses.js";

document.addEventListener("DOMContentLoaded", () => {
  const verseElement = document.getElementById("verse");
  const verseEnElement = document.getElementById("verse-en");
  const changeWallpaperButton = document.getElementById("change-wallpaper");
  const wallpaperSelector = document.getElementById("wallpaper-selector");
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("date");
  const savedWallpaper = localStorage.getItem("wallpaper");
  let verseIndex = localStorage.getItem("verseIndex")
    ? parseInt(localStorage.getItem("verseIndex"))
    : 0;
  const count = 19;

  const wallpapers = [];
  for (let i = 0; i < count; i++) {
    const wallpaperURL = `wallpapers/wallpaper${i + 1}.jpg`;
    wallpapers.push(wallpaperURL);
  }

  function getNextVerse() {
    const verse = verses[verseIndex];
    verseIndex = (verseIndex + 1) % verses.length; // Loop to the beginning
    localStorage.setItem("verseIndex", verseIndex); // Store the current index
    return verse;
  }

  function getRandomWallpaper() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  }

  function displayVerse() {
    const verse = getNextVerse();
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
  // Update clock and date
  function updateClockAndDate() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const timeString = `${hours}:${minutes} ${ampm}`;
    clockElement.textContent = timeString;

    const options = { weekday: "long", month: "long", day: "numeric" };
    const dateString = now.toLocaleDateString(undefined, options);
    dateElement.textContent = dateString;
  }

  // change wallpaper
  changeWallpaperButton.addEventListener("click", changeWallpaper);
  wallpaperSelector.addEventListener("change", () => {
    const selectedWallpaper = wallpaperSelector.value;
    setWallpaper(selectedWallpaper);
  });

  if (savedWallpaper) {
    setWallpaper(savedWallpaper);
    wallpaperSelector.value = savedWallpaper;
  } else {
    changeWallpaper(); // Set a random wallpaper on the first load
  }

  // Display a verse when the new tab is opened
  displayVerse();
  // Display Date and Time
  setInterval(updateClockAndDate, 1000);
  updateClockAndDate(); // Initial call to display the clock immediately
});
