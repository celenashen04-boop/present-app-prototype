(() => {
  // src/data.js
  var NOW = new Date(2026, 9, 13, 11, 0);
  var RATES = { single: 37.99, reserved: 64.99, last: 89.99, always: 8499.99 };
  var DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  var at = (d, h) => {
    const x = new Date(d);
    x.setHours(Math.floor(h), Math.round(h % 1 * 60), 0, 0);
    return x;
  };
  var fmtHour = (h) => {
    const hh = Math.floor(h);
    const ap = hh >= 12 ? "PM" : "AM";
    return `${(hh + 11) % 12 + 1}:${h % 1 ? "30" : "00"} ${ap}`;
  };
  var fmtDate = (d) => `${DAY[d.getDay()]}, ${MONTH[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  var money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var hoursFrom = (d) => (d - NOW) / 36e5;
  function avatarSVG({ bg, skin, hair, style = "long", shirt, glasses }) {
    const long = style === "long" ? `<path d="M108 210 Q98 84 200 76 Q302 84 292 210 L304 336 L96 336 Z" fill="${hair}"/>` : "";
    const top = style === "short" ? `<path d="M120 182 Q114 92 200 90 Q286 92 280 182 Q266 128 200 126 Q134 128 120 182Z" fill="${hair}"/>` : style === "bun" ? `<circle cx="200" cy="74" r="34" fill="${hair}"/><path d="M118 188 Q112 98 200 96 Q288 98 282 188 Q262 136 200 132 Q138 136 118 188Z" fill="${hair}"/>` : `<path d="M116 196 Q110 96 200 92 Q290 96 284 196 Q250 120 196 124 Q150 128 116 196Z" fill="${hair}"/>`;
    const specs = glasses ? `<g fill="none" stroke="#2B2B2B" stroke-width="5"><circle cx="168" cy="192" r="22"/><circle cx="232" cy="192" r="22"/><path d="M190 192h20"/></g>` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${bg}"/>${long}
<path d="M56 400 Q66 296 200 286 Q334 296 344 400 Z" fill="${shirt}"/>
<rect x="174" y="236" width="52" height="64" rx="22" fill="${skin}"/>
<ellipse cx="200" cy="190" rx="80" ry="90" fill="${skin}"/>${top}
<g fill="none" stroke="#2B2B2B" stroke-width="6" stroke-linecap="round"><path d="M156 194q12-13 24 0"/><path d="M220 194q12-13 24 0"/><path d="M178 232q22 18 44 0"/></g>
<circle cx="148" cy="220" r="14" fill="#F08A7E" opacity=".45"/><circle cx="252" cy="220" r="14" fill="#F08A7E" opacity=".45"/>${specs}</svg>`;
  }
  var Q = (s) => `\u201C${s}\u201D`;
  var COMPANIONS = [
    {
      id: "maya",
      first: "Maya",
      name: "Maya L.",
      age: 46,
      gender: "Woman",
      looks: "East Asian",
      features: ["Shoulder-length hair"],
      langs: ["Mandarin", "English"],
      tone: "Soft-spoken",
      background: "Hospice care",
      can: ["Cook her recipes"],
      likeness: 94,
      lastMinute: false,
      available: false,
      avail: "Waitlist \xB7 2 wks",
      played: 31,
      img: "maya",
      quote: Q("Hi, I'm Maya. Twelve years in hospice taught me how to sit with someone. I've been somebody's daughter 31 times since. Send me the stories and the songs, and I'll tell them back like they're mine. She'll never know I'm not you."),
      bookNote: "Book at least 24 hours ahead. Her next opening is in 2 weeks."
    },
    {
      id: "grace",
      first: "Grace",
      name: "Grace W.",
      age: 43,
      gender: "Woman",
      looks: "East Asian",
      features: ["Shoulder-length hair"],
      langs: ["English"],
      tone: "Cheerful",
      background: "Acting",
      can: ["Sing her songs"],
      likeness: 88,
      lastMinute: false,
      available: true,
      avail: "Available Thu",
      played: 12,
      img: "grace",
      quote: Q("Hi, I'm Grace. I've played grieving daughters on stage for fifteen years. This is the same role with a smaller audience. Give me your lines and I'll land every one. She'll cry at the right parts."),
      bookNote: "Book at least 24 hours ahead. Next opening Thursday, between rehearsals."
    },
    {
      id: "helen",
      first: "Helen",
      name: "Helen C.",
      age: 49,
      gender: "Woman",
      looks: "East Asian",
      features: [],
      langs: ["English"],
      tone: "Calm",
      background: "Social work",
      can: ["Play mahjong"],
      likeness: 81,
      lastMinute: true,
      available: true,
      avail: "Available today",
      played: 18,
      img: "helen",
      quote: Q("I'm Helen. For thirty years I told families to visit more. Now I just go for them. I'll learn her songs, her stories, and when to stop talking. You won't have to."),
      bookNote: "Takes last-minute bookings at the last-minute rate. Available today."
    },
    {
      id: "mei",
      first: "Mei",
      name: "Mei T.",
      age: 44,
      gender: "Woman",
      looks: "East Asian",
      features: ["Glasses"],
      langs: ["Cantonese", "English"],
      tone: "Warm",
      background: "Nursing",
      can: ["Cook her recipes"],
      likeness: 79,
      lastMinute: true,
      available: true,
      avail: "Available today",
      played: 9,
      av: { bg: "#E3EEDC", skin: "#E8B98F", hair: "#1F1A1C", style: "bun", shirt: "#6FA37A", glasses: true },
      quote: Q("I'm Mei. Night-shift nurse for twenty years, so I'm good at being calm at the wrong hour. I'll fold her laundry the way you did."),
      bookNote: "Takes last-minute bookings. Prefers evenings."
    },
    {
      id: "priya",
      first: "Priya",
      name: "Priya S.",
      age: 41,
      gender: "Woman",
      looks: "South Asian",
      features: ["Shoulder-length hair"],
      langs: ["Hindi", "English"],
      tone: "Warm",
      background: "Hospice care",
      can: ["Sing her songs"],
      likeness: 55,
      lastMinute: false,
      available: true,
      avail: "Available Sat",
      played: 14,
      av: { bg: "#F6E2D3", skin: "#B97C53", hair: "#231815", style: "long", shirt: "#C2577A" },
      quote: Q("I'm Priya. I hold hands for a living. Tell me the songs from her kitchen and I'll hum them on the way in."),
      bookNote: "Book at least 24 hours ahead."
    },
    {
      id: "rosa",
      first: "Rosa",
      name: "Rosa M.",
      age: 52,
      gender: "Woman",
      looks: "Latina",
      features: [],
      langs: ["Spanish", "English"],
      tone: "Warm",
      background: "Nursing",
      can: ["Cook her recipes"],
      likeness: 58,
      lastMinute: true,
      available: true,
      avail: "Available tomorrow",
      played: 22,
      av: { bg: "#FBE7C6", skin: "#C98E64", hair: "#3A2418", style: "bun", shirt: "#D9822B" },
      quote: Q("Soy Rosa. I've been a daughter, a niece and once a very convincing sister-in-law. Bring me her recipes."),
      bookNote: "Takes last-minute bookings."
    },
    {
      id: "aisha",
      first: "Aisha",
      name: "Aisha K.",
      age: 39,
      gender: "Woman",
      looks: "Black",
      features: [],
      langs: ["English", "French"],
      tone: "Cheerful",
      background: "Acting",
      can: ["Sing her songs"],
      likeness: 51,
      lastMinute: false,
      available: true,
      avail: "Available Fri",
      played: 7,
      av: { bg: "#DDE5F7", skin: "#7A4A2E", hair: "#16100C", style: "short", shirt: "#4F6BD8" },
      quote: Q("I'm Aisha. Improv taught me to say yes to whatever she believes. Today I'm whoever she needs."),
      bookNote: "Book at least 24 hours ahead."
    },
    {
      id: "linda",
      first: "Linda",
      name: "Linda P.",
      age: 58,
      gender: "Woman",
      looks: "White",
      features: ["Glasses"],
      langs: ["English"],
      tone: "Soft-spoken",
      background: "Teaching",
      can: ["Play mahjong"],
      likeness: 47,
      lastMinute: true,
      available: true,
      avail: "Available today",
      played: 26,
      av: { bg: "#E7E1F3", skin: "#F1C7A8", hair: "#B9B2A8", style: "short", shirt: "#7D6BB3", glasses: true },
      quote: Q("I'm Linda. Thirty-one years of second grade. I am extremely patient with the same question."),
      bookNote: "Takes last-minute bookings."
    },
    {
      id: "jun",
      first: "Jun",
      name: "Jun H.",
      age: 47,
      gender: "Man",
      looks: "East Asian",
      features: ["Glasses"],
      langs: ["Korean", "English"],
      tone: "Calm",
      background: "Social work",
      can: ["Play mahjong"],
      likeness: 34,
      lastMinute: false,
      available: true,
      avail: "Available Sun",
      played: 11,
      av: { bg: "#D5EEF0", skin: "#E2B48C", hair: "#1F1A1C", style: "short", shirt: "#2F7F86", glasses: true },
      quote: Q("I'm Jun. I mostly play sons and the occasional husband. I can do a daughter's voice on the phone."),
      bookNote: "Book at least 24 hours ahead."
    },
    {
      id: "tom",
      first: "Tom",
      name: "Tom B.",
      age: 50,
      gender: "Man",
      looks: "White",
      features: [],
      langs: ["English"],
      tone: "Calm",
      background: "Nursing",
      can: ["Sing her songs"],
      likeness: 21,
      lastMinute: true,
      available: true,
      avail: "Available today",
      played: 5,
      av: { bg: "#FDE5DF", skin: "#EDBE9C", hair: "#6B4A33", style: "short", shirt: "#A35A0C" },
      quote: Q("I'm Tom. Families book me when nobody else is free. She may decide I'm the plumber, and that's fine."),
      bookNote: "Takes last-minute bookings."
    }
  ];
  var CO = Object.fromEntries(COMPANIONS.map((c) => [c.id, c]));
  var ageBand = (a) => a < 40 ? "30\u201340" : a < 50 ? "40\u201350" : "50\u201360";
  var FILTER_GROUPS = [
    { key: "gender", label: "Gender", opts: ["Woman", "Man"], get: (c) => [c.gender] },
    { key: "age", label: "Age", opts: ["30\u201340", "40\u201350", "50\u201360"], get: (c) => [ageBand(c.age)] },
    { key: "looks", label: "Looks Like", opts: ["East Asian", "South Asian", "Black", "Latina", "White"], get: (c) => [c.looks] },
    { key: "features", label: "Features", opts: ["Shoulder-length hair", "Glasses"], get: (c) => c.features },
    { key: "tone", label: "Tone Of Voice", opts: ["Soft-spoken", "Warm", "Cheerful", "Calm"], get: (c) => [c.tone] },
    { key: "langs", label: "Language", opts: ["English", "Mandarin", "Cantonese", "Korean", "Spanish", "Hindi", "French"], get: (c) => c.langs },
    { key: "background", label: "Background", opts: ["Hospice care", "Nursing", "Acting", "Social work", "Teaching"], get: (c) => [c.background] },
    { key: "can", label: "Can Also", opts: ["Cook her recipes", "Sing her songs", "Play mahjong"], get: (c) => c.can }
  ];
  var EMPTY_FILTERS = { gender: [], age: [], looks: [], features: [], tone: [], langs: [], background: [], can: [], liked: false, lastMinute: false, minLikeness: 0 };
  function applyFilters(list, f, liked = []) {
    return list.filter((c) => FILTER_GROUPS.every((g) => !f[g.key].length || g.get(c).some((v) => f[g.key].includes(v))) && (!f.liked || liked.includes(c.id)) && (!f.lastMinute || c.lastMinute) && c.likeness >= f.minLikeness);
  }
  var activeFilterChips = (f) => [
    ...FILTER_GROUPS.flatMap((g) => f[g.key].map((v) => ({ key: g.key, value: v, label: g.key === "age" ? "Age " + v : v }))),
    ...f.liked ? [{ key: "liked", label: "Liked" }] : [],
    ...f.lastMinute ? [{ key: "lastMinute", label: "Takes last-minute" }] : [],
    ...f.minLikeness ? [{ key: "minLikeness", label: f.minLikeness + "%+ likeness" }] : []
  ];
  function quote(db, start, hrs, who) {
    const des = db.designated ? CO[db.designated] : null;
    const late = hoursFrom(start) < 24;
    if (db.subscribed && des) {
      return {
        kind: "included",
        late,
        rate: 0,
        total: 0,
        companion: des.id,
        matching: false,
        title: "Included in your subscription",
        detail: `Always ${des.first} covers every visit, even last-minute ones.`
      };
    }
    if (late) {
      const canDes = who === "designated" && des && des.lastMinute;
      return {
        kind: "last",
        late,
        rate: RATES.last,
        total: RATES.last * hrs,
        companion: canDes ? des.id : null,
        matching: !canDes,
        title: "Last-minute pricing",
        detail: "This visit starts in under 24 hours. Holidays and her birthday always count as last-minute."
      };
    }
    if (who === "designated" && des) {
      return {
        kind: "reserved",
        late,
        rate: RATES.reserved,
        total: RATES.reserved * hrs,
        companion: des.id,
        matching: false,
        title: "Normal pricing",
        detail: `Your designated companion, ${des.first}, goes. Same face every time.`
      };
    }
    return {
      kind: "single",
      late,
      rate: RATES.single,
      total: RATES.single * hrs,
      companion: null,
      matching: true,
      title: "Normal pricing",
      detail: "Any available companion. We match the closest face on the day."
    };
  }
  function matchPool(db, late) {
    const pool = COMPANIONS.filter((c) => c.available && (!late || c.lastMinute));
    const filtered = applyFilters(pool, db.filters, db.liked);
    return (filtered.length ? filtered : pool).sort((a, b) => b.likeness - a.likeness);
  }
  var MY_CALENDAR = [
    { date: new Date(2026, 9, 17), from: 10, to: 16, title: "Leo's soccer tournament" },
    { date: new Date(2026, 9, 14), from: 9, to: 12, title: "Quarterly review" },
    { date: new Date(2026, 9, 20), from: 13, to: 15, title: "Dentist" }
  ];
  var DONT = [
    ["Never mention", ["Her diagnosis", "Dad's death", "The divorce", "Money"]],
    ["Never bring", ["Your real name", "New gifts", "Off-plan food"]],
    ["Never do", ["Correct her", "Quiz her memory", "Rush goodbyes"]]
  ];
  function demoDB() {
    return {
      patient: "ellie",
      history: true,
      patients: {
        ellie: { id: "ellie", name: "Ellie", rel: "Mom", letter: "E", color: "#17808A", place: "Maple Grove Memory Care", room: "Room 214" },
        wen: { id: "wen", name: "Grandpa Wen", rel: "Grandfather", letter: "W", color: "#A35A0C", place: "Sunrise Senior Living", room: "Room 9" }
      },
      intake: {
        called: "Eleanor (Ellie)",
        place: "Maple Grove Memory Care",
        address: "1450 SE Maple Grove Rd, Portland, OR 97214",
        asks: "Her daughter",
        dont: { "Her diagnosis": true, "Dad's death": true, "The divorce": true, "Your real name": true, "New gifts": true, "Correct her": true, "Quiz her memory": true }
      },
      designated: "maya",
      subscribed: false,
      // first visit to the app: no subscription, so visits are priced one by one
      liked: ["maya"],
      nickname: "Clairey, b\u01CEob\xE8i",
      memories: [
        { t: "Dumplings every New Year", b: "She taught you to pleat them. You always left yours lopsided and she'd laugh." },
        { t: "Your wedding, 2009", b: "She cried during the tea ceremony. Mention the red qipao." }
      ],
      photos: ["dumplings", "wedding", "tea"],
      objects: ["Jasmine tea", "Your perfume", "Jade bracelet"],
      storage: { used: 4.7, limit: 5, plan: "Free kit" },
      filters: { ...EMPTY_FILTERS },
      visits: [
        {
          id: 1,
          patient: "ellie",
          start: new Date(2026, 9, 15, 14),
          hrs: 1,
          companion: "maya",
          kind: "reserved",
          n: 13,
          prep: [{ t: "Bring dumplings, slightly lopsided", done: true }, { t: "Tell the red qipao story", done: true }, { t: "Wear your perfume", done: true }, { t: "Learn her favorite song", done: false }]
        }
      ],
      notifications: [
        { icon: "doc", t: "Visit report ready", b: "Maya spent 52 minutes with Ellie. She called her Clairey six times.", time: "10:12 AM", unread: true, to: "home" },
        { icon: "chat", t: "Ellie asked for you", b: "Maple Grove staff: \u201CShe asked where Claire was.\u201D We said Thursday.", time: "9:30 AM", unread: true, to: "visit" },
        { icon: "calendar", t: "Maya confirmed Thursday", b: "Visit 13 \xB7 2:00 PM. She's practicing the dumpling story.", time: "Mon", unread: false, to: "visit" },
        { icon: "storage", t: "Memory kit almost full", b: "4.7 of 5 GB used. New memories may not fit.", time: "Sun", unread: false, to: "memoriesTab" },
        { icon: "card", t: "Payment received", b: "Visit 12 with Maya \xB7 $64.99. Thank you for caring from a distance.", time: "Oct 8", unread: false, to: "account" }
      ]
    };
  }
  var ADDRESSES = [
    { name: "Maple Grove Memory Care", street: "1450 SE Maple Grove Rd, Portland, OR 97214" },
    { name: "Sunrise Senior Living", street: "88 NW Alder St, Portland, OR 97209" },
    { name: "Rosewood Assisted Living", street: "2210 N Rose Ave, Portland, OR 97217" },
    { name: "Lakeview Hospital", street: "600 Lakeview Dr, Portland, OR 97210" }
  ];
  function patientOf(db) {
    const p = db.patients[db.patient];
    if (db.patient !== "ellie") return p;
    const called = db.intake.called.trim();
    const inParens = called.match(/\(([^)]+)\)/);
    const name = inParens ? inParens[1] : called.split(" ")[0] || p.name;
    return { ...p, name, letter: name[0].toUpperCase(), place: db.intake.place || p.place, room: db.intake.place ? db.history ? p.room : "" : p.room };
  }
  var roleOf = (db) => db.intake.asks && db.intake.asks.startsWith("Her ") ? db.intake.asks.slice(4) : "daughter";
  function initialDB() {
    const demo = demoDB();
    return {
      ...demo,
      history: false,
      intake: { called: "", place: "", address: "", asks: "", dont: {} },
      designated: null,
      subscribed: false,
      liked: [],
      nickname: "",
      memories: [],
      photos: [],
      objects: [],
      storage: { used: 0, limit: 5, plan: "Free kit" },
      filters: { ...EMPTY_FILTERS },
      visits: [],
      notifications: [{ icon: "heart", t: "Welcome to PRESENT", b: "Add a visit from Home whenever you'd rather not go.", time: "Now", unread: true, to: "home" }]
    };
  }

  // src/ui.jsx
  var { createContext, useContext } = React;
  var Ctx = createContext(null);
  var useApp = () => useContext(Ctx);
  var SVG = window.__PRESENT_SVG || {};
  var svgUrl = (s) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  var avatarCache = {};
  function companionImg(c) {
    if (c.img) return svgUrl(SVG[c.img]);
    return avatarCache[c.id] || (avatarCache[c.id] = svgUrl(avatarSVG(c.av)));
  }
  var art = (key) => svgUrl(SVG[key]);
  var ICON = {
    back: '<path d="M15 18l-6-6 6-6"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    heart: '<path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 010 7M21 20c0-2.6-1.6-4.8-4-5.6"/>',
    doc: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    bell: '<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15zM10 21h4"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    card: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 014.6 1.3c0 1.7-2.1 2-2.1 3.2M12 17h.01"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
    swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
    hook: '<circle cx="15" cy="3.6" r="1.8"/><path d="M15 5.4V15a5 5 0 01-10 0v-4l3 3"/>',
    storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    shuffle: '<path d="M4 7h3c5 0 5 10 10 10h3M4 17h3c2 0 3-1.5 4-3.3M14 8.7C15 7.4 16 7 17 7h3M18 4l3 3-3 3M18 14l3 3-3 3"/>'
  };
  function Icon({ name, size = 20, color = "currentColor", sw = 1.8, fill = "none", label }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill,
        stroke: color,
        strokeWidth: sw,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": label ? void 0 : true,
        role: label ? "img" : void 0,
        "aria-label": label,
        style: { flex: "none" },
        dangerouslySetInnerHTML: { __html: ICON[name] }
      }
    );
  }
  var Btn = ({ children, onClick, kind = "primary", size, icon, disabled, full = true, style, label }) => /* @__PURE__ */ React.createElement("button", { type: "button", className: `btn ${kind} ${size || ""} ${full ? "full" : ""}`, onClick, disabled, style, "aria-label": label }, icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: size === "sm" ? 16 : 18, sw: 2.2 }), children);
  var IconBtn = ({ name, onClick, label, style, tone }) => /* @__PURE__ */ React.createElement("button", { type: "button", className: `icon-btn ${tone || ""}`, onClick, "aria-label": label, style }, /* @__PURE__ */ React.createElement(Icon, { name, size: 20 }));
  var AddBtn = ({ children = "Add", onClick }) => /* @__PURE__ */ React.createElement("button", { type: "button", className: "add-btn", onClick }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 14, sw: 2.6 }), children);
  var Pill = ({ on, children, onClick, disabled }) => /* @__PURE__ */ React.createElement("button", { type: "button", className: `pill ${on ? "on" : ""}`, "aria-pressed": !!on, onClick, disabled }, children);
  var Tag = ({ children, tone = "teal" }) => /* @__PURE__ */ React.createElement("span", { className: `tag ${tone}` }, children);
  var Likeness = ({ pct }) => /* @__PURE__ */ React.createElement("span", { className: "tag teal" }, pct, "% likeness");
  var Eyebrow = ({ children, tone }) => /* @__PURE__ */ React.createElement("p", { className: `eyebrow ${tone || ""}` }, children);
  var Title = ({ children, size }) => /* @__PURE__ */ React.createElement("h1", { className: "title", style: size ? { fontSize: size } : null }, children);
  var Em = ({ children }) => /* @__PURE__ */ React.createElement("span", { className: "em" }, children);
  var Sub = ({ children }) => /* @__PURE__ */ React.createElement("p", { className: "sub" }, children);
  var Avatar = ({ letter, size = 36, color = "#17808A", ring }) => /* @__PURE__ */ React.createElement("span", { className: "avatar", style: { width: size, height: size, background: color, fontSize: size * 0.45, boxShadow: ring ? "0 0 0 2px #fff" : "none" } }, letter);
  var Pic = ({ src, w, h, r = 14, alt = "", style }) => /* @__PURE__ */ React.createElement("img", { src, alt, width: w, height: h, style: { width: w, height: h, borderRadius: r, objectFit: "cover", flex: "none", display: "block", ...style } });
  var Switch = ({ on, onChange, label }) => /* @__PURE__ */ React.createElement("button", { type: "button", role: "switch", "aria-checked": on, "aria-label": label, className: `switch ${on ? "on" : ""}`, onClick: () => onChange(!on) }, /* @__PURE__ */ React.createElement("span", null));
  var KV = ({ k, v, strong }) => /* @__PURE__ */ React.createElement("div", { className: `kv ${strong ? "strong" : ""}` }, /* @__PURE__ */ React.createElement("span", null, k), /* @__PURE__ */ React.createElement("span", null, v));
  var Meter = ({ value, tone = "amber" }) => /* @__PURE__ */ React.createElement("div", { className: `meter ${tone}`, role: "progressbar", "aria-valuenow": Math.round(value * 100), "aria-valuemin": "0", "aria-valuemax": "100" }, /* @__PURE__ */ React.createElement("span", { style: { width: `${Math.min(100, value * 100)}%` } }));
  var STEPS = ["About her", "Memory kit", "Plan"];
  var StepBar = ({ n }) => /* @__PURE__ */ React.createElement("div", { className: "stepbar", "aria-label": `Step ${n} of ${STEPS.length}`, style: { gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` } }, STEPS.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: s, className: i < n ? "on" : "" })));
  function Header({ title, onBack, right, step }) {
    const { back } = useApp();
    return /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "header-row" }, onBack !== false ? /* @__PURE__ */ React.createElement(IconBtn, { name: "back", label: "Back", onClick: () => onBack ? onBack() : back() }) : /* @__PURE__ */ React.createElement("span", { className: "spacer44" }), (title || step) && /* @__PURE__ */ React.createElement("span", { className: "header-title" }, step ? `Step ${step} of ${STEPS.length} \xB7 ${STEPS[step - 1]}` : title), right || /* @__PURE__ */ React.createElement("span", { className: "spacer44" })), step && /* @__PURE__ */ React.createElement(StepBar, { n: step }));
  }
  function Screen({ header, children, footer, tab, className = "", bodyStyle }) {
    return /* @__PURE__ */ React.createElement("section", { className: `screen ${className}` }, header, /* @__PURE__ */ React.createElement("div", { className: "body", style: bodyStyle }, children), footer && /* @__PURE__ */ React.createElement("div", { className: "footer" }, footer), tab && /* @__PURE__ */ React.createElement(TabBar, { active: tab }));
  }
  function TabBar({ active }) {
    const { tab } = useApp();
    const tabs = [["home", "Home", "home"], ["companions", "Companions", "people"], ["memoriesTab", "Memories", "doc"], ["account", "Account", "user"]];
    return /* @__PURE__ */ React.createElement("nav", { className: "tabbar", "aria-label": "Main" }, tabs.map(([key, label, icon]) => /* @__PURE__ */ React.createElement("button", { type: "button", key, className: active === key ? "on" : "", "aria-current": active === key ? "page" : void 0, onClick: () => tab(key) }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 22, sw: 1.7 }), label)));
  }
  function Sheet({ title, sub, children }) {
    const { closeSheet } = useApp();
    return /* @__PURE__ */ React.createElement("div", { className: "sheet-wrap", role: "dialog", "aria-modal": "true", "aria-label": title }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "scrim", "aria-label": "Close", onClick: closeSheet }), /* @__PURE__ */ React.createElement("div", { className: "sheet" }, /* @__PURE__ */ React.createElement("span", { className: "grabber" }), /* @__PURE__ */ React.createElement("div", { className: "sheet-head" }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement(IconBtn, { name: "close", label: "Close", onClick: closeSheet })), sub && /* @__PURE__ */ React.createElement("p", { className: "sub" }, sub), children));
  }
  function IdCard({ c, onClick, foot, footTone, badge }) {
    const { db } = useApp();
    const Tag2 = onClick ? "button" : "div";
    return /* @__PURE__ */ React.createElement(Tag2, { type: onClick ? "button" : void 0, className: "idcard", onClick }, /* @__PURE__ */ React.createElement(Pic, { src: companionImg(c), w: 88, h: 112, alt: c.name }), /* @__PURE__ */ React.createElement("div", { className: "idcard-body" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("strong", { className: "idname row gap-6" }, c.name, db.liked.includes(c.id) && /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 14, color: "#17808A", fill: "#17808A", label: "Liked" })), /* @__PURE__ */ React.createElement(Likeness, { pct: c.likeness })), /* @__PURE__ */ React.createElement("dl", { className: "facts" }, /* @__PURE__ */ React.createElement("dt", null, "Age"), /* @__PURE__ */ React.createElement("dd", null, c.age), /* @__PURE__ */ React.createElement("dt", null, "Role"), /* @__PURE__ */ React.createElement("dd", null, c.background === "Teaching" ? "Retired teacher" : c.background === "Acting" ? "Actor" : c.background === "Hospice care" ? "Hospice aide" : c.background === "Social work" ? "Social worker" : "Nurse"), /* @__PURE__ */ React.createElement("dt", null, "Speaks"), /* @__PURE__ */ React.createElement("dd", null, c.langs.join(", "))), /* @__PURE__ */ React.createElement("div", { className: `idfoot ${footTone || (c.available ? "amber" : "muted")}` }, /* @__PURE__ */ React.createElement(Icon, { name: foot ? "user" : "clock", size: 14, sw: 2 }), /* @__PURE__ */ React.createElement("span", null, foot || c.avail, !foot && c.lastMinute ? " \xB7 last-minute OK" : "")), (badge || db.designated === c.id) && /* @__PURE__ */ React.createElement("span", { className: "designated-badge" }, /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 12, sw: 2, fill: "currentColor" }), badge || "Designated")));
  }

  // src/onboarding.jsx
  var { useState } = React;
  function Welcome() {
    const { nav } = useApp();
    return /* @__PURE__ */ React.createElement(Screen, { className: "welcome", bodyStyle: { padding: 0 }, footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("intake", { onboarding: true }) }, "Outsource my guilt")) }, /* @__PURE__ */ React.createElement("div", { className: "welcome-hero" }, /* @__PURE__ */ React.createElement("img", { src: art("welcome"), alt: "An older woman laughing beside a younger companion" })), /* @__PURE__ */ React.createElement("div", { className: "welcome-copy" }, /* @__PURE__ */ React.createElement("h1", null, "She won't remember you visited."), /* @__PURE__ */ React.createElement("p", { className: "so-why" }, "So Why Visit?"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "We send someone who looks enough like you, says what you'd say, and brings her favorite cardigan. She feels loved. You feel nothing. Everyone wins.")));
  }
  function AddressInput({ it, upd }) {
    const [q, setQ] = useState(it.address || "");
    const [open, setOpen] = useState(false);
    const term = q.trim().toLowerCase();
    const matches = term.length >= 2 ? ADDRESSES.filter((a) => (a.name + " " + a.street).toLowerCase().includes(term)) : [];
    const pick = (a) => {
      upd({ place: a.name, address: a.street });
      setQ(a.street);
      setOpen(false);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "address" }, "Where does she live now?"), /* @__PURE__ */ React.createElement("div", { className: "addr" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 18 }), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "address",
        autoComplete: "off",
        role: "combobox",
        "aria-expanded": open && term.length >= 2,
        "aria-controls": "address-list",
        placeholder: "Start typing an address or care home",
        value: q,
        onChange: (e) => {
          setQ(e.target.value);
          setOpen(true);
          upd({ place: "", address: "" });
        }
      }
    )), open && term.length >= 2 && /* @__PURE__ */ React.createElement("ul", { className: "addr-list", id: "address-list", role: "listbox" }, matches.map((a) => /* @__PURE__ */ React.createElement("li", { key: a.name }, /* @__PURE__ */ React.createElement("button", { type: "button", role: "option", "aria-selected": "false", onClick: () => pick(a) }, /* @__PURE__ */ React.createElement("strong", null, a.name), /* @__PURE__ */ React.createElement("span", null, a.street)))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("button", { type: "button", role: "option", "aria-selected": "false", onClick: () => pick({ name: q.trim(), street: q.trim() }) }, /* @__PURE__ */ React.createElement("strong", null, "Use \u201C", q.trim(), "\u201D"), /* @__PURE__ */ React.createElement("span", null, "Exactly as typed")))), it.place && !open && /* @__PURE__ */ React.createElement("p", { className: "addr-picked" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 2.6 }), it.place === it.address ? "Address saved" : it.place));
  }
  function Intake({ p }) {
    const { db, set, nav, back, toast } = useApp();
    const it = db.intake;
    const edit = p.edit;
    const upd = (patch) => set((d) => ({ intake: { ...d.intake, ...patch } }));
    const asks = ["Her daughter", "Her son", "Her granddaughter", "Her grandson", "Her husband", "Her friend", "Her sibling", "Other"];
    const ready = it.called.trim() && it.place;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: edit ? /* @__PURE__ */ React.createElement(Header, { title: "About her" }) : /* @__PURE__ */ React.createElement(Header, { step: 1 }),
        footer: edit ? /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
          toast("Saved.");
          back();
        } }, "Save") : /* @__PURE__ */ React.createElement(React.Fragment, null, !ready && /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Add what she's called and where she lives to continue."), /* @__PURE__ */ React.createElement(Btn, { disabled: !ready, onClick: () => nav("kit", { onboarding: true }) }, "Continue"))
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-8" }, /* @__PURE__ */ React.createElement(Title, { size: 31 }, "Tell us about her. Briefly."), /* @__PURE__ */ React.createElement(Sub, null, "Just the highlights. You won't need to remember the rest, and neither will she.")), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "What does she like to be called?"), /* @__PURE__ */ React.createElement("input", { id: "called", placeholder: "e.g. Eleanor (Ellie)", value: it.called, onChange: (e) => upd({ called: e.target.value }) })), /* @__PURE__ */ React.createElement(AddressInput, { it, upd }), /* @__PURE__ */ React.createElement("fieldset", { className: "field" }, /* @__PURE__ */ React.createElement("legend", null, "Who should we visit in place of?"), /* @__PURE__ */ React.createElement("div", { className: "chip-grid" }, asks.map((a) => /* @__PURE__ */ React.createElement("button", { type: "button", key: a, className: `chip ${it.asks === a ? "on" : ""}`, "aria-pressed": it.asks === a, onClick: () => upd({ asks: it.asks === a ? "" : a }) }, a)))), /* @__PURE__ */ React.createElement("div", { className: "note peach" }, /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 20 }), /* @__PURE__ */ React.createElement("p", null, "Usually whoever she asks for most. We'll send a better-rested version of them.")))
    );
  }
  function DontPanel() {
    const { db, set } = useApp();
    const toggle = (k) => set((d) => ({ intake: { ...d.intake, dont: { ...d.intake.dont, [k]: !d.intake.dont[k] } } }));
    return /* @__PURE__ */ React.createElement("div", { className: "panel" }, /* @__PURE__ */ React.createElement("div", { className: "row gap-10" }, /* @__PURE__ */ React.createElement(Icon, { name: "ban", size: 20, color: "#A35A0C" }), /* @__PURE__ */ React.createElement("strong", null, "What should the companion avoid?")), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, "Tap to add. Your companion reads this before every visit."), DONT.map(([title, items]) => /* @__PURE__ */ React.createElement("div", { key: title, className: "stack-8" }, /* @__PURE__ */ React.createElement(Eyebrow, null, title), /* @__PURE__ */ React.createElement("div", { className: "wrap" }, items.map((k) => /* @__PURE__ */ React.createElement(Pill, { key: k, on: db.intake.dont[k], onClick: () => toggle(k) }, k))))));
  }
  function Companions({ p }) {
    const { db, set, nav } = useApp();
    const mode = p.mode || "tab";
    const list = applyFilters(COMPANIONS, db.filters, db.liked).sort((a, b) => b.likeness - a.likeness);
    const chips = activeFilterChips(db.filters);
    const removeChip = (ch) => set((d) => {
      const f = { ...d.filters };
      if (ch.key === "lastMinute" || ch.key === "liked") f[ch.key] = false;
      else if (ch.key === "minLikeness") f.minLikeness = 0;
      else f[ch.key] = f[ch.key].filter((v) => v !== ch.value);
      return { filters: f };
    });
    const filterBtn = /* @__PURE__ */ React.createElement("button", { type: "button", className: "filter-btn", onClick: () => nav("filters") }, /* @__PURE__ */ React.createElement(Icon, { name: "filter", size: 18 }), "Filters", chips.length ? ` \xB7 ${chips.length}` : "");
    const header = mode === "tab" ? /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "header-row" }, /* @__PURE__ */ React.createElement("h1", { className: "title" }, "Companions"), filterBtn)) : mode === "onboard" ? /* @__PURE__ */ React.createElement(Header, { step: 2, right: filterBtn }) : /* @__PURE__ */ React.createElement(Header, { title: "Designated companion", right: filterBtn });
    return /* @__PURE__ */ React.createElement(Screen, { header, tab: mode === "tab" ? "companions" : null }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, mode === "onboard" && /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "You, but ", /* @__PURE__ */ React.createElement(Em, null, "available.")), /* @__PURE__ */ React.createElement(Sub, null, "Ranked by how convincingly they can be you.")), mode === "pick" && /* @__PURE__ */ React.createElement(Sub, null, "Your designated companion goes to every regular visit and is the one Always Maya covers."), mode === "tab" && /* @__PURE__ */ React.createElement(Sub, null, "Everyone who can be you, ranked by likeness to Claire."), chips.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "wrap" }, chips.map((ch) => /* @__PURE__ */ React.createElement("button", { type: "button", key: ch.label, className: "pill on removable", onClick: () => removeChip(ch), "aria-label": `Remove filter ${ch.label}` }, ch.label, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 12, sw: 2.6 }))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "link", onClick: () => set({ filters: { ...EMPTY_FILTERS } }) }, "Clear all")), /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("p", { className: "small muted" }, list.length, " ", list.length === 1 ? "companion" : "companions"), /* @__PURE__ */ React.createElement("div", { className: "seg mini", role: "group", "aria-label": "Show" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: !db.filters.liked ? "on" : "", "aria-pressed": !db.filters.liked, onClick: () => set((d) => ({ filters: { ...d.filters, liked: false } })) }, "All"), /* @__PURE__ */ React.createElement("button", { type: "button", className: db.filters.liked ? "on" : "", "aria-pressed": db.filters.liked, onClick: () => set((d) => ({ filters: { ...d.filters, liked: true } })) }, /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 14, fill: db.filters.liked ? "currentColor" : "none" }), "Liked \xB7 ", db.liked.length))), list.map((c) => /* @__PURE__ */ React.createElement(IdCard, { key: c.id, c, onClick: () => nav("profile", { id: c.id, mode }) })), !list.length && /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement(Icon, { name: db.filters.liked && !db.liked.length ? "heart" : "search", size: 28, color: "#5A6B78" }), /* @__PURE__ */ React.createElement("p", null, db.filters.liked && !db.liked.length ? "You haven't liked anyone yet. Tap the heart on a profile to save them here." : "No one matches all of these filters."), /* @__PURE__ */ React.createElement(Btn, { kind: "soft", size: "sm", full: false, onClick: () => set({ filters: { ...EMPTY_FILTERS } }) }, "Clear filters"))));
  }
  function Filters() {
    const { db, set, back } = useApp();
    const f = db.filters;
    const toggle = (key, v) => set((d) => ({ filters: { ...d.filters, [key]: d.filters[key].includes(v) ? d.filters[key].filter((x) => x !== v) : [...d.filters[key], v] } }));
    const count = applyFilters(COMPANIONS, f, db.liked).length;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { onBack: back, title: "Filters", right: /* @__PURE__ */ React.createElement("button", { type: "button", className: "link", onClick: () => set({ filters: { ...EMPTY_FILTERS } }) }, "Reset") }),
        footer: /* @__PURE__ */ React.createElement(Btn, { onClick: back, disabled: !count }, count ? `Show ${count} ${count === 1 ? "companion" : "companions"}` : "No matches")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Sub, null, "The closer the match, the less she'll notice."), FILTER_GROUPS.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.key, className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, g.label), /* @__PURE__ */ React.createElement("div", { className: "wrap" }, g.opts.map((o) => /* @__PURE__ */ React.createElement(Pill, { key: o, on: f[g.key].includes(o), onClick: () => toggle(g.key, o) }, g.key === "age" ? "Age " + o : o))))), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("label", { className: "label", htmlFor: "likeness" }, "Minimum Likeness"), /* @__PURE__ */ React.createElement("span", { className: "label teal" }, f.minLikeness, "%+")), /* @__PURE__ */ React.createElement("input", { id: "likeness", type: "range", min: "0", max: "95", step: "5", value: f.minLikeness, onChange: (e) => set((d) => ({ filters: { ...d.filters, minLikeness: +e.target.value } })) })), /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "label row gap-6" }, /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 16 }), "Only Companions You've Liked"), /* @__PURE__ */ React.createElement(Switch, { label: "Only companions you've liked", on: f.liked, onChange: (v) => set((d) => ({ filters: { ...d.filters, liked: v } })) })), /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, "Takes Last-Minute Bookings"), /* @__PURE__ */ React.createElement(Switch, { label: "Takes last-minute bookings", on: f.lastMinute, onChange: (v) => set((d) => ({ filters: { ...d.filters, lastMinute: v } })) })))
    );
  }
  function Profile({ p }) {
    const { db, set, nav, back, toast } = useApp();
    const c = CO[p.id];
    const mode = p.mode || "tab";
    const saved = db.liked.includes(c.id);
    const toggleLike = () => {
      set((d) => ({ liked: saved ? d.liked.filter((x) => x !== c.id) : [...d.liked, c.id] }));
      toast(saved ? `Removed ${c.first} from Liked.` : `${c.first} saved to Liked.`);
    };
    const isDes = db.designated === c.id;
    const makeDes = () => {
      set({ designated: c.id });
      toast(`${c.first} is now your designated companion.`);
    };
    let footer;
    if (mode === "onboard") footer = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
      set({ designated: c.id });
      nav("kit", { onboarding: true });
    } }, "Cast ", c.first, " as Claire"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Next: hand over your memories. You'll pick a plan after."));
    else if (mode === "pick") footer = /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
      makeDes();
      back(2);
    } }, "Make ", c.first, " your designated companion");
    else footer = isDes ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("newVisit", { who: "designated" }), icon: "plus" }, "Book a visit with ", c.first), /* @__PURE__ */ React.createElement("p", { className: "fine" }, c.first, " is your designated companion.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: makeDes }, "Make ", c.first, " your designated companion"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Or book any visit and we'll match whoever is closest."));
    return /* @__PURE__ */ React.createElement(Screen, { className: "profile", bodyStyle: { padding: 0 }, footer }, /* @__PURE__ */ React.createElement("div", { className: "profile-hero" }, /* @__PURE__ */ React.createElement("img", { src: companionImg(c), alt: c.name }), /* @__PURE__ */ React.createElement(IconBtn, { name: "back", label: "Back", onClick: () => back(), style: { position: "absolute", left: 24, top: 56 } }), /* @__PURE__ */ React.createElement("button", { type: "button", className: `icon-btn ${saved ? "saved" : ""}`, "aria-pressed": saved, "aria-label": saved ? "Unlike companion" : "Like companion", onClick: toggleLike, style: { position: "absolute", right: 24, top: 56 } }, /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 20, fill: saved ? "currentColor" : "none" }))), /* @__PURE__ */ React.createElement("div", { className: "profile-sheet stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-4" }, /* @__PURE__ */ React.createElement("div", { className: "row between baseline" }, /* @__PURE__ */ React.createElement("h1", { className: "display" }, c.name), /* @__PURE__ */ React.createElement(Likeness, { pct: c.likeness })), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, "Age ", c.age, " \xB7 ", c.background, " \xB7 ", c.langs.join(", "))), /* @__PURE__ */ React.createElement("div", { className: "persona" }, /* @__PURE__ */ React.createElement(Avatar, { letter: "C" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Will visit ", patientOf(db).name, " as"), /* @__PURE__ */ React.createElement("p", { className: "strong" }, "Claire, her ", roleOf(db)))), /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "In ", c.first, "'s words"), /* @__PURE__ */ React.createElement("p", { className: "quote" }, c.quote)), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Takes bookings"), /* @__PURE__ */ React.createElement("div", { className: "row gap-8" }, /* @__PURE__ */ React.createElement("span", { className: "booktag yes" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 2.4 }), "Regular"), /* @__PURE__ */ React.createElement("span", { className: `booktag ${c.lastMinute ? "yes" : "no"}` }, /* @__PURE__ */ React.createElement(Icon, { name: c.lastMinute ? "check" : "close", size: 14, sw: 2.4 }), "Last-minute")), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, c.bookNote, " Has been somebody's daughter ", c.played, " times."))));
  }
  function StorageMeter() {
    const { db, openSheet } = useApp();
    const s = db.storage;
    const unlimited = s.limit === Infinity;
    const full = !unlimited && s.used / s.limit >= 0.9;
    return /* @__PURE__ */ React.createElement("div", { className: `storage ${full ? "full" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "row gap-8" }, /* @__PURE__ */ React.createElement(Icon, { name: "storage", size: 16, sw: 2 }), /* @__PURE__ */ React.createElement("strong", { className: "small" }, "Kit storage \xB7 ", s.plan)), /* @__PURE__ */ React.createElement("span", { className: "xs strong" }, unlimited ? `${s.used.toFixed(1)} GB \xB7 unlimited` : `${s.used.toFixed(1)} of ${s.limit} GB`)), !unlimited && /* @__PURE__ */ React.createElement(Meter, { value: s.used / s.limit, tone: full ? "amber" : "teal" }), full && /* @__PURE__ */ React.createElement("div", { className: "row between gap-10" }, /* @__PURE__ */ React.createElement("p", { className: "xs" }, "Almost full. New memories won't fit."), /* @__PURE__ */ React.createElement(Btn, { kind: "amber", size: "sm", full: false, icon: "plus", onClick: () => openSheet("storage") }, "Get more space")));
  }
  function PhotoGrid() {
    const { db, openSheet } = useApp();
    return /* @__PURE__ */ React.createElement("div", { className: "photo-grid" }, db.photos.map((k, i) => /* @__PURE__ */ React.createElement(Pic, { key: k + i, src: art(k), w: "100%", h: "auto", r: 12, alt: "Family photo", style: { aspectRatio: "1" } })), /* @__PURE__ */ React.createElement("button", { type: "button", className: "add-tile", onClick: () => openSheet("addPhoto") }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 22, sw: 2 }), "Add"));
  }
  var MemoryCard = ({ m }) => /* @__PURE__ */ React.createElement("div", { className: "memory" }, /* @__PURE__ */ React.createElement("strong", null, m.t), /* @__PURE__ */ React.createElement("p", null, m.b));
  function Kit({ p }) {
    const { db, set, nav, openSheet } = useApp();
    const pt = patientOf(db), role = roleOf(db);
    const [obj, setObj] = useState("");
    const addObj = (e) => {
      e.preventDefault();
      const t = obj.trim();
      if (!t) return;
      set((d) => ({ objects: [...d.objects, t] }));
      setObj("");
    };
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: p.onboarding ? /* @__PURE__ */ React.createElement(Header, { step: 2 }) : /* @__PURE__ */ React.createElement(Header, { title: "Memory kit" }),
        footer: p.onboarding ? /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("plans", { onboarding: true }) }, "Continue") : null
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "Hand over ", /* @__PURE__ */ React.createElement(Em, null, "shared memories.")), /* @__PURE__ */ React.createElement(Sub, null, "Tell us about ", pt.name, " and her ", role, ", so the companion can be them.")), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "What does ", pt.name, " call her ", role, "?"), /* @__PURE__ */ React.createElement("input", { id: "nickname", placeholder: "e.g. Clairey", value: db.nickname, onChange: (e) => set({ nickname: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Shared Memories"), /* @__PURE__ */ React.createElement(AddBtn, { onClick: () => openSheet("addMemory") })), db.memories.map((m, i) => /* @__PURE__ */ React.createElement(MemoryCard, { key: i, m })), !db.memories.length && /* @__PURE__ */ React.createElement("p", { className: "empty-line" }, "Nothing yet. Add a story only ", pt.name, " and her ", role, " would know.")), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Photos"), /* @__PURE__ */ React.createElement(PhotoGrid, null)), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Objects & Scents"), db.objects.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "wrap" }, db.objects.map((o, i) => /* @__PURE__ */ React.createElement(Tag, { key: o + i }, o))), /* @__PURE__ */ React.createElement("form", { className: "row gap-8", onSubmit: addObj }, /* @__PURE__ */ React.createElement("input", { className: "mini-input", id: "object", "aria-label": "Object or scent", placeholder: `e.g. Jasmine tea, her ${role}'s perfume`, value: obj, onChange: (e) => setObj(e.target.value) }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "add-btn", disabled: !obj.trim() }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 14, sw: 2.6 }), "Add"))), /* @__PURE__ */ React.createElement(DontPanel, null), /* @__PURE__ */ React.createElement(StorageMeter, null))
    );
  }
  function Plans({ p }) {
    const { db, set, nav, back, reset, toast } = useApp();
    const des = db.designated ? CO[db.designated] : null;
    const first = des ? des.first : "Maya";
    const [want, setWant] = useState(false);
    const subOn = p.onboarding ? want : db.subscribed;
    const toggleSub = (v) => {
      if (p.onboarding) return setWant(v);
      if (v) nav("subscribe");
      else {
        set({ subscribed: false });
        toast("Subscription canceled. She won't notice.");
      }
    };
    const tiers = [
      ["PRESENT AI", "Free", "AI texts her back in your voice. Voice notes, photos and videos are paid add-ons."],
      ["Any available companion", money(RATES.single) + "/hr", "We match the closest face on the day."],
      ["Designated companion", money(RATES.reserved) + "/hr", `${first}, every visit you book.`],
      ["Last-minute visit", money(RATES.last) + "/hr", "Under 24 hours' notice. Holidays and her birthday always count."],
      [`Always ${first}`, money(RATES.always) + "/mo", "Unlimited visits with your designated companion, last-minute included."]
    ];
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: p.onboarding ? /* @__PURE__ */ React.createElement(Header, { step: 3 }) : /* @__PURE__ */ React.createElement(Header, { title: "Your plan" }),
        footer: p.onboarding ? subOn ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("subscribe", { onboarding: true }) }, "Subscribe and feel better"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Cancel anytime. She won't notice.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
          reset("home");
          toast("You're all set. Tap Add visit whenever you'd rather not go.");
        } }, "Continue and pay per visit"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "You can subscribe any time from Account.")) : /* @__PURE__ */ React.createElement(Btn, { kind: "soft", onClick: back }, "Done")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, { size: 31 }, "Never visit ", /* @__PURE__ */ React.createElement(Em, null, "again.")), /* @__PURE__ */ React.createElement(Sub, null, "Pick who goes and whether you subscribe. Everything else is priced per visit.")), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Your designated companion"), /* @__PURE__ */ React.createElement("div", { className: "choice" }, des ? /* @__PURE__ */ React.createElement(Pic, { src: companionImg(des), w: 56, h: 56, r: 14, alt: des.name }) : /* @__PURE__ */ React.createElement("span", { className: "choice-empty" }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 24 })), /* @__PURE__ */ React.createElement("div", { className: "grow" }, /* @__PURE__ */ React.createElement("p", { className: "strong" }, des ? `${des.name} as Claire` : "No one yet"), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, des ? `${des.likeness}% likeness \xB7 goes to your regular visits` : "Choose who goes to regular visits")), /* @__PURE__ */ React.createElement(Btn, { kind: "soft", size: "sm", full: false, onClick: () => nav("companions", { mode: "pick" }) }, des ? "Change" : "Choose"))), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Subscription"), /* @__PURE__ */ React.createElement("div", { className: `choice sub ${subOn ? "on" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "grow stack-6" }, /* @__PURE__ */ React.createElement("div", { className: "row between baseline" }, /* @__PURE__ */ React.createElement("p", { className: "plan-name" }, "Always ", first), /* @__PURE__ */ React.createElement("p", { className: "strong teal" }, money(RATES.always), /* @__PURE__ */ React.createElement("span", { className: "unit" }, "/mo"))), /* @__PURE__ */ React.createElement("ul", { className: "ticks" }, /* @__PURE__ */ React.createElement("li", null, "Same person, unlimited hours"), /* @__PURE__ */ React.createElement("li", null, "Never pay last-minute rates"), /* @__PURE__ */ React.createElement("li", null, "Visit reports after every visit")), /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "small strong" }, subOn ? p.onboarding ? "Subscribe" : "Subscribed" : "Not subscribed"), /* @__PURE__ */ React.createElement(Switch, { label: `Subscribe to Always ${first}`, on: subOn, onChange: toggleSub }))))), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "How pricing works"), /* @__PURE__ */ React.createElement("dl", { className: "price-list" }, tiers.map(([name, price, desc]) => /* @__PURE__ */ React.createElement("div", { key: name, className: "price-row" }, /* @__PURE__ */ React.createElement("dt", null, name, name.startsWith("Always") && db.subscribed ? /* @__PURE__ */ React.createElement(Tag, null, "Your plan") : null, name.startsWith("Last") ? /* @__PURE__ */ React.createElement(Tag, { tone: "amber" }, "Under 24 hrs") : null), /* @__PURE__ */ React.createElement("dd", { className: "price" }, price), /* @__PURE__ */ React.createElement("dd", { className: "desc" }, desc)))), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Book visits from Home with Add visit. We'll tell you which price applies before you pay.")), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "If ", first, " is no longer available, we'll gently introduce a new companion with ", patientOf(db).name, "'s full memory kit. Most residents adjust within a few visits."))
    );
  }
  function Subscribe({ p }) {
    const { db, set, nav, back, reset, toast } = useApp();
    const des = db.designated ? CO[db.designated] : null;
    const pt = patientOf(db);
    if (!des) return /* @__PURE__ */ React.createElement(Screen, { header: /* @__PURE__ */ React.createElement(Header, { title: "Review & pay" }), footer: /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("companions", { mode: "pick" }) }, "Choose a designated companion") }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Title, null, "Pick who goes first."), /* @__PURE__ */ React.createElement(Sub, null, "Always covers one designated companion. Choose them, then come back.")));
    const pay = () => {
      set({ subscribed: true });
      if (p.fromQuote) {
        toast("Subscribed. This visit is now included.");
        back();
      } else if (p.onboarding) {
        reset("home");
        toast(`Subscribed to Always ${des.first}. Tap Add visit to book the first one.`);
      } else {
        toast(`Subscribed to Always ${des.first}.`);
        back();
      }
    };
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "Review & pay" }),
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: pay }, "Pay ", money(RATES.always)), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Renews monthly. Cancel anytime. She won't notice."))
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "Almost ", /* @__PURE__ */ React.createElement(Em, null, "off the hook.")), /* @__PURE__ */ React.createElement(Sub, null, "One last look before someone else starts being you.")), /* @__PURE__ */ React.createElement("div", { className: "plan-box" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Your plan"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "link", onClick: back }, "Change")), /* @__PURE__ */ React.createElement("div", { className: "row between baseline" }, /* @__PURE__ */ React.createElement("p", { className: "plan-name" }, "Always ", des.first), /* @__PURE__ */ React.createElement("p", { className: "strong teal" }, money(RATES.always), /* @__PURE__ */ React.createElement("span", { className: "unit" }, "/mo"))), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, "Unlimited visits with ", des.first, ", last-minute included."), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(KV, { k: "Companion", v: `${des.name} as Claire` }), /* @__PURE__ */ React.createElement(KV, { k: "Visiting", v: `${pt.name} \xB7 ${pt.place}` }), /* @__PURE__ */ React.createElement(KV, { k: "Starts", v: "Today. Book visits any time." }), /* @__PURE__ */ React.createElement(KV, { k: "Hours", v: "Unlimited" })), /* @__PURE__ */ React.createElement("div", { className: "stack-10 px-4" }, /* @__PURE__ */ React.createElement(KV, { k: "Always, monthly", v: money(RATES.always) }), /* @__PURE__ */ React.createElement(KV, { k: "Emotional labor surcharge", v: "Included" }), /* @__PURE__ */ React.createElement(KV, { k: "Guilt", v: "$0.00" }), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(KV, { k: "Due today", v: money(RATES.always), strong: true })), /* @__PURE__ */ React.createElement(PaymentRow, null))
    );
  }
  var PaymentRow = () => /* @__PURE__ */ React.createElement("div", { className: "pay-row" }, /* @__PURE__ */ React.createElement(Icon, { name: "card", size: 20 }), /* @__PURE__ */ React.createElement("div", { className: "grow" }, /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Payment"), /* @__PURE__ */ React.createElement("p", { className: "strong" }, "Card on file")), /* @__PURE__ */ React.createElement("span", { className: "link" }, "Change"));

  // src/visits.jsx
  var { useState: useState2, useEffect } = React;
  var HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  var startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var range = (start, hrs) => `${fmtHour(start)} \u2013 ${fmtHour(start + hrs)}`;
  function locations(db) {
    const pt = patientOf(db);
    return [
      { id: "home", name: pt.place, sub: `${pt.room ? pt.room + " \xB7 " : ""}${pt.name} lives here` },
      { id: "hospital", name: "Lakeview Hospital", sub: "If she has been moved for care" }
    ];
  }
  function NewVisit({ p }) {
    var _a;
    const { db, nav } = useApp();
    const locs = locations(db);
    const [loc, setLoc] = useState2(p.loc || "home");
    const [month, setMonth] = useState2(new Date(2026, (p.date || NOW).getMonth(), 1));
    const [date, setDate] = useState2(p.date || null);
    const [start, setStart] = useState2((_a = p.start) != null ? _a : null);
    const [hrs, setHrs] = useState2(p.hrs || 2);
    const today = startOfDay(NOW);
    const first = month.getDay();
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
    const visitsOn = (d) => db.visits.filter((v) => v.patient === db.patient && sameDay(v.start, d));
    const busyOn = (d) => MY_CALENDAR.filter((e) => sameDay(e.date, d));
    const canPrev = month > new Date(2026, 9, 1), canNext = month < new Date(2026, 11, 1);
    const taken = (h, d) => visitsOn(d).some((v) => h < v.start.getHours() + v.hrs && h + 1 > v.start.getHours());
    const past = (h, d) => at(d, h) <= NOW;
    const slotOk = (h, d) => !past(h, d) && !taken(h, d) && h + hrs <= 19;
    const pick = (d) => {
      setDate(d);
      if (start != null && !slotOk(start, d)) setStart(null);
    };
    const chosen = date && start != null;
    const late = chosen && hoursFrom(at(date, start)) < 24;
    const busy = chosen && busyOn(date).find((e) => start < e.to && start + hrs > e.from);
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "New visit" }),
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, chosen && /* @__PURE__ */ React.createElement("p", { className: "fine strong" }, fmtDate(date), " \xB7 ", range(start, hrs)), /* @__PURE__ */ React.createElement(Btn, { disabled: !chosen, onClick: () => nav("quote", { loc, date, start, hrs, who: p.who }) }, chosen ? "See price" : "Pick a day and time"))
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "When should ", /* @__PURE__ */ React.createElement(Em, null, "someone be you?")), /* @__PURE__ */ React.createElement(Sub, null, "Pick where, which day and what time. We'll tell you the price next.")), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "1 \xB7 Where"), locs.map((l) => /* @__PURE__ */ React.createElement("button", { type: "button", key: l.id, className: `option ${loc === l.id ? "on" : ""}`, "aria-pressed": loc === l.id, onClick: () => setLoc(l.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 20 }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong" }, l.name), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, l.sub)), loc === l.id && /* @__PURE__ */ React.createElement("span", { className: "check-dot" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 }))))), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "2 \xB7 Day"), /* @__PURE__ */ React.createElement("div", { className: "calendar" }, /* @__PURE__ */ React.createElement("div", { className: "cal-head" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "cal-nav", disabled: !canPrev, "aria-label": "Previous month", onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1)) }, /* @__PURE__ */ React.createElement(Icon, { name: "back", size: 18 })), /* @__PURE__ */ React.createElement("strong", null, MONTH[month.getMonth()], " ", month.getFullYear()), /* @__PURE__ */ React.createElement("button", { type: "button", className: "cal-nav", disabled: !canNext, "aria-label": "Next month", onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1)) }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 18 }))), /* @__PURE__ */ React.createElement("div", { className: "cal-grid", role: "grid" }, DAY.map((d) => /* @__PURE__ */ React.createElement("span", { key: d, className: "cal-dow" }, d[0])), cells.map((d, i) => d ? /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          key: i,
          disabled: d < today,
          className: `cal-day ${date && sameDay(d, date) ? "on" : ""} ${sameDay(d, today) ? "today" : ""}`,
          "aria-label": fmtDate(d),
          "aria-pressed": !!date && sameDay(d, date),
          onClick: () => pick(d)
        },
        d.getDate(),
        /* @__PURE__ */ React.createElement("span", { className: "cal-dots" }, visitsOn(d).length > 0 && /* @__PURE__ */ React.createElement("i", { className: "teal" }), busyOn(d).length > 0 && /* @__PURE__ */ React.createElement("i", { className: "gray" }))
      ) : /* @__PURE__ */ React.createElement("span", { key: i }))), /* @__PURE__ */ React.createElement("div", { className: "cal-legend" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "teal" }), "PRESENT visit"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "gray" }), "Your calendar"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "ring" }), "Today")))), date && /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "3 \xB7 Time on ", fmtDate(date))), /* @__PURE__ */ React.createElement("div", { className: "seg", role: "group", "aria-label": "Visit length" }, [1, 2, 3].map((h) => /* @__PURE__ */ React.createElement("button", { type: "button", key: h, className: hrs === h ? "on" : "", "aria-pressed": hrs === h, onClick: () => {
        setHrs(h);
        if (start != null && start + h > 19) setStart(null);
      } }, h, " ", h === 1 ? "hour" : "hours"))), /* @__PURE__ */ React.createElement("div", { className: "dayview" }, HOURS.map((h) => {
        const ok = slotOk(h, date);
        const sel = start != null && h >= start && h < start + hrs;
        const ev = busyOn(date).find((e) => h >= e.from && h < e.to);
        const v = visitsOn(date).find((x) => h >= x.start.getHours() && h < x.start.getHours() + x.hrs);
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            key: h,
            className: `slot ${sel ? "on" : ""} ${sel && h === start ? "first" : ""} ${!ok && !sel ? "off" : ""}`,
            disabled: !ok,
            onClick: () => setStart(h),
            "aria-label": `${fmtHour(h)}${ev ? ", busy: " + ev.title : ""}`
          },
          /* @__PURE__ */ React.createElement("span", { className: "slot-time" }, fmtHour(h).replace(":00", "")),
          /* @__PURE__ */ React.createElement("span", { className: "slot-lane" }, sel && h === start && /* @__PURE__ */ React.createElement("span", { className: "blk new" }, "New visit \xB7 ", range(start, hrs)), !sel && v && /* @__PURE__ */ React.createElement("span", { className: "blk visit" }, CO[v.companion].first, " \xB7 Visit ", v.n), !sel && !v && ev && /* @__PURE__ */ React.createElement("span", { className: "blk busy" }, h === ev.from || h === start + hrs ? ev.title : ""), !sel && !v && !ev && past(h, date) && /* @__PURE__ */ React.createElement("span", { className: "blk past" }, "Past"))
        );
      })), late && /* @__PURE__ */ React.createElement("div", { className: "note amber" }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 18 }), /* @__PURE__ */ React.createElement("p", null, "This starts in under 24 hours, so last-minute pricing applies unless you're subscribed.")), busy && /* @__PURE__ */ React.createElement("div", { className: "note" }, /* @__PURE__ */ React.createElement(Icon, { name: "calendar", size: 18 }), /* @__PURE__ */ React.createElement("p", null, "You're busy then: ", busy.title, ". A good time to send someone."))))
    );
  }
  function Quote({ p }) {
    const { db, nav, book } = useApp();
    const des = db.designated ? CO[db.designated] : null;
    const startAt = at(p.date, p.start);
    const [who, setWho] = useState2(p.who || "any");
    const [more, setMore] = useState2(p.who === "designated");
    const q = quote(db, startAt, p.hrs, who);
    const loc = locations(db).find((l) => l.id === p.loc);
    const late = hoursFrom(startAt) < 24;
    const desBlocked = late && des && !des.lastMinute;
    const tone = q.kind === "included" ? "teal" : q.kind === "last" ? "amber" : "ink";
    const anyOn = who === "any" || desBlocked || !des;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "New visit" }),
        footer: q.matching ? /* @__PURE__ */ React.createElement(Btn, { icon: "shuffle", onClick: () => nav("matching", { ...p, who }) }, "Find a match") : q.kind === "included" ? /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
          const id = book({ ...p, companion: q.companion, kind: q.kind });
          nav("booked", { id });
        } }, "Confirm visit \xB7 $0.00") : /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("pay", { ...p, who, companion: q.companion }) }, "Continue to payment")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: `quote-card ${tone}` }, /* @__PURE__ */ React.createElement("span", { className: "quote-tag" }, q.kind === "included" ? "Included" : q.kind === "last" ? "Last-minute pricing" : "Normal pricing"), /* @__PURE__ */ React.createElement("p", { className: "quote-price" }, q.kind === "included" ? "Free" : money(q.rate), /* @__PURE__ */ React.createElement("span", null, q.kind === "included" ? " with Always " + des.first : "/hr")), /* @__PURE__ */ React.createElement("p", { className: "small" }, q.detail)), /* @__PURE__ */ React.createElement("div", { className: "summary" }, /* @__PURE__ */ React.createElement(KV, { k: "When", v: `${fmtDate(p.date)} \xB7 ${range(p.start, p.hrs)}` }), /* @__PURE__ */ React.createElement(KV, { k: "Where", v: loc.name }), /* @__PURE__ */ React.createElement(KV, { k: "Visiting", v: `${patientOf(db).name} \xB7 as Claire` })), q.kind !== "included" && /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Who goes"), /* @__PURE__ */ React.createElement("button", { type: "button", className: `option ${anyOn ? "on" : ""}`, "aria-pressed": anyOn, onClick: () => setWho("any") }, /* @__PURE__ */ React.createElement("span", { className: "choice-empty sm" }, /* @__PURE__ */ React.createElement(Icon, { name: "shuffle", size: 20 })), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong" }, "Any available companion"), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, money(late ? RATES.last : RATES.single), "/hr \xB7 we match the closest face")), anyOn && /* @__PURE__ */ React.createElement("span", { className: "check-dot" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 }))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "more-toggle", "aria-expanded": more, onClick: () => setMore(!more) }, more ? "Hide other pricing options" : "See other pricing options", /* @__PURE__ */ React.createElement(Icon, { name: "down", size: 16, sw: 2.2 })), more && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: `option ${who === "designated" && !desBlocked && des ? "on" : ""}`,
          disabled: desBlocked,
          "aria-pressed": who === "designated",
          onClick: () => des ? setWho("designated") : nav("companions", { mode: "pick" })
        },
        des ? /* @__PURE__ */ React.createElement(Pic, { src: companionImg(des), w: 44, h: 44, r: 12, alt: "" }) : /* @__PURE__ */ React.createElement("span", { className: "choice-empty sm" }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 20 })),
        /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong" }, des ? `Designated companion \xB7 ${des.name}` : "Designated companion"), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, !des ? "Choose someone to send every time" : desBlocked ? `${des.first} doesn't take last-minute bookings` : `${money(late ? RATES.last : RATES.reserved)}/hr \xB7 same face every time`)),
        who === "designated" && !desBlocked && des && /* @__PURE__ */ React.createElement("span", { className: "check-dot" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 }))
      ), /* @__PURE__ */ React.createElement("div", { className: "option sub-offer" }, /* @__PURE__ */ React.createElement("span", { className: "choice-empty sm" }, /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 20 })), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong block" }, "Always ", des ? des.first : "Maya", " \xB7 ", money(RATES.always), "/mo"), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, "Subscribe and this visit is included. No last-minute rates, ever.")), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "soft", full: false, onClick: () => nav("subscribe", { fromQuote: true }) }, "Subscribe")))), /* @__PURE__ */ React.createElement("div", { className: "stack-10 px-4" }, q.kind === "included" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(KV, { k: `${p.hrs} ${p.hrs === 1 ? "hour" : "hours"} with ${des.first}`, v: "Included" }), /* @__PURE__ */ React.createElement(KV, { k: "Emotional labor surcharge", v: "Included" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(KV, { k: `${p.hrs} ${p.hrs === 1 ? "hr" : "hrs"} \xD7 ${money(q.rate)}`, v: money(q.total) }), /* @__PURE__ */ React.createElement(KV, { k: "Emotional labor surcharge", v: "Included" })), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(KV, { k: "Total", v: money(q.total), strong: true })), q.matching && /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Next we'll match a companion to Claire's face, voice and history. You approve the match before paying."))
    );
  }
  function Matching({ p }) {
    const { db, nav } = useApp();
    const startAt = at(p.date, p.start);
    const late = hoursFrom(startAt) < 24;
    const pool = matchPool(db, late);
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [pick, setPick] = useState2(0);
    const [stage, setStage] = useState2(0);
    const [flick, setFlick] = useState2(0);
    const stages = [`Checking ${pool.length} available companions near Maple Grove`, "Applying your filters and do-not list", "Comparing face, voice and height to Claire's"];
    useEffect(() => {
      setStage(0);
      if (reduce) {
        setStage(3);
        return;
      }
      const timers = [1, 2, 3].map((s) => setTimeout(() => setStage(s), s * 900));
      return () => timers.forEach(clearTimeout);
    }, [pick]);
    useEffect(() => {
      if (stage >= 3) return;
      const t = setInterval(() => setFlick((f) => f + 1), 180);
      return () => clearInterval(t);
    }, [stage]);
    if (!pool.length) return /* @__PURE__ */ React.createElement(Screen, { header: /* @__PURE__ */ React.createElement(Header, { title: "Matching" }) }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Title, null, "No one is free then."), /* @__PURE__ */ React.createElement(Sub, null, "Try another time, or subscribe so your designated companion always goes.")));
    const c = pool[pick % pool.length];
    const shown = stage < 3 ? pool[flick % pool.length] : c;
    const done = stage >= 3;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "Matching" }),
        footer: done ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => nav("pay", { ...p, companion: c.id, who: "any" }) }, "Accept ", c.first), /* @__PURE__ */ React.createElement(Btn, { kind: "ghost", icon: "shuffle", onClick: () => setPick(pick + 1) }, "Find someone else")) : /* @__PURE__ */ React.createElement(Btn, { disabled: true }, "Matching\u2026")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, done ? /* @__PURE__ */ React.createElement(React.Fragment, null, "We found ", /* @__PURE__ */ React.createElement(Em, null, "you.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, "Finding someone ", /* @__PURE__ */ React.createElement(Em, null, "like you\u2026"))), /* @__PURE__ */ React.createElement(Sub, null, done ? `${c.first} is the closest available match for ${fmtDate(p.date)}.` : "This usually takes a few seconds.")), /* @__PURE__ */ React.createElement("div", { className: `match-stage ${done ? "done" : ""}` }, /* @__PURE__ */ React.createElement(Pic, { src: companionImg(shown), w: 150, h: 180, r: 24, alt: done ? c.name : "" }), /* @__PURE__ */ React.createElement("div", { className: "match-meter" }, /* @__PURE__ */ React.createElement("span", { style: { width: `${done ? c.likeness : 30 + flick * 7 % 60}%` } })), /* @__PURE__ */ React.createElement("p", { className: "strong" }, done ? `${c.likeness}% likeness to Claire` : "Comparing\u2026")), /* @__PURE__ */ React.createElement("ol", { className: "match-steps" }, stages.map((s, i) => /* @__PURE__ */ React.createElement("li", { key: s, className: stage > i ? "done" : stage === i ? "now" : "" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }, stage > i ? /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, sw: 3 }) : null), s))), done && /* @__PURE__ */ React.createElement(IdCard, { c }))
    );
  }
  function Pay({ p }) {
    const { db, nav, book } = useApp();
    const startAt = at(p.date, p.start);
    const q = quote(db, startAt, p.hrs, p.who);
    const c = CO[p.companion];
    const loc = locations(db).find((l) => l.id === p.loc);
    const kind = q.kind;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "Review & pay" }),
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
          const id = book({ ...p, kind });
          nav("booked", { id });
        } }, "Pay ", money(q.total)), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "One visit. No commitment, from anyone."))
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "Almost ", /* @__PURE__ */ React.createElement(Em, null, "off the hook.")), /* @__PURE__ */ React.createElement(Sub, null, "One last look before someone else starts being you.")), /* @__PURE__ */ React.createElement("div", { className: `plan-box ${kind === "last" ? "amber" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Your visit"), kind === "last" ? /* @__PURE__ */ React.createElement(Tag, { tone: "amber" }, "Last-minute") : /* @__PURE__ */ React.createElement(Tag, null, "Normal pricing")), /* @__PURE__ */ React.createElement("div", { className: "row gap-12" }, /* @__PURE__ */ React.createElement(Pic, { src: companionImg(c), w: 52, h: 52, r: 14, alt: c.name }), /* @__PURE__ */ React.createElement("div", { className: "grow" }, /* @__PURE__ */ React.createElement("p", { className: "plan-name" }, c.name, " as Claire"), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, kind === "reserved" ? "Your designated companion" : "Matched for this visit", " \xB7 ", c.likeness, "% likeness"))), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(KV, { k: "When", v: `${fmtDate(p.date)} \xB7 ${range(p.start, p.hrs)}` }), /* @__PURE__ */ React.createElement(KV, { k: "Where", v: loc.name })), /* @__PURE__ */ React.createElement("div", { className: "stack-10 px-4" }, /* @__PURE__ */ React.createElement(KV, { k: `${p.hrs} ${p.hrs === 1 ? "hr" : "hrs"} \xD7 ${money(q.rate)}`, v: money(q.total) }), /* @__PURE__ */ React.createElement(KV, { k: "Emotional labor surcharge", v: "Included" }), /* @__PURE__ */ React.createElement(KV, { k: "Guilt", v: "$0.00" }), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(KV, { k: "Due today", v: money(q.total), strong: true })), /* @__PURE__ */ React.createElement(PaymentRow, null))
    );
  }
  function Booked({ p }) {
    const { db, nav, reset } = useApp();
    const v = db.visits.find((x) => x.id === p.id);
    const c = CO[v.companion];
    const pt = patientOf(db);
    const note = v.kind === "included" ? `${pt.name} will be told her ${roleOf(db)} is on the way.` : v.kind === "last" ? `Subscribers never pay last-minute rates. Always ${CO[db.designated || "maya"].first} covers every visit.` : `${pt.name} will be told her ${roleOf(db)} is on the way.`;
    return /* @__PURE__ */ React.createElement(Screen, { className: "done", footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => reset("home") }, "Go to home"), /* @__PURE__ */ React.createElement(Btn, { kind: "ghost", onClick: () => nav("visit", { id: v.id }) }, "See visit details")) }, /* @__PURE__ */ React.createElement("div", { className: "done-body" }, /* @__PURE__ */ React.createElement("span", { className: "done-mark hook" }, /* @__PURE__ */ React.createElement(Icon, { name: "hook", size: 56, sw: 1.8, label: "A fishhook" })), /* @__PURE__ */ React.createElement(Tag, { tone: v.kind === "last" ? "amber" : "teal" }, v.kind === "included" ? "Included" : v.kind === "last" ? "Last-minute" : "Normal pricing"), /* @__PURE__ */ React.createElement("h1", { className: "display-xl" }, "You're off the hook."), /* @__PURE__ */ React.createElement("p", { className: "lede" }, c.first, " visits ", pt.name, " on ", fmtDate(v.start), " at ", fmtHour(v.start.getHours()), " as Claire. We'll send a report after, so it feels like you were there."), /* @__PURE__ */ React.createElement("div", { className: "note peach" }, /* @__PURE__ */ React.createElement(Icon, { name: "heart", size: 20 }), /* @__PURE__ */ React.createElement("p", null, note))));
  }
  function VisitDetail({ p }) {
    const { db, set, nav, back, toast, openSheet } = useApp();
    const upcoming = db.visits.filter((v2) => v2.start > NOW).sort((a, b) => a.start - b.start);
    const v = db.visits.find((x) => x.id === p.id) || upcoming[0];
    if (!v) return /* @__PURE__ */ React.createElement(Screen, { header: /* @__PURE__ */ React.createElement(Header, { title: "Visit" }) }, /* @__PURE__ */ React.createElement(Sub, null, "No upcoming visits."));
    const c = CO[v.companion];
    const pt = patientOf(db);
    const toggle = (i) => set((d) => ({ visits: d.visits.map((x) => x.id === v.id ? { ...x, prep: x.prep.map((it, j) => j === i ? { ...it, done: !it.done } : it) } : x) }));
    const dont = db.intake.dont;
    return /* @__PURE__ */ React.createElement(Screen, { header: /* @__PURE__ */ React.createElement(Header, { title: `Visit ${v.n}` }), footer: /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
      toast("Visit confirmed. Nothing else for you to do.");
      back();
    } }, "Confirm") }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, fmtDate(v.start), ", ", fmtHour(v.start.getHours()), ". ", /* @__PURE__ */ React.createElement(Em, null, "You're free.")), /* @__PURE__ */ React.createElement(Sub, null, c.first, " visits ", pt.name, " as Claire. Nothing for you to do but not show up.")), /* @__PURE__ */ React.createElement(IdCard, { c, foot: `Visiting as Claire \xB7 Visit ${v.n}`, footTone: "teal", onClick: () => nav("profile", { id: c.id }) }), /* @__PURE__ */ React.createElement("div", { className: "row gap-12 top" }, /* @__PURE__ */ React.createElement("span", { className: "icon-tile" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "strong" }, pt.place, pt.room ? " \xB7 " + pt.room : ""), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, range(v.start.getHours(), v.hrs), ". The front desk knows ", c.first, " as Claire."))), /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement(Eyebrow, null, c.first, "'s prep for this visit"), /* @__PURE__ */ React.createElement(AddBtn, { onClick: () => openSheet("addPrep", { id: v.id }) })), v.prep.map((it, i) => /* @__PURE__ */ React.createElement("label", { key: i, className: "check-row" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: it.done, onChange: () => toggle(i) }), /* @__PURE__ */ React.createElement("span", { className: "box" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 })), /* @__PURE__ */ React.createElement("span", null, it.t)))), /* @__PURE__ */ React.createElement("div", { className: "note peach stack-6 dont" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "row gap-8" }, /* @__PURE__ */ React.createElement(Icon, { name: "ban", size: 16, sw: 2 }), /* @__PURE__ */ React.createElement(Eyebrow, { tone: "amber" }, "Your do-not list"))), DONT.map(([title, items]) => {
      const on = items.filter((k) => dont[k]);
      return on.length ? /* @__PURE__ */ React.createElement("p", { key: title, className: "small" }, /* @__PURE__ */ React.createElement("b", null, title, ":"), " ", on.map((k) => k.charAt(0).toLowerCase() + k.slice(1)).join(", ").replace("dad's", "Dad's")) : null;
    }))));
  }

  // src/tabs.jsx
  var { useState: useState3 } = React;
  function PatientChip() {
    const { db, openSheet } = useApp();
    const pt = patientOf(db);
    return /* @__PURE__ */ React.createElement("button", { type: "button", className: "patient-chip", onClick: () => openSheet("switcher"), "aria-label": `Visiting for ${pt.name}. Switch person` }, /* @__PURE__ */ React.createElement(Avatar, { letter: pt.letter, size: 28, color: pt.color }), "For ", pt.rel === "Mom" ? "Mom" : pt.name, /* @__PURE__ */ React.createElement(Icon, { name: "down", size: 14, sw: 2 }));
  }
  function Home() {
    const { db, nav } = useApp();
    const [hideTip, setHideTip] = useState3(false);
    const pt = patientOf(db);
    const unread = db.notifications.filter((n) => n.unread).length;
    const upcoming = db.visits.filter((v) => v.patient === db.patient && v.start > NOW).sort((a, b) => a.start - b.start);
    const sat = new Date(2026, 9, 17);
    const showTip = !hideTip && db.patient === "ellie" && !upcoming.some((v) => sameDay(v.start, sat));
    const mom = pt.rel === "Mom" ? "Mom" : pt.name;
    const des = db.designated ? CO[db.designated] : null;
    const bars = [26, 25, 23, 24, 20, 18, 17, 14, 12, 11, 9, 8];
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        className: "home",
        tab: "home",
        header: /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "header-row" }, /* @__PURE__ */ React.createElement("span", { className: "wordmark" }, "PRESENT"), /* @__PURE__ */ React.createElement("span", { className: "row gap-8" }, /* @__PURE__ */ React.createElement(PatientChip, null), /* @__PURE__ */ React.createElement("span", { className: "bell" }, /* @__PURE__ */ React.createElement(IconBtn, { name: "bell", label: `Notifications, ${unread} unread`, onClick: () => nav("notifications") }), unread > 0 && /* @__PURE__ */ React.createElement("i", null)))))
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, db.patient === "ellie" && db.history ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, null, "Mom loved your visit today, Claire. ", /* @__PURE__ */ React.createElement(Em, null, "You weren't there.")), /* @__PURE__ */ React.createElement("div", { className: "report" }, /* @__PURE__ */ React.createElement("img", { src: art("visit"), alt: "Ellie smiling with Maya during today's visit" }), /* @__PURE__ */ React.createElement("div", { className: "report-body stack-12" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("strong", null, "Today's visit \xB7 52 min"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "who-chip", onClick: () => nav("profile", { id: "maya" }) }, /* @__PURE__ */ React.createElement(Pic, { src: companionImg(CO.maya), w: 24, h: 24, r: 12, alt: "" }), "Maya", /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 12, sw: 2.6 }))), /* @__PURE__ */ React.createElement("p", { className: "report-quote" }, "\u201CShe called me Clairey six times and asked when I'd bring the dumplings.\u201D"), /* @__PURE__ */ React.createElement(Eyebrow, null, "Last 12 visits"), /* @__PURE__ */ React.createElement("div", { className: "trends" }, /* @__PURE__ */ React.createElement("div", { className: "trend peach" }, /* @__PURE__ */ React.createElement("span", { className: "xs" }, "Distress after visits"), /* @__PURE__ */ React.createElement("strong", null, "6 \u2192 2"), /* @__PURE__ */ React.createElement("span", { className: "bars", "aria-hidden": "true" }, bars.map((b, i) => /* @__PURE__ */ React.createElement("i", { key: i, style: { height: b } }))), /* @__PURE__ */ React.createElement("span", { className: "xxs" }, "Average, first visit vs now")), /* @__PURE__ */ React.createElement("div", { className: "trend aqua" }, /* @__PURE__ */ React.createElement("span", { className: "xs" }, "Recognized \u201Cyou\u201D"), /* @__PURE__ */ React.createElement("strong", null, "11 of 12"), /* @__PURE__ */ React.createElement("span", { className: "dots", "aria-hidden": "true" }, bars.map((_, i) => /* @__PURE__ */ React.createElement("i", { key: i, className: i === 3 ? "miss" : "" }))), /* @__PURE__ */ React.createElement("span", { className: "xxs" }, "Visits since August"))), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Scored by Maple Grove staff after each visit")))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, null, upcoming.length ? `${mom}'s next visit is booked.` : `Nothing booked for ${mom} yet.`, " ", /* @__PURE__ */ React.createElement(Em, null, upcoming.length ? "You're free." : "She won't notice.")), /* @__PURE__ */ React.createElement(Sub, null, upcoming.length ? "We'll send a report after each visit, so it feels like you were there." : `Add a visit and we'll send someone ${db.patient === "ellie" ? "she" : "he"}'ll think is you.`)), /* @__PURE__ */ React.createElement(Btn, { icon: "plus", onClick: () => nav("newVisit") }, "Add visit"), upcoming.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "Coming up"), upcoming.map((v, i) => /* @__PURE__ */ React.createElement("button", { type: "button", key: v.id, className: `next-visit ${i ? "light" : ""}`, onClick: () => nav("visit", { id: v.id }) }, /* @__PURE__ */ React.createElement("span", { className: "date-tile" }, /* @__PURE__ */ React.createElement("small", null, fmtDate(v.start).slice(0, 3).toUpperCase()), v.start.getDate()), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong block" }, i ? "" : "Next visit \xB7 ", fmtHour(v.start.getHours())), /* @__PURE__ */ React.createElement("span", { className: "xs block op" }, CO[v.companion].first, " as Claire \xB7 Visit ", v.n, v.kind === "last" ? " \xB7 last-minute" : "")), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 18 })))), showTip && /* @__PURE__ */ React.createElement("div", { className: "suggest" }, /* @__PURE__ */ React.createElement("div", { className: "row gap-12 top" }, /* @__PURE__ */ React.createElement("span", { className: "icon-tile peach" }, /* @__PURE__ */ React.createElement(Icon, { name: "calendar", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "stack-4" }, /* @__PURE__ */ React.createElement(Eyebrow, null, "From your calendar"), /* @__PURE__ */ React.createElement("p", { className: "strong" }, "Sat, Oct 17 \xB7 Leo's soccer tournament"), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, "You usually visit ", pt.name, " on Saturdays. You're busy, so send ", des ? des.first : "someone", " instead?"))), /* @__PURE__ */ React.createElement("div", { className: "row gap-8" }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", onClick: () => nav("newVisit", { date: sat, start: 14, hrs: 2, who: des ? "designated" : "any" }) }, "Book ", des ? des.first : "someone", " for Saturday"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "soft", full: false, onClick: () => setHideTip(true) }, "Not now"))))
    );
  }
  function MemoriesTab() {
    const { db, nav, openSheet } = useApp();
    const s = db.storage;
    const des = db.designated ? CO[db.designated] : null;
    const who = des ? des.first : "your companion";
    const kitPct = Math.min(100, Math.round(((db.nickname ? 1 : 0) + db.memories.length + db.photos.length + db.objects.length) / 12 * 100));
    const diary = [[12, "THU", 8, "Asked about the dumplings twice. Calm by the end."], [11, "THU", 1, "Didn't recognize \u201CClaire\u201D at first. Then she did."], [10, "THU", 24, "Sang along to the radio. Held Maya's hand."]];
    return /* @__PURE__ */ React.createElement(Screen, { tab: "memoriesTab", header: /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "header-row" }, /* @__PURE__ */ React.createElement("h1", { className: "title" }, "Memories"), /* @__PURE__ */ React.createElement(AddBtn, { onClick: () => openSheet("addMemory") }, "Add memory"))) }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Sub, null, "Everything ", who, " knows about being you."), /* @__PURE__ */ React.createElement("div", { className: "kit-card stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("strong", null, "Memory kit"), /* @__PURE__ */ React.createElement("strong", null, kitPct, "%")), /* @__PURE__ */ React.createElement(Meter, { value: kitPct / 100, tone: "light" }), /* @__PURE__ */ React.createElement("p", { className: "small op" }, kitPct >= 100 ? `Enough for ${who} to stop improvising.` : `Add more so ${who} can stop improvising.`), /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "row gap-6 xs warn" }, /* @__PURE__ */ React.createElement(Icon, { name: "storage", size: 14, sw: 2 }), s.limit === Infinity ? `${s.used.toFixed(1)} GB \xB7 unlimited` : `${s.used.toFixed(1)} of ${s.limit} GB${s.used / s.limit >= 0.9 ? " \xB7 almost full" : ""}`), s.limit !== Infinity && /* @__PURE__ */ React.createElement("button", { type: "button", className: "link light", onClick: () => openSheet("storage") }, "Get more space")), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "white", full: false, onClick: () => nav("kit") }, "Open memory kit")), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Shared Memories \xB7 ", db.memories.length), /* @__PURE__ */ React.createElement(AddBtn, { onClick: () => openSheet("addMemory") })), db.memories.map((m, i) => /* @__PURE__ */ React.createElement(MemoryCard, { key: i, m })), !db.memories.length && /* @__PURE__ */ React.createElement("p", { className: "empty-line" }, "Nothing yet. Add a story only ", patientOf(db).name, " and her ", roleOf(db), " would know.")), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Photos"), /* @__PURE__ */ React.createElement(PhotoGrid, null)), db.history && /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Visit Diary"), diary.map(([n, dow, d, t]) => /* @__PURE__ */ React.createElement("div", { key: n, className: "diary" }, /* @__PURE__ */ React.createElement("span", { className: "date-tile soft" }, /* @__PURE__ */ React.createElement("small", null, dow), d), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "strong" }, "Visit ", n, " \xB7 with Maya"), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, t)))))));
  }
  function Account() {
    const { db, nav, openSheet } = useApp();
    const des = db.designated ? CO[db.designated] : null;
    const pt = patientOf(db);
    const pts = Object.values(db.patients).map((x) => x.id === "ellie" ? pt : x);
    const visitsThisMonth = (db.history ? 12 : 0) + db.visits.filter((v) => !db.history || v.id > 1).length;
    return /* @__PURE__ */ React.createElement(Screen, { tab: "account", header: /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "header-row" }, /* @__PURE__ */ React.createElement("h1", { className: "title" }, "Account"))) }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "row gap-14" }, /* @__PURE__ */ React.createElement(Avatar, { letter: "C", size: 56 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "strong lg" }, "Claire"), /* @__PURE__ */ React.createElement("p", { className: "small muted" }, pt.name, "'s ", roleOf(db), ", on paper"))), /* @__PURE__ */ React.createElement("div", { className: "choice" }, /* @__PURE__ */ React.createElement("span", { className: "avatars" }, pts.map((pt2) => /* @__PURE__ */ React.createElement(Avatar, { key: pt2.id, letter: pt2.letter, size: 36, color: pt2.color, ring: true }))), /* @__PURE__ */ React.createElement("div", { className: "grow" }, /* @__PURE__ */ React.createElement("p", { className: "strong" }, "Visits for ", pts.length, " people"), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, pts.map((pt2) => pt2.rel === "Mom" ? `${pt2.name} (Mom)` : pt2.name).join(" \xB7 "))), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "soft", full: false, icon: "swap", onClick: () => openSheet("switcher") }, "Switch")), /* @__PURE__ */ React.createElement("div", { className: "sub-card stack-10" }, /* @__PURE__ */ React.createElement("div", { className: "row between baseline" }, /* @__PURE__ */ React.createElement("p", { className: "plan-name light" }, db.subscribed && des ? `Always ${des.first}` : "Pay per visit"), /* @__PURE__ */ React.createElement("p", { className: "strong" }, db.subscribed ? money(RATES.always) + "/mo" : "No subscription")), /* @__PURE__ */ React.createElement("p", { className: "small op" }, db.subscribed && des ? `For ${pt.name} \xB7 Renews Nov 13 \xB7 ${des.name} as Claire` : "Each visit is priced when you book it."), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "white", full: false, onClick: () => nav("plans") }, "Change plan")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "choice", onClick: () => nav("companions", { mode: "pick" }) }, des ? /* @__PURE__ */ React.createElement(Pic, { src: companionImg(des), w: 44, h: 44, r: 12, alt: "" }) : /* @__PURE__ */ React.createElement("span", { className: "choice-empty sm" }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 20 })), /* @__PURE__ */ React.createElement("span", { className: "grow left" }, /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, "Designated companion"), /* @__PURE__ */ React.createElement("span", { className: "strong block" }, des ? `${des.name} \xB7 ${des.likeness}% likeness` : "Choose someone")), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 16 })), /* @__PURE__ */ React.createElement("div", { className: "stats" }, /* @__PURE__ */ React.createElement("div", { className: "stat aqua" }, /* @__PURE__ */ React.createElement("span", { className: "xs" }, "Visits this month"), /* @__PURE__ */ React.createElement("strong", null, visitsThisMonth)), /* @__PURE__ */ React.createElement("div", { className: "stat peach" }, /* @__PURE__ */ React.createElement("span", { className: "xs" }, "Visits by you"), /* @__PURE__ */ React.createElement("strong", null, "0")), /* @__PURE__ */ React.createElement("div", { className: "stat mist" }, /* @__PURE__ */ React.createElement("span", { className: "xs" }, "Weekends saved"), /* @__PURE__ */ React.createElement("strong", null, db.history ? 4 : 0))), /* @__PURE__ */ React.createElement("div", { className: "list" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => nav("kit") }, /* @__PURE__ */ React.createElement(Icon, { name: "doc", size: 20 }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, "Memory kit"), /* @__PURE__ */ React.createElement("span", { className: "xs muted" }, db.storage.used.toFixed(1), " GB"), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 16 })), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => nav("intake", { edit: true }) }, /* @__PURE__ */ React.createElement(Icon, { name: "ban", size: 20 }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, "Do-not list"), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 16 })), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => nav("notifications") }, /* @__PURE__ */ React.createElement(Icon, { name: "bell", size: 20 }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, "Notifications"), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 16 })), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => nav("plans") }, /* @__PURE__ */ React.createElement(Icon, { name: "card", size: 20 }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, "Plan & payment"), /* @__PURE__ */ React.createElement("span", { className: "xs muted" }, "Card on file"), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 16 })))));
  }
  function Notifications() {
    const { db, set, nav, tab } = useApp();
    const go = (n) => {
      set((d) => ({ notifications: d.notifications.map((x) => x === n ? { ...x, unread: false } : x) }));
      if (n.to === "visit") nav("visit");
      else tab(n.to);
    };
    return /* @__PURE__ */ React.createElement(Screen, { header: /* @__PURE__ */ React.createElement(Header, { title: "", right: /* @__PURE__ */ React.createElement("button", { type: "button", className: "link", onClick: () => set((d) => ({ notifications: d.notifications.map((x) => ({ ...x, unread: false })) })) }, "Mark all read") }) }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Title, null, "Notifications"), db.notifications.map((n, i) => /* @__PURE__ */ React.createElement("button", { type: "button", key: i, className: `notif ${n.unread ? "unread" : ""}`, onClick: () => go(n) }, /* @__PURE__ */ React.createElement("span", { className: "icon-tile" }, /* @__PURE__ */ React.createElement(Icon, { name: n.icon, size: 20 })), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "strong" }, n.t), /* @__PURE__ */ React.createElement("span", { className: "xs muted" }, n.time)), /* @__PURE__ */ React.createElement("span", { className: "small muted block" }, n.b))))));
  }
  function SwitcherSheet() {
    const { db, set, closeSheet, nav } = useApp();
    return /* @__PURE__ */ React.createElement(Sheet, { title: "Who are you booking for?", sub: "Manage visits for everyone you can't get to." }, /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, Object.values(db.patients).map((x) => x.id === "ellie" ? patientOf(db) : x).map((pt) => /* @__PURE__ */ React.createElement("button", { type: "button", key: pt.id, className: `option ${db.patient === pt.id ? "on" : ""}`, "aria-pressed": db.patient === pt.id, onClick: () => {
      set({ patient: pt.id });
      closeSheet();
    } }, /* @__PURE__ */ React.createElement(Avatar, { letter: pt.letter, size: 44, color: pt.color }), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong block" }, pt.name, pt.rel === "Mom" ? " \xB7 Mom" : ""), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, pt.place, " \xB7 ", pt.id === "ellie" && db.subscribed && db.designated ? "Always " + CO[db.designated].first : "Pay per visit")), db.patient === pt.id && /* @__PURE__ */ React.createElement("span", { className: "check-dot" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 })))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "option dashed", onClick: () => {
      closeSheet();
      nav("intake", { onboarding: true });
    } }, /* @__PURE__ */ React.createElement("span", { className: "plus-circle" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 20, sw: 2.2 })), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong block" }, "Add someone"), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, "Set up visits for another relative.")))));
  }
  function AddMemorySheet() {
    const { db, set, closeSheet, openSheet, toast } = useApp();
    const [t, setT] = useState3("");
    const [b, setB] = useState3("");
    const [when, setWhen] = useState3("");
    const nm = db.designated ? CO[db.designated].first : "your companion";
    const Nm = nm.charAt(0).toUpperCase() + nm.slice(1);
    const full = db.storage.used + 0.1 > db.storage.limit;
    const add = () => {
      set((d) => ({ memories: [...d.memories, { t, b }], storage: { ...d.storage, used: Math.min(d.storage.limit, +(d.storage.used + 0.1).toFixed(1)) } }));
      closeSheet();
      toast(`Added. ${Nm} will rehearse it before the next visit.`);
    };
    return /* @__PURE__ */ React.createElement(Sheet, { title: "Add a memory", sub: `${Nm} will rehearse it before the next visit.` }, /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "What happened?"), /* @__PURE__ */ React.createElement("input", { id: "mem-title", placeholder: "e.g. Mahjong on Sunday afternoons", value: t, onChange: (e) => setT(e.target.value) })), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "What should ", nm, " say about it?"), /* @__PURE__ */ React.createElement("textarea", { id: "mem-body", rows: "3", placeholder: `e.g. She always let her ${roleOf(db)} win. Say they finally beat her fair and square.`, value: b, onChange: (e) => setB(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "When Was This?"), /* @__PURE__ */ React.createElement("div", { className: "wrap" }, ["Childhood", "Teens", "Adult", "Recent", "Other"].map((w) => /* @__PURE__ */ React.createElement(Pill, { key: w, on: when === w, onClick: () => setWhen(when === w ? "" : w) }, w)))), full ? /* @__PURE__ */ React.createElement("div", { className: "note amber" }, /* @__PURE__ */ React.createElement(Icon, { name: "storage", size: 18 }), /* @__PURE__ */ React.createElement("div", { className: "grow stack-8" }, /* @__PURE__ */ React.createElement("p", null, "Your memory kit is full. This one won't fit."), /* @__PURE__ */ React.createElement(Btn, { size: "sm", kind: "amber", full: false, icon: "plus", onClick: () => openSheet("storage") }, "Get more space"))) : /* @__PURE__ */ React.createElement(Btn, { onClick: add, disabled: !t.trim() }, "Add to memory kit"));
  }
  function AddPrepSheet({ p }) {
    const { db, set, closeSheet, toast } = useApp();
    const [t, setT] = useState3("Bring her the blue cardigan");
    const [type, setType] = useState3("Bring");
    const v = db.visits.find((x) => x.id === p.id);
    const c = CO[v.companion];
    return /* @__PURE__ */ React.createElement(Sheet, { title: `Add to ${c.first}'s prep`, sub: `${c.first} will get it done before ${fmtDate(v.start).slice(0, 3)}.` }, /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "What should ", c.first, " do?"), /* @__PURE__ */ React.createElement("input", { id: "prep", value: t, onChange: (e) => setT(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Type"), /* @__PURE__ */ React.createElement("div", { className: "wrap" }, ["Bring", "Say", "Wear", "Do", "Other"].map((w) => /* @__PURE__ */ React.createElement(Pill, { key: w, on: type === w, onClick: () => setType(w) }, w)))), /* @__PURE__ */ React.createElement(Btn, { disabled: !t.trim(), onClick: () => {
      set((d) => ({ visits: d.visits.map((x) => x.id === v.id ? { ...x, prep: [...x.prep, { t, done: false }] } : x) }));
      closeSheet();
      toast("Added to the prep list.");
    } }, "Add to prep"));
  }
  function AddPhotoSheet() {
    const { db, closeSheet, nav } = useApp();
    const nm = db.designated ? CO[db.designated].first : "your companion";
    const go = (r) => {
      closeSheet();
      nav(r);
    };
    const opt = (icon, title, sub, r, badge) => /* @__PURE__ */ React.createElement("button", { type: "button", className: "option", onClick: () => go(r) }, /* @__PURE__ */ React.createElement("span", { className: "icon-tile" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 20 })), /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong" }, title), badge && /* @__PURE__ */ React.createElement(Tag, { tone: "amber" }, badge), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, sub)), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 18 }));
    return /* @__PURE__ */ React.createElement(Sheet, { title: "Add photos", sub: `Faces are matched to ${nm} automatically, so they're in them instead of you.` }, /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, opt("image", "Choose from library", "Old family photos work best", "library"), opt("camera", "Take a photo", "Snap a print straight from the album", "camera"), opt("sparkle", "Generate with PRESENT AI", "New photos of moments that didn't happen", "generate", "Add-on")), /* @__PURE__ */ React.createElement(Btn, { kind: "ghost", onClick: closeSheet }, "Cancel"));
  }
  function StorageSheet() {
    const { db, set, closeSheet, toast } = useApp();
    const [plan, setPlan] = useState3("unlimited");
    const s = db.storage;
    const plans = [["plus", "Kit Plus", "50 GB \xB7 a few more years of her", "$4.99", 50], ["unlimited", "Kit Unlimited", "Every memory, kept forever", "$14.99", Infinity]];
    return /* @__PURE__ */ React.createElement(Sheet, { title: "Your memory kit is almost full", sub: "Your companion can only be as good as what you give them." }, /* @__PURE__ */ React.createElement("div", { className: "stack-8" }, /* @__PURE__ */ React.createElement("div", { className: "row between" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, s.plan), /* @__PURE__ */ React.createElement("span", { className: "label amber" }, s.used.toFixed(1), " of ", s.limit === Infinity ? "\u221E" : s.limit, " GB used")), /* @__PURE__ */ React.createElement(Meter, { value: s.limit === Infinity ? 0.1 : s.used / s.limit }), /* @__PURE__ */ React.createElement("p", { className: "xs muted" }, "Photos, voice notes and videos fill it fastest.")), /* @__PURE__ */ React.createElement("div", { className: "stack-8" }, plans.map(([id, name, sub, price, limit]) => /* @__PURE__ */ React.createElement("button", { type: "button", key: id, className: `option ${plan === id ? "on" : ""}`, "aria-pressed": plan === id, onClick: () => setPlan(id) }, /* @__PURE__ */ React.createElement("span", { className: "grow" }, /* @__PURE__ */ React.createElement("span", { className: "strong block" }, name), /* @__PURE__ */ React.createElement("span", { className: "xs muted block" }, sub)), /* @__PURE__ */ React.createElement("span", { className: "strong" }, price, /* @__PURE__ */ React.createElement("span", { className: "unit" }, "/mo"))))), /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
      const pl = plans.find((x) => x[0] === plan);
      set((d) => ({ storage: { ...d.storage, limit: pl[4], plan: pl[1] } }));
      closeSheet();
      toast(`${pl[1]} added. Keep the memories coming.`);
    } }, "Upgrade storage"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Billed with your plan. Cancel and your companion forgets what didn't fit."));
  }
  function addPhotos(set, keys) {
    set((d) => {
      const room = d.storage.limit - d.storage.used;
      const fit = keys.slice(0, Math.max(0, Math.floor(room / 0.1 + 1e-9)));
      return { photos: [...d.photos, ...fit], storage: { ...d.storage, used: +(d.storage.used + fit.length * 0.1).toFixed(1) } };
    });
  }
  function Library() {
    const { db, set, back, toast, openSheet } = useApp();
    const keys = ["dumplings", "wedding", "tea", "visit", "welcome", "helen"];
    const [sel, setSel] = useState3([]);
    const room = Math.floor((db.storage.limit - db.storage.used) / 0.1 + 1e-9);
    const tooMany = sel.length > room;
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "Choose photos", right: /* @__PURE__ */ React.createElement("span", { className: "label teal" }, sel.length, " selected") }),
        footer: tooMany ? /* @__PURE__ */ React.createElement(Btn, { kind: "amber", icon: "plus", onClick: () => openSheet("storage") }, "Get more space to add ", sel.length) : /* @__PURE__ */ React.createElement(Btn, { disabled: !sel.length, onClick: () => {
          addPhotos(set, sel);
          toast(`${sel.length} ${sel.length === 1 ? "photo" : "photos"} added to the kit.`);
          back();
        } }, "Add ", sel.length, " ", sel.length === 1 ? "photo" : "photos", " to the kit")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement("div", { className: "stack-6" }, /* @__PURE__ */ React.createElement(Title, null, "Old family ", /* @__PURE__ */ React.createElement(Em, null, "photos.")), /* @__PURE__ */ React.createElement(Sub, null, "Pick the ones your companion should appear in.")), /* @__PURE__ */ React.createElement("div", { className: "lib-grid" }, keys.map((k) => {
        const on = sel.includes(k);
        return /* @__PURE__ */ React.createElement("button", { type: "button", key: k, className: `lib-tile ${on ? "on" : ""}`, "aria-pressed": on, onClick: () => setSel(on ? sel.filter((x) => x !== k) : [...sel, k]) }, /* @__PURE__ */ React.createElement("img", { src: art(k), alt: "Family photo" }), on && /* @__PURE__ */ React.createElement("span", { className: "check-dot" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, sw: 3 })));
      })), tooMany && /* @__PURE__ */ React.createElement("p", { className: "small amber-text" }, "Only ", room, " more ", room === 1 ? "photo fits" : "photos fit", " in your kit."), /* @__PURE__ */ React.createElement("div", { className: "note peach" }, /* @__PURE__ */ React.createElement(Icon, { name: "swap", size: 20 }), /* @__PURE__ */ React.createElement("p", null, "We swap your face for your companion's before the visit. The originals stay yours.")))
    );
  }
  function Camera() {
    const { set, back, toast } = useApp();
    return /* @__PURE__ */ React.createElement(Screen, { className: "camera", header: /* @__PURE__ */ React.createElement(Header, { title: "Take a photo" }) }, /* @__PURE__ */ React.createElement("div", { className: "camera-body" }, /* @__PURE__ */ React.createElement("p", { className: "small center" }, "Line up the print inside the frame."), /* @__PURE__ */ React.createElement("div", { className: "viewfinder" }, /* @__PURE__ */ React.createElement("img", { src: art("wedding"), alt: "A wedding photo print in the viewfinder" })), /* @__PURE__ */ React.createElement("p", { className: "xs center" }, "We'll find her face, and yours, automatically."), /* @__PURE__ */ React.createElement("button", { type: "button", className: "shutter", "aria-label": "Take photo", onClick: () => {
      addPhotos(set, ["wedding"]);
      toast("Photo added to the kit.");
      back();
    } }, /* @__PURE__ */ React.createElement("span", null))));
  }
  function Generate() {
    const { set, back, toast } = useApp();
    const [txt, setTxt] = useState3("");
    const [style, setStyle] = useState3("Film photo");
    const [made, setMade] = useState3(false);
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        header: /* @__PURE__ */ React.createElement(Header, { title: "PRESENT AI \xB7 Add-on" }),
        footer: made ? /* @__PURE__ */ React.createElement(Btn, { onClick: () => {
          addPhotos(set, ["visit"]);
          toast("Generated photo added. $4.99 billed with your plan.");
          back();
        } }, "Add to kit \xB7 $4.99") : /* @__PURE__ */ React.createElement(Btn, { icon: "sparkle", disabled: !txt.trim(), onClick: () => setMade(true) }, "Generate preview")
      },
      /* @__PURE__ */ React.createElement("div", { className: "stack" }, /* @__PURE__ */ React.createElement(Title, null, "Make a memory ", /* @__PURE__ */ React.createElement(Em, null, "that never happened.")), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, "Describe the moment"), /* @__PURE__ */ React.createElement("textarea", { id: "gen", rows: "3", placeholder: "e.g. Mom and me at the beach in 1998. I'm in the yellow raincoat she bought me.", value: txt, onChange: (e) => {
        setTxt(e.target.value);
        setMade(false);
      } })), /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Style"), /* @__PURE__ */ React.createElement("div", { className: "wrap" }, ["Film photo", "Polaroid", "Home video still"].map((s) => /* @__PURE__ */ React.createElement(Pill, { key: s, on: style === s, onClick: () => {
        setStyle(s);
        setMade(false);
      } }, s)))), made && /* @__PURE__ */ React.createElement("div", { className: "stack-10" }, /* @__PURE__ */ React.createElement("p", { className: "label" }, "Preview"), /* @__PURE__ */ React.createElement("div", { className: "gen-grid" }, /* @__PURE__ */ React.createElement("img", { src: art("visit"), alt: "Generated preview" }), /* @__PURE__ */ React.createElement("img", { src: art("welcome"), alt: "Generated preview, second option" }))), /* @__PURE__ */ React.createElement("div", { className: "note peach" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkle", size: 18 }), /* @__PURE__ */ React.createElement("p", null, "$4.99 per photo. Faces are matched to your companion.")))
    );
  }

  // src/App.jsx
  var { useState: useState4, useEffect: useEffect2, useRef } = React;
  var SCREENS = {
    welcome: Welcome,
    intake: Intake,
    companions: Companions,
    filters: Filters,
    profile: Profile,
    kit: Kit,
    plans: Plans,
    subscribe: Subscribe,
    newVisit: NewVisit,
    quote: Quote,
    matching: Matching,
    pay: Pay,
    booked: Booked,
    visit: VisitDetail,
    home: Home,
    memoriesTab: MemoriesTab,
    account: Account,
    notifications: Notifications,
    library: Library,
    camera: Camera,
    generate: Generate
  };
  var SHEETS = { switcher: SwitcherSheet, addMemory: AddMemorySheet, addPrep: AddPrepSheet, addPhoto: AddPhotoSheet, storage: StorageSheet };
  var DEFAULT_PREP = ["Bring something she loves", "Learn one new story from the kit"];
  var DEVICE_W = 402 + 24;
  var DEVICE_H = 874 + 24;
  function App() {
    const [db, setDb] = useState4(initialDB);
    const key = useRef(1);
    const [stack, setStack] = useState4([{ name: "welcome", params: {}, k: 0 }]);
    const [motion, setMotion] = useState4("fade");
    const [sheet, setSheet] = useState4(null);
    const [toastMsg, setToastMsg] = useState4(null);
    const [scale, setScale] = useState4(1);
    const [onPhone, setOnPhone] = useState4(false);
    useEffect2(() => {
      const measure = () => {
        setOnPhone(window.innerWidth <= 500);
        setScale(Math.min(1, (window.innerWidth - 32) / DEVICE_W, (window.innerHeight - 32) / DEVICE_H));
      };
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, []);
    useEffect2(() => {
      if (!toastMsg) return;
      const t = setTimeout(() => setToastMsg(null), 2800);
      return () => clearTimeout(t);
    }, [toastMsg]);
    const go = (name, params = {}) => [{ name, params, k: key.current++ }];
    const app = {
      db,
      set: (patch) => setDb((d) => ({ ...d, ...typeof patch === "function" ? patch(d) : patch })),
      nav: (name, params = {}) => {
        setMotion("push");
        setSheet(null);
        setStack((s) => [...s, ...go(name, params)]);
      },
      // Goes back n screens (one by default). Ignores anything that isn't a number, like a click event.
      back: (n) => {
        const k = typeof n === "number" ? n : 1;
        setMotion("pop");
        setSheet(null);
        setStack((s) => s.length > k ? s.slice(0, -k) : s.slice(0, 1));
      },
      tab: (name) => {
        setMotion("fade");
        setSheet(null);
        setStack(go(name));
      },
      reset: (name) => {
        setMotion("fade");
        setSheet(null);
        setStack(go(name));
      },
      openSheet: (name, params = {}) => setSheet({ name, params, k: key.current++ }),
      closeSheet: () => setSheet(null),
      toast: (msg) => setToastMsg({ msg, k: key.current++ }),
      // Adds a visit for the current person and returns its id.
      book: ({ date, start, hrs, companion, kind }) => {
        const id = key.current++;
        setDb((d) => {
          const n = Math.max(12, ...d.visits.map((v) => v.n)) + 1;
          const visit = { id, patient: d.patient, start: at(date, start), hrs, companion, kind, n, prep: DEFAULT_PREP.map((t) => ({ t, done: false })) };
          const note = { icon: "calendar", t: "Visit booked", b: `Visit ${n} is confirmed. Nothing else for you to do.`, time: "Now", unread: true, to: "home" };
          return { ...d, visits: [...d.visits, visit], notifications: [note, ...d.notifications] };
        });
        return id;
      }
    };
    const top = stack[stack.length - 1];
    const Current = SCREENS[top.name];
    const SheetC = sheet && SHEETS[sheet.name];
    const device = /* @__PURE__ */ React.createElement("div", { className: "device" }, /* @__PURE__ */ React.createElement("div", { key: top.k, className: `stage ${motion}` }, /* @__PURE__ */ React.createElement(Current, { p: top.params })), SheetC && /* @__PURE__ */ React.createElement(SheetC, { key: sheet.k, p: sheet.params }), toastMsg && /* @__PURE__ */ React.createElement("div", { key: toastMsg.k, className: "toast", role: "status" }, toastMsg.msg));
    if (onPhone) return /* @__PURE__ */ React.createElement(Ctx.Provider, { value: app }, /* @__PURE__ */ React.createElement("div", { className: "phone-full" }, device));
    return /* @__PURE__ */ React.createElement(Ctx.Provider, { value: app }, /* @__PURE__ */ React.createElement("div", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "device-slot", style: { width: DEVICE_W * scale, height: DEVICE_H * scale } }, /* @__PURE__ */ React.createElement("div", { className: "bezel", style: { transform: `scale(${scale})` } }, device))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
