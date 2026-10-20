// Data Lengkap Doa dari Kitab Hisnul Muslim
const doaData = [
  {
    id: 1,
    title: "Zikir Bangun Tidur",
    source: "HR. Bukhari & Muslim",
    arabic: "الحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ",
    latin: "Alḥamdulillāhillażī aḥyānā ba'da mā amātanā wa ilaihin-nusyūr.",
    meaning: "Segala puji bagi Allah yang menghidupkan kami setelah kami dimatikan oleh-Nya, dan hanya kepada-Nyalah kami dibangkitkan."
  },
  {
    id: 2,
    title: "Memakai Pakaian",
    source: "HR. Abu Daud, Tirmidzi & Ibnu Majah",
    arabic: "الحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alḥamdulillāhillażī kasānī hāżā (aṡ-ṡauba) wa razaqanīhi min gairi ḥawlin minnī wa lā quwwah.",
    meaning: "Segala puji bagi Allah yang telah memberikan pakaian ini kepadaku sebagai rezeki dari-Nya tanpa daya dan kekuatan dariku."
  },
  {
    id: 3,
    title: "Memakai Pakaian Baru",
    source: "HR. Abu Daud & Tirmidzi",
    arabic: "اللَّهُمَّ لَكَ الحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    latin: "Allāhumma lakal-ḥamdu anta kasautanīhi. As`aluka min khairihi wa khairi mā ṣuni'a lahu, wa a'ūżubika min syarrihi wa syarri mā ṣuni'a lahu.",
    meaning: "Ya Allah, hanya milik-Mu segala pujian. Engkaulah yang telah memberikannya kepadaku. Aku memohon kepada-Mu kebaikannya dan kebaikan tujuan pembuatannya. Dan aku berlindung kepada-Mu dari keburukannya dan keburukan tujuan pembuatannya."
  },
  {
    id: 4,
    title: "Melepas Pakaian",
    source: "HR. Tirmidzi",
    arabic: "بِسْمِ اللهِ",
    latin: "Bismillāh.",
    meaning: "Dengan nama Allah."
  },
  {
    id: 5,
    title: "Masuk Toilet (Kamar Mandi)",
    source: "HR. Bukhari & Muslim",
    arabic: "[بِسْمِ اللهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الخُبْثِ وَالخَبَائِثِ",
    latin: "[Bismillāh] allāhumma innī a'ūżubika minal-khubuṡi wal-khabā`iṡ.",
    meaning: "[Dengan nama Allah]. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari setan laki-laki dan perempuan."
  },
  {
    id: 6,
    title: "Keluar Dari Toilet",
    source: "HR. Abu Daud, Tirmidzi & Ibnu Majah",
    arabic: "غُفْرَانَكَ",
    latin: "Gufrānaka.",
    meaning: "Aku memohon ampunan-Mu, Ya Allah."
  },
  {
    id: 7,
    title: "Zikir Sebelum Wudu",
    source: "HR. Abu Daud & Ibnu Majah",
    arabic: "بِسْمِ اللهِ",
    latin: "Bismillāh.",
    meaning: "Dengan nama Allah."
  },
  {
    id: 8,
    title: "Zikir Setelah Berwudu",
    source: "HR. Muslim & Tirmidzi",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ المُتَطَهِّرِينَ",
    latin: "Asyhadu allā ilāha illallāh waḥdahū lā syarīka lahu, wa asyhadu anna muḥammadan 'abduhū wa rasūluh. Allāhummaj-'alnī minat-tawwābīna waj-'alnī minal-mutaṭahhirīn.",
    meaning: "Aku bersaksi tiada tuhan selain Allah semata yang tiada sekutu bagi-Nya, dan Muhammad hamba serta utusan-Nya. Ya Allah, jadikanlah aku golongan orang yang bertobat dan menyucikan diri."
  },
  {
    id: 9,
    title: "Keluar Rumah",
    source: "HR. Abu Daud & Tirmidzi",
    arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latin: "Bismillāh, tawakkaltu 'alallāh, wa lā ḥawla wa lā quwwata illā billāh.",
    meaning: "Dengan nama Allah, aku bertawakal kepada Allah, dan tiada daya serta upaya kecuali dengan pertolongan Allah."
  },
  {
    id: 10,
    title: "Masuk Rumah",
    source: "HR. Abu Daud",
    arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    latin: "Bismillāhi walajnā, wa bismillāhi kharajnā, wa 'alallāhi rabbinā tawakkalnā.",
    meaning: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar. Serta hanya kepada Allah, Tuhan kami, kami bertawakal."
  },
  {
    id: 11,
    title: "Masuk Masjid",
    source: "HR. Abu Daud & Muslim",
    arabic: "أَعُوذُ بِاللَّهِ العَظِيمِ، وَبِوَجْهِهِ الكَرِيمِ، وَسُلْطَانِهِ القَدِيمِ، مِنَ الشَّيْطَانِ الرَّحِيمِ. بِسْمِ اللهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "A'ūżu billāhil-'aẓīm, wa biwajhihil-karīm, wa sulṭānihil-qadīm, minasy-syaiṭānir-rajīm. Bismillāh, allāhummaf-taḥ lī abwāba raḥmatik.",
    meaning: "Aku berlindung kepada Allah Yang Maha Agung, dengan wajah-Nya yang Mulia, dari setan yang terkutuk. Bismillah, Ya Allah bukakanlah untukku pintu-pintu rahmat-Mu."
  },
  {
    id: 12,
    title: "Keluar Masjid",
    source: "HR. Muslim & Ibnu Majah",
    arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Bismillāh, waṣ-ṣalātu was-salāmu 'alā rasūlillāh. Allāhumma innī as`aluka min faḍlik.",
    meaning: "Dengan nama Allah, selawat dan salam atas Rasulullah. Ya Allah, sesungguhnya aku memohon sebagian dari karunia-Mu."
  },
  {
    id: 13,
    title: "Iftitah Dalam Salat",
    source: "HR. Bukhari & Muslim",
    arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالمَغْرِبِ، اللَّهُمَّ نَقْنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ",
    latin: "Allāhumma bā'id bainī wa baina khaṭāyāya kamā bā'adta bainal-masyriqi wal-magrib. Allāhumma naqqinī min khaṭāyāya kamā yunaqqas-ṡaubul-abyaḍu minad-danas.",
    meaning: "Ya Allah, jauhkanlah antaraku dan dosa-dosaku sebagaimana Engkau menjauhkan timur dan barat. Ya Allah, bersihkanlah aku dari dosa seperti kain putih yang dibersihkan dari kotoran."
  },
  {
    id: 14,
    title: "Ketika Rukuk",
    source: "HR. Abu Daud, Tirmidzi & Muslim",
    arabic: "سُبْحَانَ رَبِّيَ العَظِيمِ (ثَلَاثَ مَرَّاتٍ)",
    latin: "Subḥāna rabbiyal-'aẓīm (3x).",
    meaning: "Maha Suci Tuhanku Yang Maha Agung (dibaca 3 kali)."
  },
  {
    id: 15,
    title: "Bangkit Dari Rukuk (I'tidal)",
    source: "HR. Bukhari",
    arabic: "رَبَّنَا وَلَكَ الحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
    latin: "Rabbanā walakal-ḥamdu ḥamdan kaṡīran ṭayyiban mubārakan fīh.",
    meaning: "Wahai Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, serta diberkahi padanya."
  },
  {
    id: 16,
    title: "Ketika Sujud",
    source: "HR. Abu Daud, Tirmidzi & Muslim",
    arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى (ثَلَاثَ مَرَّاتٍ)",
    latin: "Subḥāna rabbiyal-a'lā (3x).",
    meaning: "Maha Suci Tuhanku Yang Maha Tinggi (dibaca 3 kali)."
  },
  {
    id: 17,
    title: "Duduk di Antara Dua Sujud",
    source: "HR. Abu Daud & Ibnu Majah",
    arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي. اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَاجْبُرْنِي، وَعَافِنِي، وَارْزُقْنِي",
    latin: "Rabbigfir lī, rabbigfir lī. Allāhummagfir lī warḥamnī wahdinī wajburnī wa 'āfinī warzuqnī.",
    meaning: "Ya Tuhanku ampunilah aku. Ya Allah, ampuni aku, rahmati aku, berilah aku petunjuk, cukupkan kekuranganku, selamatkan aku, dan anugerahkan rezeki kepadaku."
  },
  {
    id: 18,
    title: "Ketika Gundah dan Sedih",
    source: "HR. Bukhari",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الهَمِّ وَالحَزَنِ، وَالعَجْزِ وَالكَسَلِ، وَالبُخْلِ وَالجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    latin: "Allāhumma innī a'ūżubika minal-hammi wal-ḥazan, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa ḍala'id-daini wa galabatir-rijāl.",
    meaning: "Ya Allah, aku berlindung kepada-Mu dari rasa gundah dan sedih, sifat lemah dan malas, sifat bakhil dan pengecut, lilitan utang, serta penguasaan orang lain."
  },
  {
    id: 19,
    title: "Menghadapi Kesulitan Urusan",
    source: "HR. Ibnu Hibban",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلًا",
    latin: "Allāhumma lā sahla illā mā ja'altahu sahlā, wa anta taj'alul-ḥazna iżā syi`ta sahlā.",
    meaning: "Ya Allah, tiada kemudahan selain apa yang Engkau jadikan mudah, dan Engkau menjadikan kesulitan itu mudah bila Engkau menghendakinya."
  },
  {
    id: 20,
    title: "Sebelum Makan",
    source: "HR. Abu Daud & Tirmidzi",
    arabic: "بِسْمِ اللهِ، اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
    latin: "Bismillāh. Allāhumma bārik lanā fīhi wa aṭ'imnā khairan minhu.",
    meaning: "Dengan nama Allah. Ya Allah, berkahilah kami padanya dan karuniakanlah kami makanan yang lebih baik darinya."
  },
  {
    id: 21,
    title: "Setelah Makan",
    source: "HR. Abu Daud & Tirmidzi",
    arabic: "الحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alḥamdulillāhillażī aṭ'amanī hāżā wa razaqanīhi min gairi ḥawlin minnī wa lā quwwah.",
    meaning: "Segala puji bagi Allah yang telah memberiku rezeki makanan ini tanpa ada daya dan kekuatan dariku."
  },
  {
    id: 22,
    title: "Penutup Majelis (Kafaratul Majelis)",
    source: "HR. Abu Daud, Tirmidzi & Nasa'i",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    latin: "Subḥānakallāhumma wa bi ḥamdika, asyhadu allā ilāha illā anta, astagfiruka wa atūbu ilaik.",
    meaning: "Maha Suci Engkau ya Allah dengan memuji-Mu. Aku bersaksi tiada tuhan yang berhak disembah selain Engkau. Aku memohon ampun dan bertobat kepada-Mu."
  },
  {
    id: 23,
    title: "Bepergian (Safar)",
    source: "HR. Muslim",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    latin: "Subḥānallażī sakhkhara lanā hāżā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā lamunqalibūn.",
    meaning: "Maha Suci Allah yang telah menundukkan kendaraan ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami."
  },
  {
    id: 24,
    title: "Sebelum Tidur",
    source: "HR. Bukhari & Muslim",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا",
    latin: "Bismika rabbī waḍa'tu janbī, wa bika arfa'uh. Fa in amsakta nafsī farḥamhā, wa in arsaltahā faḥfaẓhā.",
    meaning: "Dengan nama-Mu wahai Tuhanku, aku meletakkan lambungku dan dengan nama-Mu aku mengangkatnya. Jika Engkau menahan jiwaku maka rahmatilah ia, dan jika Engkau melepaskannya maka jagalah ia."
  },
  {
    id: 25,
    title: "Kebaikan Dunia dan Akhirat (Sapu Jagat)",
    source: "QS. Al-Baqarah: 201 & HR. Abu Daud",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā 'ażāban-nār.",
    meaning: "Ya Tuhan kami, berikanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari siksa api neraka."
  }
];
