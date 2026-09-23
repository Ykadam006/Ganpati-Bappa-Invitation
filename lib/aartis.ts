// The aarti book, in the order we sing. `mr` = मराठी / संस्कृत text, `en` = Hinglish for anyone who reads English.

export type Aarti = {
  name: string;
  hi: string;
  first: string;
  note?: string;
  mr: string;
  en: string;
};

export const aartis: Aarti[] = [
  {
    name: "Shree Ganesh Aarti",
    hi: "श्री गणपतीची आरती",
    first: "सुखकर्ता दुःखहर्ता",
    mr: `सुखकर्ता दुःखहर्ता वार्ता विघ्नाची ।
नुरवी पुरवी प्रेम कृपा जयाची ।
सर्वांगी सुंदर उटी शेंदुराची ।
कंठी झळके माळ मुक्ताफळांची ॥१॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शनमात्रे मनकामना पुरती ॥ धृ ॥
जय देव जय देव

रत्नखचित फरा तुज गौरीकुमरा ।
चंदनाची उटी कुंकुमकेशरा ।
हिरे जडित मुकुट शोभतो बरा ।
रुणझुणती नूपुरे चरणी घागरिया ॥२॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शनमात्रे मनकामना पुरती ॥
जय देव जय देव

लंबोदर पीतांबर फणिवरबंधना ।
सरळ सोंड वक्रतुंड त्रिनयना ।
दास रामाचा वाट पाहे सदना ।
संकटी पावावे निर्वाणी रक्षावे सुरवरवंदना ॥३॥

जय देव जय देव जय मंगलमूर्ती ।
दर्शनमात्रे मनकामना पुरती ॥
जय देव जय देव`,
    en: `Sukhkarta Dukhharta Varta Vighnachi
Nuravi Puravi Prem Krupa Jayachi
Sarvangi Sundar Uti Shendurachi
Kanthi Jhalake Maal Muktafalanchi || 1 ||

Jai Dev Jai Dev Jai Mangal Murti
Darshan Matre Manakamana Purti || Dhru ||
Jai Dev Jai Dev

Ratnakhachit Phara Tuj Gaurikumara
Chandanachi Uti Kumkum Keshara
Hire Jadit Mukut Shobhato Bara
Runjhunati Nupure Charani Ghagariya || 2 ||

Jai Dev Jai Dev Jai Mangal Murti
Darshan Matre Manakamana Purti
Jai Dev Jai Dev

Lambodar Pitambar Phanivar Bandhana
Saral Sond Vakratunda Trinayana
Das Ramacha Vaat Pahe Sadana
Sankati Pavave Nirvani Rakshave Survar Vandana || 3 ||

Jai Dev Jai Dev Jai Mangal Murti
Darshan Matre Manakamana Purti
Jai Dev Jai Dev`,
  },
  {
    name: "Shree Durga Aarti",
    hi: "श्री दुर्गा देवीची आरती",
    first: "दुर्गे दुर्घटभारी",
    mr: `दुर्गे दुर्घटभारी तुजविण संसारी ।
अनाथनाथे अंबे करुणाविस्तारी ।
वारी वारी जन्ममरणांते वारी ।
हारी पडलो आता संकट निवारी ॥१॥

जय देवी जय देवी महिषासुरमथिनी ।
सुरवर ईश्वर वरदे तारकसंजीवनी ॥ धृ ॥
जय देवी जय देवी

त्रिभुवनभुवनी पाहता तुज ऐसी नाही ।
चारी श्रमले परंतु न बोलवे काही ।
साही विवाद करिता पडिले प्रवाही ।
ते तू भक्तालागी पावसी लवलाही ॥२॥

जय देवी जय देवी महिषासुरमथिनी ।
सुरवर ईश्वर वरदे तारकसंजीवनी ॥
जय देवी जय देवी

प्रसन्नवदने प्रसन्न होसी निजदासा ।
क्लेशांपासुनि सोडवी तोडी भवपाशा ।
अंबे तुजवाचून कोण पुरवील आशा ।
नरहरी तल्लीन झाला पदपंकजलेशा ॥३॥

जय देवी जय देवी महिषासुरमथिनी ।
सुरवर ईश्वर वरदे तारकसंजीवनी ॥
जय देवी जय देवी`,
    en: `Durge Durgat Bhari Tujavin Sansari
Anathnathe Ambe Karuna Vistari
Vari Vari Janma Maranate Vari
Hari Padalo Ata Sankat Nivari || 1 ||

Jai Devi Jai Devi Mahishasuramathini
Survar Ishwar Varde Tarak Sanjivani || Dhru ||
Jai Devi Jai Devi

Tribhuvan Bhuvani Pahta Tuj Aisi Nahi
Chari Shramale Parantu Na Bolave Kahi
Sahi Vivad Karita Padile Pravahi
Te Tu Bhaktalagi Pavasi Lavalahi || 2 ||

Jai Devi Jai Devi Mahishasuramathini
Survar Ishwar Varde Tarak Sanjivani
Jai Devi Jai Devi

Prasanna Vadane Prasanna Hosi Nijadasa
Kleshanpasun Sodavi Todi Bhavapasha
Ambe Tujavachun Kon Puravil Asha
Narhari Tallin Jhala Padapankajalesha || 3 ||

Jai Devi Jai Devi Mahishasuramathini
Survar Ishwar Varde Tarak Sanjivani
Jai Devi Jai Devi`,
  },
  {
    name: "Shree Shankar Aarti",
    hi: "श्री शंकराची आरती",
    first: "लवथवती विक्राळा",
    mr: `लवथवती विक्राळा ब्रह्मांडी माळा ।
विषें कंठ काळा त्रिनेत्री ज्वाळा ।
लावण्यसुंदर मस्तकी बाळा ।
तेथुनिया जल निर्मळ वाहे झुळझुळा ॥१॥

जय देव जय देव जय श्रीशंकरा ।
आरती ओवाळू तुज कर्पूरगौरा ॥ धृ ॥
जय देव जय देव

कर्पूरगौरा भोळा नयनी विशाळा ।
अर्धांगी पार्वती सुमनांच्या माळा ।
विभुतीचे उधळण शितिकंठ नीळा ।
ऐसा शंकर शोभे उमावेल्हाळा ॥२॥

जय देव जय देव जय श्रीशंकरा ।
आरती ओवाळू तुज कर्पूरगौरा ॥
जय देव जय देव

देवी दैत्य सागरमंथन पै केले ।
त्यामाजी अवचित हलाहल जे उठिले ।
ते त्वा असुरपणे प्राशन केले ।
नीळकंठ नाम प्रसिद्ध झाले ॥३॥

जय देव जय देव जय श्रीशंकरा ।
आरती ओवाळू तुज कर्पूरगौरा ॥
जय देव जय देव

व्याघ्रांबर फणिवरधर सुंदर मदनारी ।
पंचानन मनमोहन मुनिजनसुखकारी ।
शतकोटीचे बीज वाचे उच्चारी ।
रघुकुळटिळक रामदासा अंतरी ॥४॥

जय देव जय देव जय श्रीशंकरा ।
आरती ओवाळू तुज कर्पूरगौरा ॥
जय देव जय देव`,
    en: `Lavathavati Vikrala Brahmandi Mala
Vishe Kanth Kala Trinetri Jwala
Lavanyasundar Mastaki Bala
Tethuniya Jal Nirmal Vahe Jhuljhula || 1 ||

Jai Dev Jai Dev Jai Shri Shankara
Aarti Ovalu Tuj Karpuragaura || Dhru ||
Jai Dev Jai Dev

Karpuragaura Bhola Nayani Vishala
Ardhangi Parvati Sumananchya Mala
Vibhutiche Udhalan Shitikanth Nila
Aisa Shankar Shobhe Umavelhala || 2 ||

Jai Dev Jai Dev Jai Shri Shankara
Aarti Ovalu Tuj Karpuragaura
Jai Dev Jai Dev

Devi Daitya Sagarmanthan Pai Kele
Tyamaji Avachit Halahal Je Uthile
Te Tva Asurpane Prashan Kele
Nilkanth Naam Prasiddha Jhale || 3 ||

Jai Dev Jai Dev Jai Shri Shankara
Aarti Ovalu Tuj Karpuragaura
Jai Dev Jai Dev

Vyaghrambar Phanivardhar Sundar Madanari
Panchanan Manmohan Munijan Sukhakari
Shatakotiche Beej Vache Uchchari
Raghukultilak Ramdasa Antari || 4 ||

Jai Dev Jai Dev Jai Shri Shankara
Aarti Ovalu Tuj Karpuragaura
Jai Dev Jai Dev`,
  },
  {
    name: "Shree Datta Aarti",
    hi: "श्री दत्ताची आरती",
    first: "त्रिगुणात्मक त्रैमूर्ती",
    mr: `त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा ।
त्रिगुणी अवतार त्रैलोक्यराणा ।
नेति नेति शब्द न ये अनुमाना ।
सुरवर मुनिजन योगी समाधी न ये ध्याना ॥१॥

जय देव जय देव जय श्रीगुरुदत्ता ।
आरती ओवाळिता हरली भवचिंता ॥ धृ ॥
जय देव जय देव

सबाह्य अभ्यंतरी तू एक दत्त ।
अभाग्यासी कैची कळेल ही मात ।
पराही परतली तेथे कैचा हेत ।
जन्ममरणाचा पुरलासे अंत ॥२॥

जय देव जय देव जय श्रीगुरुदत्ता ।
आरती ओवाळिता हरली भवचिंता ॥
जय देव जय देव

दत्त येऊनिया उभा ठाकला ।
सद्भावे साष्टांगे प्रणिपात केला ।
प्रसन्न होऊनी आशीर्वाद दिधला ।
जन्ममरणाचा फेरा चुकविला ॥३॥

जय देव जय देव जय श्रीगुरुदत्ता ।
आरती ओवाळिता हरली भवचिंता ॥
जय देव जय देव

दत्त दत्त ऐसे लागले ध्यान ।
हरपले मन झाले उन्मन ।
मी-तूपणाची झाली बोळवण ।
एका जनार्दनी श्रीदत्त ध्यान ॥४॥

जय देव जय देव जय श्रीगुरुदत्ता ।
आरती ओवाळिता हरली भवचिंता ॥
जय देव जय देव`,
    en: `Trigunatmak Traimurti Datta Ha Jana
Triguni Avatar Trailokyarana
Neti Neti Shabda Na Ye Anumana
Survar Munijan Yogi Samadhi Na Ye Dhyana || 1 ||

Jai Dev Jai Dev Jai Shri Gurudatta
Aarti Ovalita Harali Bhavachinta || Dhru ||
Jai Dev Jai Dev

Sabahya Abhyantari Tu Ek Datta
Abhagyasi Kaichi Kalel Hi Maat
Parahi Paratali Tethe Kaicha Het
Janma Maranacha Puralase Ant || 2 ||

Jai Dev Jai Dev Jai Shri Gurudatta
Aarti Ovalita Harali Bhavachinta
Jai Dev Jai Dev

Datta Yeuniya Ubha Thakala
Sadbhave Sashtange Pranipat Kela
Prasanna Houni Ashirvad Didhala
Janma Maranacha Phera Chukavila || 3 ||

Jai Dev Jai Dev Jai Shri Gurudatta
Aarti Ovalita Harali Bhavachinta
Jai Dev Jai Dev

Datta Datta Aise Lagale Dhyan
Harapale Man Jhale Unman
Mi Tu Panachi Jhali Bolavan
Eka Janardani Shri Datta Dhyan || 4 ||

Jai Dev Jai Dev Jai Shri Gurudatta
Aarti Ovalita Harali Bhavachinta
Jai Dev Jai Dev`,
  },
  {
    name: "Shree Vitthal Aarti",
    hi: "श्री विठ्ठलाची आरती",
    first: "येई हो विठ्ठले",
    mr: `येई हो विठ्ठले माझे माऊली ये ।
निढळावरी कर ठेवुनी वाट मी पाहे ॥ धृ ॥

आलिया गेलिया हाती धाडी निरोप ।
पंढरपुरी आहे माझा मायबाप ॥१॥

येई हो विठ्ठले माझे माऊली ये ।
निढळावरी कर ठेवुनी वाट मी पाहे ॥

पिवळा पीतांबर कैसा गगनी झळकला ।
गरुडावरी बैसोनी माझा कैवारी आला ॥२॥

येई हो विठ्ठले माझे माऊली ये ।
निढळावरी कर ठेवुनी वाट मी पाहे ॥

विठोबाचे राज्य आम्हां नित्य दिपवाळी ।
विष्णुदास नामा जीवेभावे ओवाळी ॥३॥

येई हो विठ्ठले माझे माऊली ये ।
निढळावरी कर ठेवुनी वाट मी पाहे ॥`,
    en: `Yei Ho Vitthale Majhe Mauli Ye
Nidhalavari Kar Thevuni Vaat Mi Pahe || Dhru ||

Aliya Geliya Hati Dhadi Nirop
Pandharpuri Aahe Majha Maybaap || 1 ||

Yei Ho Vitthale Majhe Mauli Ye
Nidhalavari Kar Thevuni Vaat Mi Pahe

Pivala Pitambar Kaisa Gagani Jhalakala
Garudavari Baisoni Majha Kaivari Ala || 2 ||

Yei Ho Vitthale Majhe Mauli Ye
Nidhalavari Kar Thevuni Vaat Mi Pahe

Vitthobache Rajya Amha Nitya Dipavali
Vishnudas Nama Jivebhave Ovali || 3 ||

Yei Ho Vitthale Majhe Mauli Ye
Nidhalavari Kar Thevuni Vaat Mi Pahe`,
  },
  {
    name: "Karpura Aarti",
    hi: "कर्पूरगौरं",
    first: "कर्पूरगौरं करुणावतारं",
    mr: `कर्पूरगौरं करुणावतारं
संसारसारं भुजगेन्द्रहारम् ।
सदा वसन्तं हृदयारविन्दे
भवं भवानीसहितं नमामि ॥१॥

मन्दारमालाकुलितालकायै
कपालमालांकितकन्धराय ।
दिव्याम्बरायै च दिगम्बराय
नमः शिवायै च नमः शिवाय ॥२॥

कर्पूर महादीपं समर्पयामि ॥`,
    en: `Karpura Gauram Karunavataram
Samsara Saram Bhujagendra Haram
Sada Vasantam Hridayaravinde
Bhavam Bhavani Sahitam Namami || 1 ||

Mandara Mala Kalitalakaye
Kapala Malankita Kandharaya
Divyambarayai Cha Digambaraya
Namah Shivayai Cha Namah Shivaya || 2 ||

Karpura Mahadeepam Samarpayami`,
  },
  {
    name: "Ghalin Lotangan",
    hi: "घालीन लोटांगण",
    first: "घालीन लोटांगण वंदीन चरण",
    mr: `घालीन लोटांगण वंदीन चरण ।
डोळ्यांनी पाहीन रूप तुझे ।
प्रेमे आलिंगीन आनंदे पूजीन ।
भावे ओवाळीन म्हणे नामा ॥१॥

त्वमेव माता च पिता त्वमेव ।
त्वमेव बन्धुश्च सखा त्वमेव ।
त्वमेव विद्या द्रविणं त्वमेव ।
त्वमेव सर्वं मम देवदेव ॥२॥

कायेन वाचा मनसेंद्रियैर्वा ।
बुद्ध्यात्मना वा प्रकृतिस्वभावात् ।
करोमि यद्यत्सकलं परस्मै ।
नारायणायेति समर्पयामि ॥३॥

अच्युतं केशवं रामनारायणं ।
कृष्णदामोदरं वासुदेवं हरिम् ।
श्रीधरं माधवं गोपिकावल्लभं ।
जानकीनायकं रामचंद्रं भजे ॥४॥

हरे राम हरे राम राम राम हरे हरे ।
हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ॥

मंगलमूर्ती मोरया ।
गणपती बाप्पा मोरया ॥`,
    en: `Ghalin Lotangan Vandin Charan
Dolyanni Pahin Roop Tujhe
Preme Aalingin Aanande Pujin
Bhave Ovalin Mhane Nama || 1 ||

Tvameva Mata Cha Pita Tvameva
Tvameva Bandhushcha Sakha Tvameva
Tvameva Vidya Dravinam Tvameva
Tvameva Sarvam Mama Deva-Deva || 2 ||

Kayena Vacha Manasendriyairva
Buddhyatmana Va Prakriti Svabhavat
Karomi Yadyat Sakalam Parasmai
Narayanayeti Samarpayami || 3 ||

Achyutam Keshavam Rama Narayanam
Krishna Damodaram Vasudevam Harim
Shridharam Madhavam Gopikavallabham
Janakinayakam Ramachandram Bhaje || 4 ||

Hare Rama Hare Rama Rama Rama Hare Hare
Hare Krishna Hare Krishna Krishna Krishna Hare Hare

Mangal Murti Morya
Ganpati Bappa Morya`,
  },
  {
    name: "Mantra Pushpanjali",
    hi: "मंत्रपुष्पांजली",
    first: "ॐ यज्ञेन यज्ञमयजन्त देवा",
    mr: `ॐ यज्ञेन यज्ञमयजन्त देवास्तानि धर्माणि प्रथमान्यासन् ।
ते ह नाकं महिमानः सचन्त यत्र पूर्वे साध्याः सन्ति देवाः ॥

ॐ राजाधिराजाय प्रसह्यसाहिने ।
नमो वयं वैश्रवणाय कुर्महे ।
स मे कामान् कामकामाय मह्यं
कामेश्वरो वैश्रवणो ददातु ।
कुबेराय वैश्रवणाय महाराजाय नमः ॥

ॐ स्वस्ति ।

साम्राज्यं भौज्यं स्वाराज्यं वैराज्यं पारमेष्ठ्यं
राज्यं महाराज्यमाधिपत्यमयं समन्तपर्यायी स्यात् ।
सार्वभौमः सार्वायुष आन्तादापरार्धात् ।
पृथिव्यै समुद्रपर्यन्ताया एकराळिति ॥

तदप्येष श्लोकोऽभिगीतो ।
मरुतः परिवेष्टारो मरुत्तस्यावसन् गृहे ।
आविक्षितस्य कामप्रेर्विश्वेदेवाः सभासद इति ॥

ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि ।
तन्नो दन्ती प्रचोदयात् ॥`,
    en: `Om Yajnena Yajnam Ayajanta Deva
Tani Dharmani Prathamanyasan
Te Ha Nakam Mahimanah Sachanta
Yatra Purve Sadhyah Santi Devah

Om Rajadhirajaya Prasahya Sahine
Namo Vayam Vaishravanaya Kurmahe
Sa Me Kaman Kamakamaya Mahyam
Kameshwaro Vaishravano Dadatu
Kuberaya Vaishravanaya Maharajaya Namah

Om Swasti

Samrajyam Bhaujyam Swarajyam Vairajyam Parameshthyam
Rajyam Maharajyam Adhipatyamayam Samantaparyayi Syat
Sarvabhaumah Sarvayusha Antadaparardhat
Prithivyai Samudraparyantaya Ekaraliti

Tadapyesha Shloko'bhigito
Marutah Pariveshtaro Maruttasyavasan Grihe
Avikshitasya Kamaprervishvedevah Sabhasada Iti

Om Ekadantaya Vidmahe Vakratundaya Dhimahi
Tanno Danti Prachodayat`,
  },
  {
    name: "Closing Shloks",
    hi: "शेवटचे श्लोक",
    first: "सदा सर्वदा योग तुझा घडावा",
    mr: `सदा सर्वदा योग तुझा घडावा ।
तुझे कारणी देह माझा पडावा ।
उपेक्षू नको गुणवंता अनंता ।
रघुनायका मागणे हेचि आता ॥

जय जय रघुवीर समर्थ ॥

कैलासराणा शिव चंद्रमौळी ।
फणिंद्र माथा मुकुटी झळाळी ।
कारुण्यसिंधू भवदुःखहारी ।
तुजवीण शंभो मज कोण तारी ॥

मोरया मोरया मी बाळ तान्हे ।
तुझीच सेवा करू काय जाणे ।
अन्याय माझे कोट्यानुकोटी ।
मोरेश्वरा बा तू घाल पोटी ॥

ज्या ज्या ठिकाणी मन जाय माझे ।
त्या त्या ठिकाणी निजरूप तुझे ।
मी ठेवितो मस्तक ज्या ठिकाणी ।
तेथे तुझे सद्गुरू पाय दोन्ही ॥

आळंकापुरी पुण्यभूमी पवित्र ।
तिथे नांदतो ज्ञानराजा सुपात्र ।
तया आठविता महापुण्यराशी ।
नमस्कार माझा सद्गुरू ज्ञानेश्वराशी ॥`,
    en: `Sada Sarvada Yog Tujha Ghadava
Tujhe Karani Deh Majha Padava
Upekshu Nako Gunavanta Ananta
Raghunayaka Magane Hechi Ata

Jai Jai Raghuveer Samarth

Kailasrana Shiv Chandramauli
Phanindra Matha Mukuti Jhalali
Karunya Sindhu Bhavadukhahari
Tujavin Shambho Maj Kon Tari

Morya Morya Mi Bal Tanhe
Tujhich Seva Karu Kay Jane
Anyay Majhe Kotyanukoti
Moreshwara Ba Tu Ghal Poti

Jya Jya Thikani Man Jay Majhe
Tya Tya Thikani Nijroop Tujhe
Mi Thevito Mastak Jya Thikani
Tethe Tujhe Sadguru Paay Donhi

Alankapuri Punya Bhumi Pavitra
Tithe Nandato Dnyanaraja Supatra
Taya Athavita Mahapunya Rashi
Namaskar Majha Sadguru Dnyaneshwarashi`,
  },
  {
    name: "Ganpati Nirop Aarti",
    hi: "गणपती निरोप आरती",
    first: "जाहले भजन आम्ही नमितो तव चरणां",
    note: "Visarjan / Nirop day only",
    mr: `जाहले भजन आम्ही नमितो तव चरणां ।
आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने, वारुनिया विघ्ने
देवा रक्षावे दीना ॥ धृ ॥

दास तुझे आम्ही देवा तुजलाची ध्यातो ।
देवा तुजलाची ध्यातो ।
प्रेमे करुनिया देवा,
प्रेमे करुनिया देवा गुण तुझे गातो ॥१॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

तरी न्यावी सिद्धी देवा हेचि वासना ।
देवा हेचि वासना ।
रक्षूनिया सकळा,
रक्षूनिया सकळा द्यावी आम्हांसी आज्ञा ॥२॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

मागणे ते देवा आता एकची आहे ।
आता एकची आहे ।
तारुनिया सकळा,
तारुनिया सकळा आम्हा कृपादृष्टी पाहे ॥३॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

जेव्हा सर्व आम्ही मिळू ऐशा या ठाया ।
देवा ऐशा या ठाया ।
प्रेमानंदे लागू,
प्रेमानंदे लागू तुझी कीर्ती वर्णाया ॥४॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

सदा ऐसी भक्ती राहो आमुच्या मनी ।
देवा आमुच्या मनी ।
हेचि देवा तुम्हां,
हेचि देवा तुम्हां असे नित्य विनवणी ॥५॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

वारुनिया संकटे आता आमुची सारी ।
आता आमुची सारी ।
कृपेची सावली,
कृपेची सावली देवा दीनावरी करी ॥६॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

निरंतर आमुची चिंता तुम्हां असावी ।
चिंता तुम्हां असावी ।
सर्वांची लज्जा देवा तुम्ही रक्षावी ॥७॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥

निरोप घेतो आता आम्हा आज्ञा असावी ।
आम्हा आज्ञा असावी ।
चुकले आमुचे काही,
चुकले आमुचे काही त्याची क्षमा असावी ॥८॥

जाहले भजन आम्ही नमितो तव चरणां ।
वारुनिया विघ्ने देवा रक्षावे दीना ॥`,
    en: `Jahale Bhajan Amhi Namito Tav Charana
Amhi Namito Tav Charana
Varuniya Vighne, Varuniya Vighne
Deva Rakshave Dina || Dhru ||

Das Tujhe Amhi Deva Tujalachi Dhyato
Deva Tujalachi Dhyato
Preme Karuniya Deva
Preme Karuniya Deva Gun Tujhe Gato || 1 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Tari Nyavi Siddhi Deva Hechi Vasana
Deva Hechi Vasana
Rakshuniya Sakala
Rakshuniya Sakala Dyavi Amhasi Adnya || 2 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Magane Te Deva Ata Ekachi Aahe
Ata Ekachi Aahe
Taruniya Sakala
Taruniya Sakala Amha Krupadrushti Pahe || 3 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Jevha Sarva Amhi Milu Aisha Ya Thaya
Deva Aisha Ya Thaya
Premanande Lagu
Premanande Lagu Tujhi Kirti Varnaya || 4 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Sada Aisi Bhakti Raho Amuchya Mani
Deva Amuchya Mani
Hechi Deva Tumha
Hechi Deva Tumha Ase Nitya Vinavani || 5 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Varuniya Sankate Ata Amuchi Sari
Ata Amuchi Sari
Krupechi Savali
Krupechi Savali Deva Dinavari Kari || 6 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Nirantar Amuchi Chinta Tumha Asavi
Chinta Tumha Asavi
Sarvanchi Lajja Deva Tumhi Rakshavi || 7 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina

Nirop Gheto Ata Amha Adnya Asavi
Amha Adnya Asavi
Chukale Amuche Kahi
Chukale Amuche Kahi Tyachi Kshama Asavi || 8 ||

Jahale Bhajan Amhi Namito Tav Charana
Varuniya Vighne Deva Rakshave Dina`,
  },
];
