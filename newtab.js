document.addEventListener("DOMContentLoaded", () => {
  const verseElement = document.getElementById("verse");
  const changeWallpaperButton = document.getElementById("change-wallpaper");

  const verses = [
    "Indeed, this Qur'an guides to that which is most suitable...",
    "And We have certainly made the Qur'an easy for remembrance...",
    // Add more verses here
  ];

  function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  }

  function displayVerse() {
    verseElement.textContent = getRandomVerse();
  }

  function changeWallpaper() {
    const imageUrl = prompt("Enter the URL of the new wallpaper:");
    if (imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
      localStorage.setItem("wallpaper", imageUrl);
    }
  }

  changeWallpaperButton.addEventListener("click", changeWallpaper);

  const savedWallpaper = localStorage.getItem("wallpaper");
  if (savedWallpaper) {
    document.body.style.backgroundImage = `url(${savedWallpaper})`;
  } else {
    document.body.style.backgroundImage = "url(background.jpg)";
  }

  // Display a verse when the new tab is opened
  displayVerse();
});
