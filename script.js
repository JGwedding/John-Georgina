const weddingDate = new Date("2026-09-25T19:00:00+02:00");
const params = new URLSearchParams(window.location.search);
let guestName = params.get("guest") || params.get("name") || "";
let guestParty = params.get("party") || "";
const inviteToken = params.get("invite") || "";
const skipIntro = params.get("open") === "1";

document.body.classList.add("motion-ready");

const translations = {
  sv: {
    documentTitle: "John & Georgina | Bröllop",
    metaDescription: "Bröllopsinbjudan för John och Georgina, 25 september 2026.",
    gateAria: "Öppna inbjudan",
    headerAria: "Sidhuvud",
    brandAria: "John och Georgina",
    navAria: "Huvudnavigation",
    settingsAria: "Inställningar",
    languageAria: "Språk",
    musicPlay: "Spela musik",
    musicStop: "Stoppa musik",
    musicStateOn: "På",
    musicStateOff: "Av",
    heroAria: "Bröllopsinbjudan",
    heroPhotosAria: "Förlovningsbilder",
    essentialsAria: "Viktig information",
    countdownAria: "Nedräkning",
    travelMapAria: "Karta till Tensta Maria kyrka",
    mediaDialogLabel: "Media",
    mediaClose: "Stäng",
    mediaPrev: "Föregående",
    mediaNext: "Nästa",
    gateKicker: "John & Georgina",
    gateTitle: "Vi gifter oss",
    openInvitation: "Öppna inbjudan",
    guestLine: "Särskilt inbjuden: {guest}",
    guestLineParty: "Särskilt inbjudna: {guest}",
    partyLine: "Denna inbjudan gäller {party} personer",
    navDetails: "Detaljer",
    navGallery: "Galleri",
    heroKicker: "Bröllopsinbjudan",
    verse: "Det Gud har fogat samman får människan inte skilja åt",
    heroDate: "Markus 10:9",
    essentialDateLabel: "Datum",
    essentialDateValue: "Fredag 25 september 2026",
    calendarMonth: "September 2026",
    calendarMon: "Mån",
    calendarTue: "Tis",
    calendarWed: "Ons",
    calendarThu: "Tor",
    calendarFri: "Fre",
    calendarSat: "Lör",
    calendarSun: "Sön",
    essentialTimeLabel: "Tid",
    essentialTimeValue: "19:00 vigsel",
    essentialCeremonyTime: "19:00 vigsel",
    essentialReceptionTime: "20:00 Bröllopsfest",
    essentialCeremonyLabel: "Vigsel i Tensta Maria kyrka",
    essentialReceptionLabel: "Bröllopsfest",
    essentialCeremonyNote: "Bröllopsfest äger rum efter vigselceremonin i kyrkans festlokal.",
    essentialPlaceLabel: "Plats",
    essentialPlaceValue: "Tensta Maria kyrka",
    countdownEyebrow: "Nedräkning",
    countdownTitle: "Tills vi säger ja",
    countdownNote: "Sanden räknar ner till vår stora dag.",
    days: "Dagar",
    hours: "Timmar",
    minutes: "Minuter",
    seconds: "Sekunder",
    detailsEyebrow: "Dagens detaljer",
    detailsTitle: "Ceremoni och fest",
    ceremonyTitle: "Ceremoni",
    ceremonyBody:
      "Vigseln hålls i Tensta Maria kyrka. Kom gärna i god tid så vi kan börjnt och vackert tillsammans.a kvällen lug",
    mapLink: "Öppna karta",
    receptionTitle: "Fest",
    receptionBody:
      "Efter ceremonin fortsätter firandet i kyrkans lokal med mat, musik och minnen vi kommer bära med oss livet ut.",
    mapBusLabel: "Buss: Krällingegränd",
    mapMetroLabel: "Tensta T-bana",
    storyEyebrow: "Vår berättelse",
    storyTitle: "Från ett ja i hjärtat till ett ja inför Gud",
    storyBody:
      "Vår berättelse är fylld av små ögonblick som blev stora: skratt, samtal, bön, familj och en kärlek som växte till ett löfte. Nu går vi in i ett nytt kapitel, tacksamma för allt som varit och för allt Gud lägger framför oss.",
    journey2015Title: "Första kapitlet",
    journey2015Body: "Början på en berättelse som sakta växte till något större.",
    journey2020Title: "När något nytt tog sin början",
    journey2020Body: "En tid av samtal, skratt och ögonblick som förde oss närmare varandra.",
    journey2023Title: "När framtiden fick en ny betydelse",
    journey2023Body: "Det vi byggt tillsammans blev till ett stilla löfte om allt som ännu låg framför oss.",
    journey2026Title: "Bröllopsdagen",
    journey2026Body: "Den 25 september börjar vårt nya kapitel i Tensta Maria kyrka.",
    galleryEyebrow: "Bilder och video",
    galleryTitle: "Några ögonblick från vägen hit",
    playVideo: "Spela video",
    uploadPhotosBody: "Dela bilder och filmer via Dropbox. Uppladdningar visas offentligt här efter nästa uppdatering. Inget Dropbox-konto behövs.",
    uploadPhotos: "Ladda upp bilder",
    footerText: "25 september 2026 | Tensta Maria kyrka",
    heroPhotoAltOne: "John och Georgina vid vattnet i solnedgången",
    heroPhotoAltTwo: "John och Georgina framför vattnet",
    heroPhotoAltThree: "John och Georgina i kyrkan",
    detailPhotoAlt: "John och Georgina i Tensta Maria kyrka",
    galleryAltDock: "John och Georgina på bryggan vid vattnet",
    galleryAltChurch: "John och Georgina i kyrkan",
    galleryAltSunset: "John och Georgina vid solnedgången",
    galleryAltAltar: "John och Georgina framför altaret",
    galleryAltLaughing: "John och Georgina skrattar vid vattnet",
    galleryAltWindow: "John och Georgina ler mot varandra vid ett ljust fönster",
    galleryAltKiss: "John kysser Georgina på kinden i en utsmyckad sal",
    galleryAltHall: "John och Georgina står tillsammans i en historisk sal",
    galleryAltPortrait: "John och Georgina skrattar tillsammans i ett svartvitt porträtt",
    galleryAltStairs: "John och Georgina går hand i hand uppför en stentrappa",
  },
  en: {
    documentTitle: "John & Georgina | Wedding",
    metaDescription: "Wedding invitation for John and Georgina, September 25, 2026.",
    gateAria: "Open invitation",
    headerAria: "Header",
    brandAria: "John and Georgina",
    navAria: "Main navigation",
    settingsAria: "Settings",
    languageAria: "Language",
    musicPlay: "Play music",
    musicStop: "Stop music",
    musicStateOn: "On",
    musicStateOff: "Off",
    heroAria: "Wedding invitation",
    heroPhotosAria: "Engagement photos",
    essentialsAria: "Important information",
    countdownAria: "Countdown",
    travelMapAria: "Map to Tensta Maria Church",
    mediaDialogLabel: "Media",
    mediaClose: "Close",
    mediaPrev: "Previous",
    mediaNext: "Next",
    gateKicker: "John & Georgina",
    gateTitle: "We are getting married",
    openInvitation: "Open invitation",
    guestLine: "Especially invited: {guest}",
    guestLineParty: "Especially invited: {guest}",
    partyLine: "This invitation is for {party} people",
    navDetails: "Details",
    navGallery: "Gallery",
    heroKicker: "Wedding invitation",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "Mark 10:9",
    essentialDateLabel: "Date",
    essentialDateValue: "Friday, September 25, 2026",
    calendarMonth: "September 2026",
    calendarMon: "Mon",
    calendarTue: "Tue",
    calendarWed: "Wed",
    calendarThu: "Thu",
    calendarFri: "Fri",
    calendarSat: "Sat",
    calendarSun: "Sun",
    essentialTimeLabel: "Time",
    essentialTimeValue: "19:00 ceremony",
    essentialCeremonyTime: "19:00 ceremony",
    essentialReceptionTime: "20:00 Wedding reception",
    essentialCeremonyLabel: "Ceremony at Tensta Maria Church",
    essentialReceptionLabel: "Wedding reception",
    essentialCeremonyNote: "The wedding reception takes place after the ceremony in the church reception hall.",
    essentialPlaceLabel: "Place",
    essentialPlaceValue: "Tensta Maria Church",
    countdownEyebrow: "Countdown",
    countdownTitle: "Until we say I do",
    countdownNote: "The sand is counting down to our day.",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    detailsEyebrow: "The details",
    detailsTitle: "Ceremony and celebration",
    ceremonyTitle: "Ceremony",
    ceremonyBody:
      "The ceremony will take place at Tensta Maria Church. Please arrive a little early so we can begin the evening calmly and beautifully together.",
    mapLink: "Open map",
    receptionTitle: "Reception",
    receptionBody:
      "After the ceremony, the celebration continues in the church hall with food, music and memories we will carry for life.",
    mapBusLabel: "Bus: Krällingegränd",
    mapMetroLabel: "Tensta metro",
    storyEyebrow: "Our story",
    storyTitle: "From yes in the heart to yes before God",
    storyBody:
      "Our story is filled with small moments that became great ones: laughter, conversations, prayer, family and a love that grew into a promise. Now we enter a new chapter, grateful for everything behind us and everything God places before us.",
    journey2015Title: "The first chapter",
    journey2015Body: "The beginning of a story that slowly grew into something greater.",
    journey2020Title: "A memory that stayed",
    journey2020Body: "A season of conversations, laughter and moments that brought us closer together.",
    journey2023Title: "When everything became clearer",
    journey2023Body: "Love grew into a promise, and the future began to feel certain.",
    journey2026Title: "The wedding day",
    journey2026Body: "On September 25, our new chapter begins at Tensta Maria Church.",
    galleryEyebrow: "Photos and video",
    galleryTitle: "A few moments from the road here",
    playVideo: "Play video",
    uploadPhotosBody: "Share photos and videos via Dropbox. Uploads appear publicly here after the next update. No Dropbox account needed.",
    uploadPhotos: "Upload photos",
    footerText: "September 25, 2026 | Tensta Maria Church",
    heroPhotoAltOne: "John and Georgina by the water at sunset",
    heroPhotoAltTwo: "John and Georgina by the water",
    heroPhotoAltThree: "John and Georgina in the church",
    detailPhotoAlt: "John and Georgina in Tensta Maria Church",
    galleryAltDock: "John and Georgina on the dock by the water",
    galleryAltChurch: "John and Georgina in the church",
    galleryAltSunset: "John and Georgina at sunset",
    galleryAltAltar: "John and Georgina before the altar",
    galleryAltLaughing: "John and Georgina laughing by the water",
    galleryAltWindow: "John and Georgina smiling at each other by a bright window",
    galleryAltKiss: "John kissing Georgina on the cheek in an ornate hall",
    galleryAltHall: "John and Georgina standing together in a historic hall",
    galleryAltPortrait: "John and Georgina laughing together in a black-and-white portrait",
    galleryAltStairs: "John and Georgina walking hand in hand up a stone staircase",
  },
  ar: {
    documentTitle: "John & Georgina | الزفاف",
    metaDescription: "دعوة زفاف John وGeorgina، 25 سبتمبر 2026.",
    gateAria: "افتح الدعوة",
    headerAria: "رأس الصفحة",
    brandAria: "John وGeorgina",
    navAria: "التنقل الرئيسي",
    settingsAria: "الإعدادات",
    languageAria: "اللغة",
    musicPlay: "تشغيل الموسيقى",
    musicStop: "إيقاف الموسيقى",
    musicStateOn: "تشغيل",
    musicStateOff: "إيقاف",
    heroAria: "دعوة زفاف",
    heroPhotosAria: "صور الخطوبة",
    essentialsAria: "معلومات مهمة",
    countdownAria: "العد التنازلي",
    travelMapAria: "خريطة الوصول إلى كنيسة تنستا ماريا",
    mediaDialogLabel: "الوسائط",
    mediaClose: "إغلاق",
    mediaPrev: "السابق",
    mediaNext: "التالي",
    gateKicker: "John & Georgina",
    gateTitle: "سنتزوج",
    openInvitation: "افتح الدعوة",
    guestLine: "دعوة خاصة إلى: {guest}",
    guestLineParty: "دعوة خاصة إلى: {guest}",
    partyLine: "هذه الدعوة مخصصة لعدد {party} أشخاص",
    navDetails: "التفاصيل",
    navGallery: "الصور",
    heroKicker: "دعوة زفاف",
    verse: "ما جمعه الله لا يفرقه إنسان",
    heroDate: "مرقس 10:9",
    essentialDateLabel: "التاريخ",
    essentialDateValue: "الجمعة 25 سبتمبر 2026",
    calendarMonth: "سبتمبر 2026",
    calendarMon: "إثن",
    calendarTue: "ثلا",
    calendarWed: "أرب",
    calendarThu: "خمي",
    calendarFri: "جمع",
    calendarSat: "سبت",
    calendarSun: "أحد",
    essentialTimeLabel: "الوقت",
    essentialTimeValue: "المراسم 19:00",
    essentialCeremonyTime: "19:00 المراسم",
    essentialReceptionTime: "20:00 حفل الزفاف",
    essentialCeremonyLabel: "المراسم في كنيسة تنستا ماريا",
    essentialReceptionLabel: "حفل الزفاف",
    essentialCeremonyNote: "يقام حفل الزفاف بعد المراسم في قاعة الكنيسة.",
    essentialPlaceLabel: "المكان",
    essentialPlaceValue: "كنيسة تنستا ماريا",
    countdownEyebrow: "العد التنازلي",
    countdownTitle: "حتى نقول نعم",
    countdownNote: "الرمال تعدّ الوقت المتبقي ليومنا الكبير.",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوان",
    detailsEyebrow: "تفاصيل اليوم",
    detailsTitle: "المراسم والاحتفال",
    ceremonyTitle: "المراسم",
    ceremonyBody:
      "ستقام المراسم في كنيسة تنستا ماريا. نرجو الحضور مبكرا قليلا لنبدأ الأمسية بهدوء وجمال معا.",
    mapLink: "فتح الخريطة",
    receptionTitle: "الاحتفال",
    receptionBody:
      "بعد المراسم نكمل الاحتفال في قاعة الكنيسة مع الطعام والموسيقى والذكريات الجميلة.",
    mapBusLabel: "الحافلة: Krällingegränd",
    mapMetroLabel: "مترو Tensta",
    storyEyebrow: "قصتنا",
    storyTitle: "من نعم في القلب إلى نعم أمام الله",
    storyBody:
      "قصتنا مليئة بلحظات صغيرة أصبحت كبيرة: ضحك، أحاديث، صلاة، عائلة ومحبة كبرت حتى أصبحت وعدا. والآن نبدأ فصلا جديدا بامتنان لكل ما مضى ولكل ما يضعه الله أمامنا.",
    journey2015Title: "الفصل الأول",
    journey2015Body: "بداية قصة نمت بهدوء حتى أصبحت شيئا أكبر.",
    journey2020Title: "ذكرى بقيت معنا",
    journey2020Body: "وقت من الأحاديث والضحك واللحظات التي قربتنا من بعضنا.",
    journey2023Title: "عندما اتضح كل شيء",
    journey2023Body: "كبرت المحبة حتى أصبحت وعدا، وأصبح المستقبل أوضح.",
    journey2026Title: "يوم الزفاف",
    journey2026Body: "في 25 سبتمبر يبدأ فصلنا الجديد في كنيسة تنستا ماريا.",
    galleryEyebrow: "صور وفيديو",
    galleryTitle: "بعض اللحظات من الطريق إلى هنا",
    playVideo: "تشغيل الفيديو",
    uploadPhotosBody: "شاركوا صوركم ومقاطع الفيديو عبر Dropbox. ستظهر المشاركات للجميع هنا بعد التحديث التالي. لا تحتاجون إلى حساب Dropbox.",
    uploadPhotos: "رفع الصور",
    footerText: "25 سبتمبر 2026 | كنيسة تنستا ماريا",
    heroPhotoAltOne: "John وGeorgina بجانب الماء عند الغروب",
    heroPhotoAltTwo: "John وGeorgina بجانب الماء",
    heroPhotoAltThree: "John وGeorgina في الكنيسة",
    detailPhotoAlt: "John وGeorgina في كنيسة تنستا ماريا",
    galleryAltDock: "John وGeorgina على الرصيف بجانب الماء",
    galleryAltChurch: "John وGeorgina في الكنيسة",
    galleryAltSunset: "John وGeorgina عند الغروب",
    galleryAltAltar: "John وGeorgina أمام المذبح",
    galleryAltLaughing: "John وGeorgina يضحكان بجانب الماء",
    galleryAltWindow: "John وGeorgina يبتسمان لبعضهما بجانب نافذة مضيئة",
    galleryAltKiss: "John يقبّل Georgina على خدها في قاعة مزخرفة",
    galleryAltHall: "John وGeorgina يقفان معا في قاعة تاريخية",
    galleryAltPortrait: "John وGeorgina يضحكان معا في صورة بالأبيض والأسود",
    galleryAltStairs: "John وGeorgina يصعدان سلما حجريا وهما يمسكان بأيدي بعضهما",
  },
};

const galleryItems = [
  {
    type: "image",
    src: "assets/images/q.jfif",
    altKey: "galleryAltDock",
    caption: {
      sv: "Vid vattnet i kvällsljuset",
      en: "By the water in the evening light",
      ar: "بجانب الماء في ضوء المساء",
    },
  },
  {
    type: "image",
    src: "assets/images/t.jfif",
    altKey: "galleryAltChurch",
    caption: {
      sv: "En stund i kyrkan",
      en: "A moment in the church",
      ar: "لحظة في الكنيسة",
    },
  },
  {
    type: "image",
    src: "assets/images/e.jfif",
    altKey: "galleryAltSunset",
    caption: {
      sv: "Solnedgång vid vattnet",
      en: "Sunset by the water",
      ar: "غروب الشمس بجانب الماء",
    },
  },
  {
    type: "video",
    src: "assets/images/wedding-video.mp4",
    poster: "assets/images/w.jfif",
    caption: {
      sv: "En kort film från vägen hit",
      en: "A short film from the road here",
      ar: "فيلم قصير من الطريق إلى هنا",
    },
  },
  {
    type: "image",
    src: "assets/images/r.jfif",
    altKey: "galleryAltAltar",
    caption: {
      sv: "Framför altaret",
      en: "Before the altar",
      ar: "أمام المذبح",
    },
  },
  {
    type: "image",
    src: "assets/images/w.jfif",
    altKey: "galleryAltLaughing",
    caption: {
      sv: "Glädje vid vattnet",
      en: "Joy by the water",
      ar: "فرح بجانب الماء",
    },
  },
  {
    type: "image",
    src: "assets/images/WhatsApp Image 2026-07-21 at 11.35.50.jpeg",
    altKey: "galleryAltWindow",
    caption: {
      sv: "Ett leende mellan oss",
      en: "A smile between us",
      ar: "ابتسامة تجمعنا",
    },
  },
  {
    type: "image",
    src: "assets/images/WhatsApp Image 2026-07-21 at 11.35.57.jpeg",
    altKey: "galleryAltKiss",
    caption: {
      sv: "En kyss i den historiska salen",
      en: "A kiss in the historic hall",
      ar: "قبلة في القاعة التاريخية",
    },
  },
  {
    type: "image",
    src: "assets/images/WhatsApp Image 2026-07-21 at 15.43.40.jpeg",
    altKey: "galleryAltHall",
    caption: {
      sv: "Tillsammans i den stora salen",
      en: "Together in the grand hall",
      ar: "معا في القاعة الكبرى",
    },
  },
  {
    type: "image",
    src: "assets/images/WhatsApp Image 2026-07-21 at 15.44.25.jpeg",
    altKey: "galleryAltPortrait",
    caption: {
      sv: "Ett ögonblick av glädje",
      en: "A moment of joy",
      ar: "لحظة من الفرح",
    },
  },
  {
    type: "image",
    src: "assets/images/WhatsApp Image 2026-07-21 at 15.48.13.jpeg",
    altKey: "galleryAltStairs",
    caption: {
      sv: "Hand i hand",
      en: "Hand in hand",
      ar: "يدا بيد",
    },
  },
];

function shuffleGalleryPhotos() {
  const grid = document.querySelector("#mediaGrid");
  if (!grid) {
    return;
  }

  const originalTiles = Array.from(grid.querySelectorAll("[data-media]"));
  const fixedItems = Array.from(grid.children).filter((item) => !item.matches("[data-media]"));
  const getLayoutGroup = (tile) => {
    if (tile.classList.contains("media-wide")) return "wide";
    if (tile.classList.contains("media-tall")) return "tall";
    return "standard";
  };
  const groups = new Map();

  originalTiles
    .filter((tile) => !tile.classList.contains("media-video"))
    .forEach((tile) => {
      const group = getLayoutGroup(tile);
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(tile);
    });

  groups.forEach((tiles) => {
    for (let index = tiles.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [tiles[index], tiles[randomIndex]] = [tiles[randomIndex], tiles[index]];
    }
  });

  const groupPositions = new Map();
  const shuffledTiles = originalTiles.map((tile) => {
    if (tile.classList.contains("media-video")) return tile;
    const group = getLayoutGroup(tile);
    const position = groupPositions.get(group) || 0;
    groupPositions.set(group, position + 1);
    return groups.get(group)[position];
  });
  const shuffledItems = shuffledTiles.map((tile) => galleryItems[Number(tile.dataset.media)]);

  galleryItems.splice(0, galleryItems.length, ...shuffledItems);
  shuffledTiles.forEach((tile, index) => {
    tile.dataset.media = String(index);
  });
  grid.replaceChildren(...shuffledTiles, ...fixedItems);
}

shuffleGalleryPhotos();

let activeLang = "sv";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(0, weddingDate - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.querySelector('[data-time="days"]').textContent = String(days);
  document.querySelector('[data-time="hours"]').textContent = String(hours);
  document.querySelector('[data-time="minutes"]').textContent = String(minutes);
  document.querySelector('[data-time="seconds"]').textContent = String(seconds);

  const countdown = document.querySelector("#countdown");
  if (countdown) {
    const displayWindow = 365 * 86400000;
    const sandRemaining = Math.min(1, distance / displayWindow);
    countdown.style.setProperty("--sand-remaining", sandRemaining.toFixed(4));
    countdown.style.setProperty("--sand-collected", (1 - sandRemaining).toFixed(4));
  }
}

function getGuestLine() {
  if (!guestName) {
    return "";
  }

  const copy = translations[activeLang];
  const template = guestParty ? copy.guestLineParty : copy.guestLine;
  return template.replace("{guest}", guestName).replace("{party}", guestParty);
}

function getPartyLine() {
  if (!guestParty) {
    return "";
  }

  return translations[activeLang].partyLine.replace("{party}", guestParty);
}

function applyGuestPersonalization() {
  const line = getGuestLine();
  const partyLine = getPartyLine();
  document.querySelectorAll("[data-guest-line]").forEach((element) => {
    element.textContent = line;
  });
  document.querySelectorAll("[data-party-line]").forEach((element) => {
    element.textContent = partyLine;
  });

}

async function fetchInviteMap() {
  const paths = ["data/invite-map.json", "data/invite-map.sample.json"];

  for (const path of paths) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Opening the file directly can block fetch; query-string guests still work.
    }
  }

  return {};
}

async function loadInvitePersonalization() {
  if (!inviteToken) {
    return;
  }

  const inviteMap = await fetchInviteMap();
  const invite = inviteMap[inviteToken] || inviteMap[inviteToken.toLowerCase()];

  if (!invite) {
    return;
  }

  guestName = invite.guest || guestName;
  guestParty = String(invite.party || guestParty || "");
  applyGuestPersonalization();
}

function applyLanguage(lang) {
  activeLang = lang;
  const copy = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = copy.documentTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) {
      element.textContent = copy[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (copy[key]) {
      element.setAttribute("aria-label", copy[key]);
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (copy[key]) {
      element.setAttribute("alt", copy[key]);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (copy[key]) {
      element.setAttribute("placeholder", copy[key]);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    if (copy[key]) {
      element.setAttribute("title", copy[key]);
    }
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  applyGuestPersonalization();
  updateMusicButtonLabel();
  updateMediaLabels();
  if (mediaModal.classList.contains("is-open")) {
    renderMedia(activeMediaIndex);
  }
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const backgroundMusic = document.querySelector("#backgroundMusic");
backgroundMusic.volume = 0.45;
let isPlaying = false;

async function playSoftMusic() {
  await backgroundMusic.play();
}

function stopSoftMusic() {
  backgroundMusic.pause();
}

function updateMusicButtonLabel() {
  const button = document.querySelector("#musicToggle");
  if (!button) {
    return;
  }

  const copy = translations[activeLang];
  button.setAttribute("aria-label", copy[isPlaying ? "musicStop" : "musicPlay"]);
  button.setAttribute("aria-pressed", String(isPlaying));

  const stateLabel = button.querySelector(".music-state");
  if (stateLabel) {
    stateLabel.textContent = copy[isPlaying ? "musicStateOn" : "musicStateOff"];
  }
}

async function toggleMusic(forcePlay = false) {
  const button = document.querySelector("#musicToggle");

  if (!isPlaying || forcePlay) {
    try {
      await playSoftMusic();
      isPlaying = true;
    } catch {
      isPlaying = false;
      button.classList.remove("is-playing");
      updateMusicButtonLabel();
      return;
    }
    button.classList.add("is-playing");
    updateMusicButtonLabel();
  } else {
    stopSoftMusic();
    isPlaying = false;
    button.classList.remove("is-playing");
    updateMusicButtonLabel();
  }
}

document.querySelector("#musicToggle").addEventListener("click", () => toggleMusic());

document.querySelector("#openInvitation").addEventListener("click", () => {
  const gate = document.querySelector("#invitationGate");
  const button = document.querySelector("#openInvitation");

  if (gate.classList.contains("is-opening")) {
    return;
  }

  button.disabled = true;
  gate.classList.add("is-opening");
  document.body.classList.add("invitation-entered");
  toggleMusic(true).catch(() => {});

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const openingDuration = reducedMotion ? 100 : 2320;
  window.setTimeout(() => {
    gate.classList.add("is-open");
  }, openingDuration);
});

if (skipIntro) {
  document.querySelector("#invitationGate").classList.add("is-open");
  document.body.classList.add("invitation-entered");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let activeMediaIndex = 0;
let touchStartX = 0;
let touchStartY = 0;

const mediaModal = document.createElement("div");
mediaModal.className = "media-modal";
mediaModal.innerHTML = `
  <div class="media-dialog" role="dialog" aria-modal="true" aria-label="Media" data-i18n-aria-label="mediaDialogLabel">
    <button class="media-close" type="button" aria-label="Stäng" data-i18n-aria-label="mediaClose">×</button>
    <button class="media-nav media-prev" type="button" aria-label="Föregående" data-i18n-aria-label="mediaPrev">‹</button>
    <div class="media-stage"></div>
    <button class="media-nav media-next" type="button" aria-label="Nästa" data-i18n-aria-label="mediaNext">›</button>
    <div class="media-meta">
      <p class="media-caption"></p>
      <span class="media-count"></span>
    </div>
  </div>
`;
document.body.appendChild(mediaModal);

function updateMediaLabels() {
  const copy = translations[activeLang];
  mediaModal.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (copy[key]) {
      element.setAttribute("aria-label", copy[key]);
    }
  });
}

function getMediaCaption(item) {
  if (!item.caption) {
    return "";
  }

  return item.caption[activeLang] || item.caption.en || item.caption.sv || "";
}

function renderMedia(index) {
  const stage = mediaModal.querySelector(".media-stage");
  const caption = mediaModal.querySelector(".media-caption");
  const count = mediaModal.querySelector(".media-count");

  activeMediaIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeMediaIndex];

  const media = document.createElement(item.type === "video" ? "video" : "img");
  media.src = item.src;
  if (item.type === "video") {
    media.controls = true;
    media.autoplay = true;
    media.playsInline = true;
    if (item.poster) media.poster = item.poster;
  } else {
    media.alt = translations[activeLang][item.altKey] || item.alt || "";
  }
  stage.replaceChildren(media);
  caption.textContent = getMediaCaption(item);
  count.textContent = `${activeMediaIndex + 1} / ${galleryItems.length}`;
}

function openMedia(index) {
  renderMedia(index);
  mediaModal.classList.add("is-open");
  mediaModal.querySelector(".media-close").focus();
}

function closeMedia() {
  mediaModal.classList.remove("is-open");
  mediaModal.querySelector(".media-stage").innerHTML = "";
}

function showMedia(direction) {
  renderMedia(activeMediaIndex + direction);
}

document.querySelectorAll("[data-media]").forEach((button) => {
  button.addEventListener("click", () => openMedia(Number(button.dataset.media)));
});

document.querySelectorAll(".media-video video").forEach((video) => {
  video.play().catch(() => {});
});

mediaModal.querySelector(".media-close").addEventListener("click", closeMedia);
mediaModal.querySelector(".media-prev").addEventListener("click", () => showMedia(-1));
mediaModal.querySelector(".media-next").addEventListener("click", () => showMedia(1));
mediaModal.addEventListener("click", (event) => {
  if (event.target === mediaModal) {
    closeMedia();
  }
});
mediaModal.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true }
);
mediaModal.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      showMedia(deltaX > 0 ? -1 : 1);
    }
  },
  { passive: true }
);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMedia();
  } else if (mediaModal.classList.contains("is-open") && event.key === "ArrowLeft") {
    showMedia(-1);
  } else if (mediaModal.classList.contains("is-open") && event.key === "ArrowRight") {
    showMedia(1);
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
applyLanguage("sv");
loadInvitePersonalization();

// Guest media is published by the Dropbox sync. Keep existing wedding tiles intact.
const originalGalleryLength = galleryItems.length;
let guestGallerySignature = "";
let guestGalleryLoading = false;
async function refreshGuestGallery() {
  if (guestGalleryLoading || document.hidden || mediaModal.classList.contains("is-open")) return;
  guestGalleryLoading = true;
  try {
    const response = await fetch("data/guest-gallery.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Gallery unavailable");
    const manifest = await response.json();
    if (!Array.isArray(manifest.items)) throw new Error("Invalid gallery");
    const seen = new Set();
    const items = manifest.items.filter((item) => {
      if (!item || typeof item.id !== "string" || seen.has(item.id) ||
          !["image", "video"].includes(item.type)) return false;
      try {
        const url = new URL(item.src);
        if (url.protocol !== "https:" || !["www.dropbox.com", "dl.dropboxusercontent.com"].includes(url.hostname)) return false;
      } catch { return false; }
      seen.add(item.id);
      return true;
    });
    const signature = JSON.stringify(items);
    if (signature === guestGallerySignature) return;
    const grid = document.querySelector("#mediaGrid");
    const fragment = document.createDocumentFragment();
    const caption = { sv: "Minne från våra gäster", en: "A memory from our guests", ar: "ذكرى من ضيوفنا" };
    items.forEach((item, offset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "media-tile guest-media";
      button.dataset.media = String(originalGalleryLength + offset);
      button.setAttribute("aria-label", caption[activeLang]);
      const preview = document.createElement(item.type === "video" ? "video" : "img");
      if (item.type === "video") {
        preview.preload = "metadata";
        preview.muted = true;
        preview.playsInline = true;
        preview.src = item.src + "#t=0.1";
        const label = document.createElement("span");
        label.className = "guest-video-label";
        label.textContent = "▶";
        button.append(label);
      } else {
        preview.src = item.src;
        preview.alt = caption[activeLang];
        preview.loading = "lazy";
        preview.decoding = "async";
      }
      button.append(preview);
      button.addEventListener("click", () => openMedia(Number(button.dataset.media)));
      fragment.append(button);
    });
    grid.querySelectorAll(".guest-media").forEach((tile) => tile.remove());
    galleryItems.splice(originalGalleryLength, galleryItems.length - originalGalleryLength,
      ...items.map((item) => ({ ...item, caption, alt: caption[activeLang] })));
    grid.insertBefore(fragment, grid.querySelector(".gallery-upload"));
    guestGallerySignature = signature;
  } catch (error) {
    console.warn("Guest gallery could not refresh; keeping the current photos.");
  } finally {
    guestGalleryLoading = false;
  }
}
refreshGuestGallery();
setInterval(refreshGuestGallery, 60000);
document.addEventListener("visibilitychange", refreshGuestGallery);
