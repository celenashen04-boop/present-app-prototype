// PRESENT prototype — data, pricing and time helpers.

// The prototype's fixed "now": Tue, Oct 13 2026, 11:00 AM. Visits starting within 24 hours are last-minute.
export const NOW = new Date(2026, 9, 13, 11, 0);

export const RATES = { single: 37.99, reserved: 64.99, last: 89.99, always: 8499.99 };

export const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const at = (d, h) => { const x = new Date(d); x.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0); return x; };
export const fmtHour = h => { const hh = Math.floor(h); const ap = hh >= 12 ? 'PM' : 'AM'; return `${((hh + 11) % 12) + 1}:${h % 1 ? '30' : '00'} ${ap}`; };
export const fmtDate = d => `${DAY[d.getDay()]}, ${MONTH[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
export const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const hoursFrom = d => (d - NOW) / 36e5;

// Simple illustrated faces for companions without a hand-drawn portrait.
export function avatarSVG({ bg, skin, hair, style = 'long', shirt, glasses }) {
  const long = style === 'long' ? `<path d="M108 210 Q98 84 200 76 Q302 84 292 210 L304 336 L96 336 Z" fill="${hair}"/>` : '';
  const top = style === 'short'
    ? `<path d="M120 182 Q114 92 200 90 Q286 92 280 182 Q266 128 200 126 Q134 128 120 182Z" fill="${hair}"/>`
    : style === 'bun'
      ? `<circle cx="200" cy="74" r="34" fill="${hair}"/><path d="M118 188 Q112 98 200 96 Q288 98 282 188 Q262 136 200 132 Q138 136 118 188Z" fill="${hair}"/>`
      : `<path d="M116 196 Q110 96 200 92 Q290 96 284 196 Q250 120 196 124 Q150 128 116 196Z" fill="${hair}"/>`;
  const specs = glasses ? `<g fill="none" stroke="#2B2B2B" stroke-width="5"><circle cx="168" cy="192" r="22"/><circle cx="232" cy="192" r="22"/><path d="M190 192h20"/></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${bg}"/>${long}
<path d="M56 400 Q66 296 200 286 Q334 296 344 400 Z" fill="${shirt}"/>
<rect x="174" y="236" width="52" height="64" rx="22" fill="${skin}"/>
<ellipse cx="200" cy="190" rx="80" ry="90" fill="${skin}"/>${top}
<g fill="none" stroke="#2B2B2B" stroke-width="6" stroke-linecap="round"><path d="M156 194q12-13 24 0"/><path d="M220 194q12-13 24 0"/><path d="M178 232q22 18 44 0"/></g>
<circle cx="148" cy="220" r="14" fill="#F08A7E" opacity=".45"/><circle cx="252" cy="220" r="14" fill="#F08A7E" opacity=".45"/>${specs}</svg>`;
}

const Q = s => `“${s}”`;
export const COMPANIONS = [
  { id: 'maya', first: 'Maya', name: 'Maya L.', age: 46, gender: 'Woman', looks: 'East Asian', features: ['Shoulder-length hair'], langs: ['Mandarin', 'English'], tone: 'Soft-spoken', background: 'Hospice care', can: ['Cook her recipes'], likeness: 94, lastMinute: false, available: false, avail: 'Waitlist · 2 wks', played: 31, img: 'maya',
    quote: Q("Hi, I'm Maya. Twelve years in hospice taught me how to sit with someone. I've been somebody's daughter 31 times since. Send me the stories and the songs, and I'll tell them back like they're mine. She'll never know I'm not you."),
    bookNote: 'Book at least 24 hours ahead. Her next opening is in 2 weeks.' },
  { id: 'grace', first: 'Grace', name: 'Grace W.', age: 43, gender: 'Woman', looks: 'East Asian', features: ['Shoulder-length hair'], langs: ['English'], tone: 'Cheerful', background: 'Acting', can: ['Sing her songs'], likeness: 88, lastMinute: false, available: true, avail: 'Available Thu', played: 12, img: 'grace',
    quote: Q("Hi, I'm Grace. I've played grieving daughters on stage for fifteen years. This is the same role with a smaller audience. Give me your lines and I'll land every one. She'll cry at the right parts."),
    bookNote: 'Book at least 24 hours ahead. Next opening Thursday, between rehearsals.' },
  { id: 'helen', first: 'Helen', name: 'Helen C.', age: 49, gender: 'Woman', looks: 'East Asian', features: [], langs: ['English'], tone: 'Calm', background: 'Social work', can: ['Play mahjong'], likeness: 81, lastMinute: true, available: true, avail: 'Available today', played: 18, img: 'helen',
    quote: Q("I'm Helen. For thirty years I told families to visit more. Now I just go for them. I'll learn her songs, her stories, and when to stop talking. You won't have to."),
    bookNote: 'Takes last-minute bookings at the last-minute rate. Available today.' },
  { id: 'mei', first: 'Mei', name: 'Mei T.', age: 44, gender: 'Woman', looks: 'East Asian', features: ['Glasses'], langs: ['Cantonese', 'English'], tone: 'Warm', background: 'Nursing', can: ['Cook her recipes'], likeness: 79, lastMinute: true, available: true, avail: 'Available today', played: 9,
    av: { bg: '#E3EEDC', skin: '#E8B98F', hair: '#1F1A1C', style: 'bun', shirt: '#6FA37A', glasses: true },
    quote: Q("I'm Mei. Night-shift nurse for twenty years, so I'm good at being calm at the wrong hour. I'll fold her laundry the way you did."),
    bookNote: 'Takes last-minute bookings. Prefers evenings.' },
  { id: 'priya', first: 'Priya', name: 'Priya S.', age: 41, gender: 'Woman', looks: 'South Asian', features: ['Shoulder-length hair'], langs: ['Hindi', 'English'], tone: 'Warm', background: 'Hospice care', can: ['Sing her songs'], likeness: 55, lastMinute: false, available: true, avail: 'Available Sat', played: 14,
    av: { bg: '#F6E2D3', skin: '#B97C53', hair: '#231815', style: 'long', shirt: '#C2577A' },
    quote: Q("I'm Priya. I hold hands for a living. Tell me the songs from her kitchen and I'll hum them on the way in."),
    bookNote: 'Book at least 24 hours ahead.' },
  { id: 'rosa', first: 'Rosa', name: 'Rosa M.', age: 52, gender: 'Woman', looks: 'Latina', features: [], langs: ['Spanish', 'English'], tone: 'Warm', background: 'Nursing', can: ['Cook her recipes'], likeness: 58, lastMinute: true, available: true, avail: 'Available tomorrow', played: 22,
    av: { bg: '#FBE7C6', skin: '#C98E64', hair: '#3A2418', style: 'bun', shirt: '#D9822B' },
    quote: Q("Soy Rosa. I've been a daughter, a niece and once a very convincing sister-in-law. Bring me her recipes."),
    bookNote: 'Takes last-minute bookings.' },
  { id: 'aisha', first: 'Aisha', name: 'Aisha K.', age: 39, gender: 'Woman', looks: 'Black', features: [], langs: ['English', 'French'], tone: 'Cheerful', background: 'Acting', can: ['Sing her songs'], likeness: 51, lastMinute: false, available: true, avail: 'Available Fri', played: 7,
    av: { bg: '#DDE5F7', skin: '#7A4A2E', hair: '#16100C', style: 'short', shirt: '#4F6BD8' },
    quote: Q("I'm Aisha. Improv taught me to say yes to whatever she believes. Today I'm whoever she needs."),
    bookNote: 'Book at least 24 hours ahead.' },
  { id: 'linda', first: 'Linda', name: 'Linda P.', age: 58, gender: 'Woman', looks: 'White', features: ['Glasses'], langs: ['English'], tone: 'Soft-spoken', background: 'Teaching', can: ['Play mahjong'], likeness: 47, lastMinute: true, available: true, avail: 'Available today', played: 26,
    av: { bg: '#E7E1F3', skin: '#F1C7A8', hair: '#B9B2A8', style: 'short', shirt: '#7D6BB3', glasses: true },
    quote: Q("I'm Linda. Thirty-one years of second grade. I am extremely patient with the same question."),
    bookNote: 'Takes last-minute bookings.' },
  { id: 'jun', first: 'Jun', name: 'Jun H.', age: 47, gender: 'Man', looks: 'East Asian', features: ['Glasses'], langs: ['Korean', 'English'], tone: 'Calm', background: 'Social work', can: ['Play mahjong'], likeness: 34, lastMinute: false, available: true, avail: 'Available Sun', played: 11,
    av: { bg: '#D5EEF0', skin: '#E2B48C', hair: '#1F1A1C', style: 'short', shirt: '#2F7F86', glasses: true },
    quote: Q("I'm Jun. I mostly play sons and the occasional husband. I can do a daughter's voice on the phone."),
    bookNote: 'Book at least 24 hours ahead.' },
  { id: 'tom', first: 'Tom', name: 'Tom B.', age: 50, gender: 'Man', looks: 'White', features: [], langs: ['English'], tone: 'Calm', background: 'Nursing', can: ['Sing her songs'], likeness: 21, lastMinute: true, available: true, avail: 'Available today', played: 5,
    av: { bg: '#FDE5DF', skin: '#EDBE9C', hair: '#6B4A33', style: 'short', shirt: '#A35A0C' },
    quote: Q("I'm Tom. Families book me when nobody else is free. She may decide I'm the plumber, and that's fine."),
    bookNote: 'Takes last-minute bookings.' },
];
export const CO = Object.fromEntries(COMPANIONS.map(c => [c.id, c]));
export const ageBand = a => a < 40 ? '30–40' : a < 50 ? '40–50' : '50–60';

export const FILTER_GROUPS = [
  { key: 'gender', label: 'Gender', opts: ['Woman', 'Man'], get: c => [c.gender] },
  { key: 'age', label: 'Age', opts: ['30–40', '40–50', '50–60'], get: c => [ageBand(c.age)] },
  { key: 'looks', label: 'Looks Like', opts: ['East Asian', 'South Asian', 'Black', 'Latina', 'White'], get: c => [c.looks] },
  { key: 'features', label: 'Features', opts: ['Shoulder-length hair', 'Glasses'], get: c => c.features },
  { key: 'tone', label: 'Tone Of Voice', opts: ['Soft-spoken', 'Warm', 'Cheerful', 'Calm'], get: c => [c.tone] },
  { key: 'langs', label: 'Language', opts: ['English', 'Mandarin', 'Cantonese', 'Korean', 'Spanish', 'Hindi', 'French'], get: c => c.langs },
  { key: 'background', label: 'Background', opts: ['Hospice care', 'Nursing', 'Acting', 'Social work', 'Teaching'], get: c => [c.background] },
  { key: 'can', label: 'Can Also', opts: ['Cook her recipes', 'Sing her songs', 'Play mahjong'], get: c => c.can },
];
export const EMPTY_FILTERS = { gender: [], age: [], looks: [], features: [], tone: [], langs: [], background: [], can: [], liked: false, lastMinute: false, minLikeness: 0 };
// `liked` is the list of companion ids the family has hearted.
export function applyFilters(list, f, liked = []) {
  return list.filter(c => FILTER_GROUPS.every(g => !f[g.key].length || g.get(c).some(v => f[g.key].includes(v)))
    && (!f.liked || liked.includes(c.id)) && (!f.lastMinute || c.lastMinute) && c.likeness >= f.minLikeness);
}
export const activeFilterChips = f => [
  ...FILTER_GROUPS.flatMap(g => f[g.key].map(v => ({ key: g.key, value: v, label: g.key === 'age' ? 'Age ' + v : v }))),
  ...(f.liked ? [{ key: 'liked', label: 'Liked' }] : []),
  ...(f.lastMinute ? [{ key: 'lastMinute', label: 'Takes last-minute' }] : []),
  ...(f.minLikeness ? [{ key: 'minLikeness', label: f.minLikeness + '%+ likeness' }] : []),
];

// What a visit costs, given who the family wants to send. `who` is 'designated' or 'any'.
export function quote(db, start, hrs, who) {
  const des = db.designated ? CO[db.designated] : null;
  const late = hoursFrom(start) < 24;
  if (db.subscribed && des) {
    return { kind: 'included', late, rate: 0, total: 0, companion: des.id, matching: false,
      title: 'Included in your subscription', detail: `Always ${des.first} covers every visit, even last-minute ones.` };
  }
  if (late) {
    const canDes = who === 'designated' && des && des.lastMinute;
    return { kind: 'last', late, rate: RATES.last, total: RATES.last * hrs, companion: canDes ? des.id : null, matching: !canDes,
      title: 'Last-minute pricing', detail: 'This visit starts in under 24 hours. Holidays and her birthday always count as last-minute.' };
  }
  if (who === 'designated' && des) {
    return { kind: 'reserved', late, rate: RATES.reserved, total: RATES.reserved * hrs, companion: des.id, matching: false,
      title: 'Normal pricing', detail: `Your designated companion, ${des.first}, goes. Same face every time.` };
  }
  return { kind: 'single', late, rate: RATES.single, total: RATES.single * hrs, companion: null, matching: true,
    title: 'Normal pricing', detail: 'Any available companion. We match the closest face on the day.' };
}
export const KIND_LABEL = { included: 'Always Maya', single: 'Any available companion', reserved: 'Designated companion', last: 'Last-minute visit' };

// Who the matcher considers for a visit without a designated companion.
export function matchPool(db, late) {
  const pool = COMPANIONS.filter(c => c.available && (!late || c.lastMinute));
  const filtered = applyFilters(pool, db.filters, db.liked);
  return (filtered.length ? filtered : pool).sort((a, b) => b.likeness - a.likeness);
}

// Things from the family's own calendar that the visit planner shows as busy.
export const MY_CALENDAR = [
  { date: new Date(2026, 9, 17), from: 10, to: 16, title: "Leo's soccer tournament" },
  { date: new Date(2026, 9, 14), from: 9, to: 12, title: 'Quarterly review' },
  { date: new Date(2026, 9, 20), from: 13, to: 15, title: 'Dentist' },
];

export const DONT = [
  ['Never mention', ['Her diagnosis', "Dad's death", 'The divorce', 'Money']],
  ['Never bring', ['Your real name', 'New gifts', 'Off-plan food']],
  ['Never do', ['Correct her', 'Quiz her memory', 'Rush goodbyes']],
];

// A returning family with history, for the toolbar's "Demo account".
export function demoDB() {
  return {
    patient: 'ellie',
    history: true,
    patients: {
      ellie: { id: 'ellie', name: 'Ellie', rel: 'Mom', letter: 'E', color: '#17808A', place: 'Maple Grove Memory Care', room: 'Room 214' },
      wen: { id: 'wen', name: 'Grandpa Wen', rel: 'Grandfather', letter: 'W', color: '#A35A0C', place: 'Sunrise Senior Living', room: 'Room 9' },
    },
    intake: { called: 'Eleanor (Ellie)', place: 'Maple Grove Memory Care', address: '1450 SE Maple Grove Rd, Portland, OR 97214', asks: 'Her daughter',
      dont: { 'Her diagnosis': true, "Dad's death": true, 'The divorce': true, 'Your real name': true, 'New gifts': true, 'Correct her': true, 'Quiz her memory': true } },
    designated: 'maya',
    subscribed: false, // first visit to the app: no subscription, so visits are priced one by one
    liked: ['maya'],
    nickname: 'Clairey, bǎobèi',
    memories: [
      { t: 'Dumplings every New Year', b: "She taught you to pleat them. You always left yours lopsided and she'd laugh." },
      { t: 'Your wedding, 2009', b: 'She cried during the tea ceremony. Mention the red qipao.' },
    ],
    photos: ['dumplings', 'wedding', 'tea'],
    objects: ['Jasmine tea', 'Your perfume', 'Jade bracelet'],
    storage: { used: 4.7, limit: 5, plan: 'Free kit' },
    filters: { ...EMPTY_FILTERS },
    visits: [
      { id: 1, patient: 'ellie', start: new Date(2026, 9, 15, 14), hrs: 1, companion: 'maya', kind: 'reserved', n: 13,
        prep: [{ t: 'Bring dumplings, slightly lopsided', done: true }, { t: 'Tell the red qipao story', done: true }, { t: 'Wear your perfume', done: true }, { t: 'Learn her favorite song', done: false }] },
    ],
    notifications: [
      { icon: 'doc', t: 'Visit report ready', b: 'Maya spent 52 minutes with Ellie. She called her Clairey six times.', time: '10:12 AM', unread: true, to: 'home' },
      { icon: 'chat', t: 'Ellie asked for you', b: 'Maple Grove staff: “She asked where Claire was.” We said Thursday.', time: '9:30 AM', unread: true, to: 'visit' },
      { icon: 'calendar', t: 'Maya confirmed Thursday', b: "Visit 13 · 2:00 PM. She's practicing the dumpling story.", time: 'Mon', unread: false, to: 'visit' },
      { icon: 'storage', t: 'Memory kit almost full', b: '4.7 of 5 GB used. New memories may not fit.', time: 'Sun', unread: false, to: 'memoriesTab' },
      { icon: 'card', t: 'Payment received', b: 'Visit 12 with Maya · $64.99. Thank you for caring from a distance.', time: 'Oct 8', unread: false, to: 'account' },
    ],
  };
}

// Care homes and hospitals the address field suggests as the family types.
export const ADDRESSES = [
  { name: 'Maple Grove Memory Care', street: '1450 SE Maple Grove Rd, Portland, OR 97214' },
  { name: 'Sunrise Senior Living', street: '88 NW Alder St, Portland, OR 97209' },
  { name: 'Rosewood Assisted Living', street: '2210 N Rose Ave, Portland, OR 97217' },
  { name: 'Lakeview Hospital', street: '600 Lakeview Dr, Portland, OR 97210' },
];

// The person being visited, using what the family entered in step 1 when there is something.
export function patientOf(db) {
  const p = db.patients[db.patient];
  if (db.patient !== 'ellie') return p;
  const called = db.intake.called.trim();
  const inParens = called.match(/\(([^)]+)\)/);
  const name = inParens ? inParens[1] : called.split(' ')[0] || p.name;
  return { ...p, name, letter: name[0].toUpperCase(), place: db.intake.place || p.place, room: db.intake.place ? (db.history ? p.room : '') : p.room };
}
// Who the companion plays, from "Who does she ask for most?".
export const roleOf = db => db.intake.asks && db.intake.asks.startsWith('Her ') ? db.intake.asks.slice(4) : 'daughter';

// First time in the app: everything in onboarding starts empty.
export function initialDB() {
  const demo = demoDB();
  return {
    ...demo,
    history: false,
    intake: { called: '', place: '', address: '', asks: '', dont: {} },
    designated: null,
    subscribed: false,
    liked: [],
    nickname: '',
    memories: [],
    photos: [],
    objects: [],
    storage: { used: 0, limit: 5, plan: 'Free kit' },
    filters: { ...EMPTY_FILTERS },
    visits: [],
    notifications: [{ icon: 'heart', t: 'Welcome to PRESENT', b: "Add a visit from Home whenever you'd rather not go.", time: 'Now', unread: true, to: 'home' }],
  };
}
