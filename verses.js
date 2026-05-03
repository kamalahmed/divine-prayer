// Each entry: { ar, en, source? }
// `source` cites the canonical reference where applicable. For ubiquitous
// dhikr (e.g. tasbih, tahmid) without a single hadith origin, source is
// omitted. Citations follow conservative practice — collection name only,
// no hadith numbers — so that the attribution is unambiguous and easy for
// users to verify by searching the text.

const verses = [
  // ── Foundational dhikr ───────────────────────────────────────────────────
  {
    ar: "سُبْحَانَ اللَّهِ",
    en: "Glory be to Allah",
  },
  {
    ar: "الحَمْدُ لِلّهِ",
    en: "All praise is for Allah",
  },
  {
    ar: "لا إلهَ إلاّ اللّه",
    en: "There is no true god except Allah",
  },
  {
    ar: "اللَّهُ أَكْبَرُ",
    en: "Allah is the Greatest",
  },
  {
    ar: "لا حَوْلَ وَلا قُوَّةَ إِلَّا بِاللَّهِ",
    en: "There is no power and no strength except with Allah",
    source: "Sahih al-Bukhari",
  },
  {
    ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    en: "Glory be to Allah and all praise is due to Him",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "أَسْتَغْفِرُ اللَّهَ",
    en: "I seek forgiveness from Allah",
  },
  {
    ar: "سُبْحَانَ اللَّهِ العَظِيمِ",
    en: "Glory be to Allah, the Most Great",
  },
  {
    ar: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    source: "Qur'an 21:87",
  },
  {
    ar: "رَبِّ اغْفِرْ لِي",
    en: "My Lord, forgive me",
  },
  {
    ar: "اللّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    en: "O Allah, You are my Lord, there is no deity except You. You created me, and I am Your servant",
    source: "Sayyid al-Istighfar — Sahih al-Bukhari",
  },

  // ── Seeking refuge (post-prayer du'a, Bukhari & Muslim) ──────────────────
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
    en: "O Allah, I seek refuge in You from the punishment of Hellfire",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ",
    en: "O Allah, I seek refuge in You from the punishment of the grave",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ المَحْيَا وَالمَمَاتِ",
    en: "O Allah, I seek refuge in You from the trials of life and death",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
    en: "O Allah, I seek refuge in You from the evil of my soul",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا",
    en: "O Allah, I seek refuge in You from the evil of every creature You have taken by the forelock",
    source: "Sunan Abi Dawud",
  },

  // ── Asking for goodness ──────────────────────────────────────────────────
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ العَفْوَ وَالعَافِيَةَ",
    en: "O Allah, I ask You for pardon and well-being",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالجَنَّةَ",
    en: "O Allah, I ask You for Your pleasure and Paradise",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
    en: "O Allah, I seek refuge in You from Your anger and the Fire",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ",
    en: "O Allah, I seek refuge in You from the withdrawal of Your blessings and the change of Your well-being",
    source: "Sahih Muslim",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ الهُدَى وَالتُّقَى وَالعَفَافَ وَالغِنَى",
    en: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency",
    source: "Sahih Muslim",
  },
  {
    ar: "اللّهُمَّ بَارِكْ لِي فِي رِزْقِي",
    en: "O Allah, bless my provision for me",
  },
  {
    ar: "اللّهُمَّ ارْزُقْنِي حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
    en: "O Allah, grant me Your love and the love of those who love You",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنْ التَّوَّابِينَ وَاجْعَلْنِي مِنَ المُتَطَهِّرِينَ",
    en: "O Allah, make me of those who repent and of those who purify themselves",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللّهُمَّ أَصْلِحْ لِي شَأْنِي كُلَّهُ",
    en: "O Allah, rectify all my affairs for me",
    source: "Sunan Abi Dawud",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِمَّنْ تَحُبُّهُمْ وَيُحِبُّونَكَ",
    en: "O Allah, make me among those whom You love and who love You",
  },
  {
    ar: "اللّهُمَّ زِدْنِي عِلْمًا",
    en: "O Allah, increase me in knowledge",
    source: "Qur'an 20:114",
  },
  {
    ar: "اللّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    en: "O Allah, help me to remember You, thank You, and worship You in the best manner",
    source: "Sunan Abi Dawud",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ عَبْدُكَ وَنَبِيُّكَ",
    en: "O Allah, I ask You for the best of what Your servant and prophet has asked of You",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    en: "O Allah, I ask You for well-being in this world and the Hereafter",
    source: "Sunan Ibn Majah",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds",
    source: "Sunan Ibn Majah",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الأَمْرِ وَالعَزِيمَةَ عَلَى الرُّشْدِ",
    en: "O Allah, I ask You for steadfastness in the matter and resolve in guidance",
    source: "Sunan al-Nasa'i",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا سَلِيمًا",
    en: "O Allah, I ask You for a sound heart",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ لِسَانًا صَادِقًا",
    en: "O Allah, I ask You for a truthful tongue",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا أَعْطَيْتَ",
    en: "O Allah, I ask You for the best of what You have given",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا أَنْتَ سَائِلٌ بِهِ",
    en: "O Allah, I ask You for the best of what You are asked for",
  },
  {
    ar: "اللّهُمَّ إِنِّي أَسْأَلُكَ التَّوْفِيقَ وَالسَّدَادَ",
    en: "O Allah, I ask You for success and uprightness",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الصَّابِرِينَ",
    en: "O Allah, make me among the patient",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الشَّاكِرِينَ",
    en: "O Allah, make me among the grateful",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَقَبَّلْتَ أَعْمَالَهُمْ",
    en: "O Allah, make me among those whose deeds You have accepted",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ غَفَرْتَ ذُنُوبَهُمْ",
    en: "O Allah, make me among those whose sins You have forgiven",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ رَحِمْتَهُمْ",
    en: "O Allah, make me among those whom You have shown mercy to",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ كَتَبْتَ لَهُمُ السَّعَادَةَ",
    en: "O Allah, make me among those for whom You have written happiness",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَوَفَّيْتَهُمْ مُؤْمِنِينَ",
    en: "O Allah, make me among those whom You take in death as believers",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ بَارَكْتَ فِي أَعْمَالِهِمْ",
    en: "O Allah, make me among those whose deeds You have blessed",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ أَنْتَ رَاضٍ عَنْهُمْ",
    en: "O Allah, make me among those whom You are pleased with",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ أَحْبَبْتَهُمْ",
    en: "O Allah, make me among those whom You have loved",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَحَبَّبْتَ إِلَيْهِمْ",
    en: "O Allah, make me among those whom You have endeared to",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ اسْتَجَبْتَ دُعَاءَهُمْ",
    en: "O Allah, make me among those whose prayers You have answered",
  },
  {
    ar: "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ تَقَبَّلْتَ صَلَاتَهُمْ",
    en: "O Allah, make me among those whose prayers You have accepted",
  },

  // ── Qur'anic du'as ───────────────────────────────────────────────────────
  {
    ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire",
    source: "Qur'an 2:201",
  },
  {
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا",
    en: "Our Lord, do not impose blame upon us if we have forgotten or erred",
    source: "Qur'an 2:286",
  },
  {
    ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً ۚ إِنَّكَ أَنْتَ الْوَهَّابُ",
    en: "Our Lord, let not our hearts deviate after You have guided us, and grant us from Yourself mercy. Indeed, You are the Bestower",
    source: "Qur'an 3:8",
  },
  {
    ar: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    en: "Our Lord, forgive us our sins and the excess in our affairs, and plant firmly our feet, and grant us victory over the disbelieving people",
    source: "Qur'an 3:147",
  },
  {
    ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    en: "Sufficient for us is Allah, and [He is] the best Disposer of affairs",
    source: "Qur'an 3:173",
  },
  {
    ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
    en: "Our Lord, pour upon us patience and plant firmly our feet",
    source: "Qur'an 2:250",
  },
  {
    ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    en: "My Lord, expand for me my chest, ease for me my task, and untie the knot from my tongue that they may understand my speech",
    source: "Qur'an 20:25–28",
  },
  {
    ar: "رَبِّ زِدْنِي عِلْمًا",
    en: "My Lord, increase me in knowledge",
    source: "Qur'an 20:114",
  },
  {
    ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
    en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness that You will please",
    source: "Qur'an 27:19",
  },
  {
    ar: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
    en: "My Lord, indeed I have wronged myself, so forgive me",
    source: "Qur'an 28:16",
  },
  {
    ar: "رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    en: "My Lord, indeed I am, for whatever good You would send down to me, in need",
    source: "Qur'an 28:24",
  },
  {
    ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    en: "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us a leader for the righteous",
    source: "Qur'an 25:74",
  },
  {
    ar: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
    en: "My Lord, grant me [a child] from among the righteous",
    source: "Qur'an 37:100",
  },
  {
    ar: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    en: "My Lord, forgive me and my parents and the believers on the Day when the account will be established",
    source: "Qur'an 14:41",
  },
  {
    ar: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    en: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent",
    source: "Qur'an 66:8",
  },
  {
    ar: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    en: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne",
    source: "Qur'an 9:129",
  },

  // ── Prophetic du'as (Sunnah) ─────────────────────────────────────────────
  {
    ar: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
    en: "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    en: "There is no deity but Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things competent",
    source: "Sahih al-Bukhari & Sahih Muslim",
  },
  {
    ar: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    en: "O Allah, You are Most Forgiving, You love forgiveness, so forgive me",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    en: "O Allah, guide me and make me steadfast",
    source: "Sahih Muslim",
  },
  {
    ar: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
    en: "O Allah, grant my soul its piety and purify it; You are the best of those who purify it. You are its Guardian and Protector",
    source: "Sahih Muslim",
  },
  {
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ، وَمِنْ قَلْبٍ لَا يَخْشَعُ، وَمِنْ نَفْسٍ لَا تَشْبَعُ، وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
    en: "O Allah, I seek refuge in You from knowledge that does not benefit, a heart that does not humble itself, a soul that is never satisfied, and a supplication that is not answered",
    source: "Sahih Muslim",
  },
  {
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    en: "O Allah, I seek refuge in You from worry and grief, from inability and laziness, from miserliness and cowardice, from the burden of debt, and from being overpowered by men",
    source: "Sahih al-Bukhari",
  },
  {
    ar: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
    en: "O Turner of hearts, make my heart firm upon Your religion",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "اللَّهُمَّ مُصَرِّفَ الْقُلُوبِ صَرِّفْ قُلُوبَنَا عَلَىٰ طَاعَتِكَ",
    en: "O Allah, Director of hearts, direct our hearts to obey You",
    source: "Sahih Muslim",
  },
  {
    ar: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
    en: "O Ever-Living, O Sustainer, by Your mercy I seek aid. Rectify all my affairs for me, and do not leave me to myself even for the blink of an eye",
    source: "al-Mustadrak (al-Hakim) — graded sahih",
  },
  {
    ar: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    en: "O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection",
    source: "Sunan al-Tirmidhi",
  },
  {
    ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
    en: "In the name of Allah, with whose name nothing on earth or in the heaven can cause harm, and He is the All-Hearing, the All-Knowing",
    source: "Sunan Abi Dawud & Sunan al-Tirmidhi",
  },
  {
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ، وَأَعُوذُ بِكَ مِنَ النَّارِ",
    en: "O Allah, I ask You for Paradise and I seek refuge in You from the Fire",
    source: "Sunan Abi Dawud",
  },
  {
    ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    en: "All praise is for Allah who gave us life after He caused us to die, and to Him is the resurrection",
    source: "Sahih al-Bukhari",
  },
  {
    ar: "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    en: "O Allah, You are Peace, and from You is peace. Blessed are You, O Possessor of majesty and honor",
    source: "Sahih Muslim",
  },
  {
    ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
    en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet",
    source: "Sunan Abi Dawud & Sunan al-Tirmidhi",
  },
];

export default verses;
