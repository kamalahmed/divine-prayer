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
      ar: "سُبْحَانَ اللَّهِ",
      en: "Glory be to Allah",
    },
    {
      ar: "الحَمْدُ لِلّهِ",
      en: "All praise is for Allah",
    },
    {
      ar: "لا إلهَ إلاّ اللّه",
      en: "There is no true God except Allah",
    },
    {
      ar: "اللَّهُ أَكْبَرُ",
      en: "Allah is the Greatest",
    },
    {
      ar: "لا حَوْلَ وَلا قُوَّةَ إِلَّا بِاللَّهِ",
      en: "There is no power and no strength except with Allah",
    },
    {
      ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      en: "Glory be to Allah and all praise is due to Him",
    },
    {
      ar: "أَسْتَغْفِرُ اللَّهَ",
      en: "I seek forgiveness from Allah",
    },
    {
      ar: "سُبْحَانَ اللَّهِ العَظِيمِ",
      en: "Glory be to Allah, the Most Great",
    },
    {
      ar: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
      en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    },
    {
      ar: "رَبِّ اغْفِرْ لِي",
      en: "My Lord, forgive me",
    },
    {
      ar: "اللّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      en: "O Allah, You are my Lord, there is no deity except You. You created me, and I am Your servant",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      en: "O Allah, I seek refuge in You from the punishment of Hellfire",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ",
      en: "O Allah, I seek refuge in You from the punishment of the grave",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ المَحْيَا وَالمَمَاتِ",
      en: "O Allah, I seek refuge in You from the trials of life and death",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
      en: "O Allah, I seek refuge in You from the evil of my soul",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا",
      en: "O Allah, I seek refuge in You from the evil of every creature You have taken by the forelock",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ العَفْوَ وَالعَافِيَةَ",
      en: "O Allah, I ask You for forgiveness and well-being",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالجَنَّةَ",
      en: "O Allah, I ask You for Your pleasure and Paradise",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
      en: "O Allah, I seek refuge in You from Your anger and the Fire",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ",
      en: "O Allah, I seek refuge in You from the withdrawal of Your blessings and the change of Your well-being",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ الهُدَى وَالتُّقَى وَالعَفَافَ وَالغِنَى",
      en: "O Allah, I ask You for guidance, piety, chastity, and sufficiency",
    },
    {
      ar: "اللّهُمَّ بَارِكْ لِي فِي رِزْقِي",
      en: "O Allah, bless my provision for me",
    },
    {
      ar: "اللّهُمَّ ارْزُقْنِي حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      en: "O Allah, grant me Your love and the love of those who love You",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنْ التَّوَّابِينَ وَاجْعَلْنِي مِنَ المُتَطَهِّرِينَ",
      en: "O Allah, make me of those who repent and purify themselves",
    },
    {
      ar: "اللّهُمَّ أَصْلِحْ لِي شَأْنِي كُلَّهُ",
      en: "O Allah, rectify all my affairs for me",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِمَّنْ تَحُبُّهُمْ وَيُحِبُّونَكَ",
      en: "O Allah, make me among those whom You love and who love You",
    },
    {
      ar: "اللّهُمَّ زِدْنِي عِلْمًا",
      en: "O Allah, increase me in knowledge",
    },
    {
      ar: "اللّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      en: "O Allah, help me to remember You, thank You, and worship You well",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ عَبْدُكَ وَنَبِيُّكَ",
      en: "O Allah, I ask You for the best of what Your servant and prophet has asked of You",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      en: "O Allah, I ask You for well-being in this world and the Hereafter",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الأَمْرِ وَالعَزِيمَةَ عَلَى الرُّشْدِ",
      en: "O Allah, I ask You for steadfastness in the matter and determination upon guidance",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا سَلِيمًا",
      en: "O Allah, I ask You for a sound heart",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ لِسَانًا صَادِقًا",
      en: "O Allah, I ask You for a truthful tongue",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا أَعْطَيْتَ",
      en: "O Allah, I ask You for the best of what You have given",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا أَنْتَ سَائِلٌ بِهِ",
      en: "O Allah, I ask You for the best of what You are asked for",
    },
    {
      ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ التَّوْفِيقَ وَالسَّدَادَ",
      en: "O Allah, I ask You for success and correctness",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الصَّابِرِينَ",
      en: "O Allah, make me among the patient",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الشَّاكِرِينَ",
      en: "O Allah, make me among the grateful",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَقَبَّلْتَ أَعْمَالَهُمْ",
      en: "O Allah, make me among those whose deeds You have accepted",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ غَفَرْتَ ذُنُوبَهُمْ",
      en: "O Allah, make me among those whose sins You have forgiven",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ رَحِمْتَهُمْ",
      en: "O Allah, make me among those whom You have shown mercy to",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ كَتَبْتَ لَهُمُ السَّعَادَةَ",
      en: "O Allah, make me among those whom You have written happiness for",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَوَفَّيْتَهُمْ مُؤْمِنِينَ",
      en: "O Allah, make me among those whom You take in death as believers",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ بَارَكْتَ فِي أَعْمَالِهِمْ",
      en: "O Allah, make me among those whom You have blessed in their deeds",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ أَنْتَ رَاضٍ عَنْهُمْ",
      en: "O Allah, make me among those whom You are pleased with",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ أَحْبَبْتَهُمْ",
      en: "O Allah, make me among those whom You have loved",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَحَبَّبْتَ إِلَيْهِمْ",
      en: "O Allah, make me among those whom You have endeared to You",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ اسْتَجَبْتَ دُعَاءَهُمْ",
      en: "O Allah, make me among those whose prayers You have answered",
    },
    {
      ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَقَبَّلْتَ صَلَاتَهُمْ",
      en: "O Allah, make me among those whose prayers You have accepted",
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
