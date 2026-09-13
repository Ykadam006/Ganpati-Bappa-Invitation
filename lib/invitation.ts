// Every word a guest reads lives here. Edit this file — nothing else — before sharing.

// Evening aarti every day from the Sthapna (14th) till the 25th, September 2026.
const aarti = { time: "7:30 PM", from: 14, to: 25 };

export const invitation = {
  family: "1517",
  invitedBy: ["Unnati", "Bansari", "Yogesh", "Yash", "Mihir", "Himanshu"],
  dayDate: "Monday, 14 September 2026",
  aarti,

  // Order matters: [0] Sthapna, [1] Aarti.
  events: [
    { name: "Ganpati Bappa Sthapna", hi: "गणपति बप्पा स्थापना", time: "10:00 AM", detail: "Monday, 14 September 2026" },
    {
      name: "Ganpati Aarti",
      hi: "संध्या आरती",
      time: `${aarti.time} onwards`,
      detail: `Every evening, ${aarti.from}-${aarti.to} September`,
    },
  ],

  address: ["3001 S King Dr, Apt 3-1517", "Chicago, IL 60616"],
  mapsUrl: "", // optional: paste your exact Google Maps share link; otherwise built from the address

  bappaImage: "/bappa.png", // transparent PNG/WebP in /public. Empty = built-in illustration

  // Corner music player: official YouTube uploads. id = the part after "v=" in a YouTube link.
  // Plays top to bottom, then loops.
  songs: [
    { title: "Deva Shree Ganesha", from: "Agneepath", id: "KYUURuT4W5Y" },
    { title: "Shree Ganeshaya Dheemahi", from: "2026 · Shankar Mahadevan", id: "eVTlZk4YNH4" },
    { title: "Morya Re", from: "Bedardi", id: "0CKQqI-uhNM" },
    { title: "Gajanana", from: "Bajirao Mastani", id: "KJF8t-BWVRM" },
    { title: "Bappa", from: "Banjo", id: "sHkd4XxKPdU" },
    { title: "Ganpati Aale", from: "Gharat Ganpati", id: "zrbQKLFaMgU" },
    { title: "Mourya Re", from: "Don", id: "8jff2wz3Hpk" },
    { title: "Morya Morya", from: "Uladhaal", id: "DPH4r-nRNE0" },
    { title: "Aala Re Aala Ganesha", from: "Daddy", id: "JWHnsYVPTuI" },
    { title: "Bappa Morya Re", from: "Prahlad Shinde", id: "CJH35JuCaMo" },
    { title: "Sukhkarta Dukhharta", from: "Aarti", id: "gFr5p5AyuD0" },
  ],

  // Google Calendar, local time (Chicago)
  calendar: { start: "20260914T100000", end: "20260914T220000" },
};

// Every aarti evening, for the date strip.
export const aartiDays = Array.from({ length: aarti.to - aarti.from + 1 }, (_, i) => new Date(2026, 8, aarti.from + i));

const enc = encodeURIComponent;
const title = "Ganpati Bappa Sthapna & Aarti";
const address = invitation.address.join(", ");

export const links = {
  maps: invitation.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${enc(address)}`,
  calendar:
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(`${title} - ${invitation.family} Family`)}` +
    `&dates=${invitation.calendar.start}/${invitation.calendar.end}&ctz=America/Chicago&location=${enc(address)}` +
    `&details=${enc(invitation.events.map((e) => `${e.name}: ${e.time} (${e.detail})`).join("\n"))}`,
};
