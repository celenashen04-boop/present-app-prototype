// PRESENT prototype — Home, Memories, Account, Notifications, sheets and photo screens.
import { NOW, CO, RATES, patientOf, roleOf, sameDay, fmtHour, fmtDate, money } from './data.js';
import { useApp, Screen, Header, Btn, IconBtn, AddBtn, Pill, Tag, Eyebrow, Title, Em, Sub, Avatar, Pic, KV, Meter, Icon, Sheet, companionImg, art } from './ui.jsx';
import { MemoryCard, PhotoGrid } from './onboarding.jsx';

const { useState } = React;

function PatientChip() {
  const { db, openSheet } = useApp();
  const pt = patientOf(db);
  return (
    <button type="button" className="patient-chip" onClick={() => openSheet('switcher')} aria-label={`Visiting for ${pt.name}. Switch person`}>
      <Avatar letter={pt.letter} size={28} color={pt.color} />For {pt.rel === 'Mom' ? 'Mom' : pt.name}<Icon name="down" size={14} sw={2} />
    </button>
  );
}

export function Home() {
  const { db, nav } = useApp();
  const [hideTip, setHideTip] = useState(false);
  const pt = patientOf(db);
  const unread = db.notifications.filter(n => n.unread).length;
  const upcoming = db.visits.filter(v => v.patient === db.patient && v.start > NOW).sort((a, b) => a.start - b.start);
  const sat = new Date(2026, 9, 17);
  const showTip = !hideTip && db.patient === 'ellie' && !upcoming.some(v => sameDay(v.start, sat));
  const mom = pt.rel === 'Mom' ? 'Mom' : pt.name;
  const des = db.designated ? CO[db.designated] : null;
  const bars = [26, 25, 23, 24, 20, 18, 17, 14, 12, 11, 9, 8];
  return (
    <Screen className="home" tab="home"
      header={<div className="header"><div className="header-row">
        <span className="wordmark">PRESENT</span>
        <span className="row gap-8"><PatientChip />
          <span className="bell"><IconBtn name="bell" label={`Notifications, ${unread} unread`} onClick={() => nav('notifications')} />{unread > 0 && <i />}</span></span>
      </div></div>}>
      <div className="stack">
        {db.patient === 'ellie' && db.history ? <>
          <Title>Mom loved your visit today, Claire. <Em>You weren't there.</Em></Title>
          <div className="report">
            <img src={art('visit')} alt="Ellie smiling with Maya during today's visit" />
            <div className="report-body stack-12">
              <div className="row between"><strong>Today's visit · 52 min</strong>
                <button type="button" className="who-chip" onClick={() => nav('profile', { id: 'maya' })}><Pic src={companionImg(CO.maya)} w={24} h={24} r={12} alt="" />Maya<Icon name="chevron" size={12} sw={2.6} /></button></div>
              <p className="report-quote">“She called me Clairey six times and asked when I'd bring the dumplings.”</p>
              <Eyebrow>Last 12 visits</Eyebrow>
              <div className="trends">
                <div className="trend peach"><span className="xs">Distress after visits</span><strong>6 → 2</strong>
                  <span className="bars" aria-hidden="true">{bars.map((b, i) => <i key={i} style={{ height: b }} />)}</span><span className="xxs">Average, first visit vs now</span></div>
                <div className="trend aqua"><span className="xs">Recognized “you”</span><strong>11 of 12</strong>
                  <span className="dots" aria-hidden="true">{bars.map((_, i) => <i key={i} className={i === 3 ? 'miss' : ''} />)}</span><span className="xxs">Visits since August</span></div>
              </div>
              <p className="xs muted">Scored by Maple Grove staff after each visit</p>
            </div>
          </div>
        </> : <>
          <Title>{upcoming.length ? `${mom}'s next visit is booked.` : `Nothing booked for ${mom} yet.`} <Em>{upcoming.length ? "You're free." : "She won't notice."}</Em></Title>
          <Sub>{upcoming.length ? "We'll send a report after each visit, so it feels like you were there." : `Add a visit and we'll send someone ${db.patient === 'ellie' ? 'she' : 'he'}'ll think is you.`}</Sub>
        </>}

        <Btn icon="plus" onClick={() => nav('newVisit')}>Add visit</Btn>

        {upcoming.length > 0 && <div className="stack-10">
          <Eyebrow>Coming up</Eyebrow>
          {upcoming.map((v, i) => (
            <button type="button" key={v.id} className={`next-visit ${i ? 'light' : ''}`} onClick={() => nav('visit', { id: v.id })}>
              <span className="date-tile"><small>{fmtDate(v.start).slice(0, 3).toUpperCase()}</small>{v.start.getDate()}</span>
              <span className="grow"><span className="strong block">{i ? '' : 'Next visit · '}{fmtHour(v.start.getHours())}</span><span className="xs block op">{CO[v.companion].first} as Claire · Visit {v.n}{v.kind === 'last' ? ' · last-minute' : ''}</span></span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>}

        {showTip && (
          <div className="suggest">
            <div className="row gap-12 top"><span className="icon-tile peach"><Icon name="calendar" size={20} /></span>
              <div className="stack-4"><Eyebrow>From your calendar</Eyebrow><p className="strong">Sat, Oct 17 · Leo's soccer tournament</p>
                <p className="small muted">You usually visit {pt.name} on Saturdays. You're busy, so send {des ? des.first : 'someone'} instead?</p></div></div>
            <div className="row gap-8">
              <Btn size="sm" onClick={() => nav('newVisit', { date: sat, start: 14, hrs: 2, who: des ? 'designated' : 'any' })}>Book {des ? des.first : 'someone'} for Saturday</Btn>
              <Btn size="sm" kind="soft" full={false} onClick={() => setHideTip(true)}>Not now</Btn>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}

export function MemoriesTab() {
  const { db, nav, openSheet } = useApp();
  const s = db.storage;
  const des = db.designated ? CO[db.designated] : null;
  const who = des ? des.first : 'your companion';
  const kitPct = Math.min(100, Math.round(((db.nickname ? 1 : 0) + db.memories.length + db.photos.length + db.objects.length) / 12 * 100));
  const diary = [[12, 'THU', 8, 'Asked about the dumplings twice. Calm by the end.'], [11, 'THU', 1, "Didn't recognize “Claire” at first. Then she did."], [10, 'THU', 24, "Sang along to the radio. Held Maya's hand."]];
  return (
    <Screen tab="memoriesTab" header={<div className="header"><div className="header-row"><h1 className="title">Memories</h1><AddBtn onClick={() => openSheet('addMemory')}>Add memory</AddBtn></div></div>}>
      <div className="stack">
        <Sub>Everything {who} knows about being you.</Sub>
        <div className="kit-card stack-10">
          <div className="row between"><strong>Memory kit</strong><strong>{kitPct}%</strong></div>
          <Meter value={kitPct / 100} tone="light" />
          <p className="small op">{kitPct >= 100 ? `Enough for ${who} to stop improvising.` : `Add more so ${who} can stop improvising.`}</p>
          <div className="row between"><span className="row gap-6 xs warn"><Icon name="storage" size={14} sw={2} />{s.limit === Infinity ? `${s.used.toFixed(1)} GB · unlimited` : `${s.used.toFixed(1)} of ${s.limit} GB${s.used / s.limit >= 0.9 ? ' · almost full' : ''}`}</span>
            {s.limit !== Infinity && <button type="button" className="link light" onClick={() => openSheet('storage')}>Get more space</button>}</div>
          <Btn size="sm" kind="white" full={false} onClick={() => nav('kit')}>Open memory kit</Btn>
        </div>
        <div className="stack-10"><div className="row between"><p className="label">Shared Memories · {db.memories.length}</p><AddBtn onClick={() => openSheet('addMemory')} /></div>
          {db.memories.map((m, i) => <MemoryCard key={i} m={m} />)}
          {!db.memories.length && <p className="empty-line">Nothing yet. Add a story only {patientOf(db).name} and her {roleOf(db)} would know.</p>}</div>
        <div className="stack-10"><p className="label">Photos</p><PhotoGrid /></div>
        {db.history && <div className="stack-6"><p className="label">Visit Diary</p>
          {diary.map(([n, dow, d, t]) => (
            <div key={n} className="diary"><span className="date-tile soft"><small>{dow}</small>{d}</span><div><p className="strong">Visit {n} · with Maya</p><p className="small muted">{t}</p></div></div>
          ))}</div>}
      </div>
    </Screen>
  );
}

export function Account() {
  const { db, nav, openSheet } = useApp();
  const des = db.designated ? CO[db.designated] : null;
  const pt = patientOf(db);
  const pts = Object.values(db.patients).map(x => x.id === 'ellie' ? pt : x);
  const visitsThisMonth = (db.history ? 12 : 0) + db.visits.filter(v => !db.history || v.id > 1).length;
  return (
    <Screen tab="account" header={<div className="header"><div className="header-row"><h1 className="title">Account</h1></div></div>}>
      <div className="stack">
        <div className="row gap-14"><Avatar letter="C" size={56} /><div><p className="strong lg">Claire</p><p className="small muted">{pt.name}'s {roleOf(db)}, on paper</p></div></div>
        <div className="choice">
          <span className="avatars">{pts.map(pt => <Avatar key={pt.id} letter={pt.letter} size={36} color={pt.color} ring />)}</span>
          <div className="grow"><p className="strong">Visits for {pts.length} people</p><p className="xs muted">{pts.map(pt => pt.rel === 'Mom' ? `${pt.name} (Mom)` : pt.name).join(' · ')}</p></div>
          <Btn size="sm" kind="soft" full={false} icon="swap" onClick={() => openSheet('switcher')}>Switch</Btn>
        </div>
        <div className="sub-card stack-10">
          <div className="row between baseline"><p className="plan-name light">{db.subscribed && des ? `Always ${des.first}` : 'Pay per visit'}</p><p className="strong">{db.subscribed ? money(RATES.always) + '/mo' : 'No subscription'}</p></div>
          <p className="small op">{db.subscribed && des ? `For ${pt.name} · Renews Nov 13 · ${des.name} as Claire` : 'Each visit is priced when you book it.'}</p>
          <Btn size="sm" kind="white" full={false} onClick={() => nav('plans')}>Change plan</Btn>
        </div>
        <button type="button" className="choice" onClick={() => nav('companions', { mode: 'pick' })}>
          {des ? <Pic src={companionImg(des)} w={44} h={44} r={12} alt="" /> : <span className="choice-empty sm"><Icon name="user" size={20} /></span>}
          <span className="grow left"><span className="xs muted block">Designated companion</span><span className="strong block">{des ? `${des.name} · ${des.likeness}% likeness` : 'Choose someone'}</span></span>
          <Icon name="chevron" size={16} />
        </button>
        <div className="stats">
          <div className="stat aqua"><span className="xs">Visits this month</span><strong>{visitsThisMonth}</strong></div>
          <div className="stat peach"><span className="xs">Visits by you</span><strong>0</strong></div>
          <div className="stat mist"><span className="xs">Weekends saved</span><strong>{db.history ? 4 : 0}</strong></div>
        </div>
        <div className="list">
          <button type="button" onClick={() => nav('kit')}><Icon name="doc" size={20} /><span className="grow">Memory kit</span><span className="xs muted">{db.storage.used.toFixed(1)} GB</span><Icon name="chevron" size={16} /></button>
          <button type="button" onClick={() => nav('intake', { edit: true })}><Icon name="ban" size={20} /><span className="grow">Do-not list</span><Icon name="chevron" size={16} /></button>
          <button type="button" onClick={() => nav('notifications')}><Icon name="bell" size={20} /><span className="grow">Notifications</span><Icon name="chevron" size={16} /></button>
          <button type="button" onClick={() => nav('plans')}><Icon name="card" size={20} /><span className="grow">Plan &amp; payment</span><span className="xs muted">Card on file</span><Icon name="chevron" size={16} /></button>
        </div>
      </div>
    </Screen>
  );
}

export function Notifications() {
  const { db, set, nav, tab } = useApp();
  const go = n => {
    set(d => ({ notifications: d.notifications.map(x => x === n ? { ...x, unread: false } : x) }));
    if (n.to === 'visit') nav('visit');
    else tab(n.to);
  };
  return (
    <Screen header={<Header title="" right={<button type="button" className="link" onClick={() => set(d => ({ notifications: d.notifications.map(x => ({ ...x, unread: false })) }))}>Mark all read</button>} />}>
      <div className="stack">
        <Title>Notifications</Title>
        {db.notifications.map((n, i) => (
          <button type="button" key={i} className={`notif ${n.unread ? 'unread' : ''}`} onClick={() => go(n)}>
            <span className="icon-tile"><Icon name={n.icon} size={20} /></span>
            <span className="grow"><span className="row between"><span className="strong">{n.t}</span><span className="xs muted">{n.time}</span></span><span className="small muted block">{n.b}</span></span>
          </button>
        ))}
      </div>
    </Screen>
  );
}

// ---------- sheets ----------
export function SwitcherSheet() {
  const { db, set, closeSheet, nav } = useApp();
  return (
    <Sheet title="Who are you booking for?" sub="Manage visits for everyone you can't get to.">
      <div className="stack-10">
        {Object.values(db.patients).map(x => x.id === 'ellie' ? patientOf(db) : x).map(pt => (
          <button type="button" key={pt.id} className={`option ${db.patient === pt.id ? 'on' : ''}`} aria-pressed={db.patient === pt.id} onClick={() => { set({ patient: pt.id }); closeSheet(); }}>
            <Avatar letter={pt.letter} size={44} color={pt.color} />
            <span className="grow"><span className="strong block">{pt.name}{pt.rel === 'Mom' ? ' · Mom' : ''}</span><span className="xs muted block">{pt.place} · {pt.id === 'ellie' && db.subscribed && db.designated ? 'Always ' + CO[db.designated].first : 'Pay per visit'}</span></span>
            {db.patient === pt.id && <span className="check-dot"><Icon name="check" size={14} sw={3} /></span>}
          </button>
        ))}
        <button type="button" className="option dashed" onClick={() => { closeSheet(); nav('intake', { onboarding: true }); }}>
          <span className="plus-circle"><Icon name="plus" size={20} sw={2.2} /></span>
          <span className="grow"><span className="strong block">Add someone</span><span className="xs muted block">Set up visits for another relative.</span></span>
        </button>
      </div>
    </Sheet>
  );
}

export function AddMemorySheet() {
  const { db, set, closeSheet, openSheet, toast } = useApp();
  const [t, setT] = useState('');
  const [b, setB] = useState('');
  const [when, setWhen] = useState('');
  const nm = db.designated ? CO[db.designated].first : 'your companion';
  const Nm = nm.charAt(0).toUpperCase() + nm.slice(1);
  const full = db.storage.used + 0.1 > db.storage.limit;
  const add = () => {
    set(d => ({ memories: [...d.memories, { t, b }], storage: { ...d.storage, used: Math.min(d.storage.limit, +(d.storage.used + 0.1).toFixed(1)) } }));
    closeSheet(); toast(`Added. ${Nm} will rehearse it before the next visit.`);
  };
  return (
    <Sheet title="Add a memory" sub={`${Nm} will rehearse it before the next visit.`}>
      <label className="field"><span>What happened?</span><input id="mem-title" placeholder="e.g. Mahjong on Sunday afternoons" value={t} onChange={e => setT(e.target.value)} /></label>
      <label className="field"><span>What should {nm} say about it?</span><textarea id="mem-body" rows="3" placeholder={`e.g. She always let her ${roleOf(db)} win. Say they finally beat her fair and square.`} value={b} onChange={e => setB(e.target.value)} /></label>
      <div className="stack-10"><p className="label">When Was This?</p><div className="wrap">{['Childhood', 'Teens', 'Adult', 'Recent', 'Other'].map(w => <Pill key={w} on={when === w} onClick={() => setWhen(when === w ? '' : w)}>{w}</Pill>)}</div></div>
      {full
        ? <div className="note amber"><Icon name="storage" size={18} /><div className="grow stack-8"><p>Your memory kit is full. This one won't fit.</p><Btn size="sm" kind="amber" full={false} icon="plus" onClick={() => openSheet('storage')}>Get more space</Btn></div></div>
        : <Btn onClick={add} disabled={!t.trim()}>Add to memory kit</Btn>}
    </Sheet>
  );
}

export function AddPrepSheet({ p }) {
  const { db, set, closeSheet, toast } = useApp();
  const [t, setT] = useState('Bring her the blue cardigan');
  const [type, setType] = useState('Bring');
  const v = db.visits.find(x => x.id === p.id);
  const c = CO[v.companion];
  return (
    <Sheet title={`Add to ${c.first}'s prep`} sub={`${c.first} will get it done before ${fmtDate(v.start).slice(0, 3)}.`}>
      <label className="field"><span>What should {c.first} do?</span><input id="prep" value={t} onChange={e => setT(e.target.value)} /></label>
      <div className="stack-10"><p className="label">Type</p><div className="wrap">{['Bring', 'Say', 'Wear', 'Do', 'Other'].map(w => <Pill key={w} on={type === w} onClick={() => setType(w)}>{w}</Pill>)}</div></div>
      <Btn disabled={!t.trim()} onClick={() => { set(d => ({ visits: d.visits.map(x => x.id === v.id ? { ...x, prep: [...x.prep, { t, done: false }] } : x) })); closeSheet(); toast('Added to the prep list.'); }}>Add to prep</Btn>
    </Sheet>
  );
}

export function AddPhotoSheet() {
  const { db, closeSheet, nav } = useApp();
  const nm = db.designated ? CO[db.designated].first : 'your companion';
  const go = r => { closeSheet(); nav(r); };
  const opt = (icon, title, sub, r, badge) => (
    <button type="button" className="option" onClick={() => go(r)}>
      <span className="icon-tile"><Icon name={icon} size={20} /></span>
      <span className="grow"><span className="strong">{title}</span>{badge && <Tag tone="amber">{badge}</Tag>}<span className="xs muted block">{sub}</span></span>
      <Icon name="chevron" size={18} />
    </button>
  );
  return (
    <Sheet title="Add photos" sub={`Faces are matched to ${nm} automatically, so they're in them instead of you.`}>
      <div className="stack-10">
        {opt('image', 'Choose from library', 'Old family photos work best', 'library')}
        {opt('camera', 'Take a photo', 'Snap a print straight from the album', 'camera')}
        {opt('sparkle', 'Generate with PRESENT AI', "New photos of moments that didn't happen", 'generate', 'Add-on')}
      </div>
      <Btn kind="ghost" onClick={closeSheet}>Cancel</Btn>
    </Sheet>
  );
}

export function StorageSheet() {
  const { db, set, closeSheet, toast } = useApp();
  const [plan, setPlan] = useState('unlimited');
  const s = db.storage;
  const plans = [['plus', 'Kit Plus', '50 GB · a few more years of her', '$4.99', 50], ['unlimited', 'Kit Unlimited', 'Every memory, kept forever', '$14.99', Infinity]];
  return (
    <Sheet title="Your memory kit is almost full" sub="Your companion can only be as good as what you give them.">
      <div className="stack-8">
        <div className="row between"><span className="label">{s.plan}</span><span className="label amber">{s.used.toFixed(1)} of {s.limit === Infinity ? '∞' : s.limit} GB used</span></div>
        <Meter value={s.limit === Infinity ? 0.1 : s.used / s.limit} />
        <p className="xs muted">Photos, voice notes and videos fill it fastest.</p>
      </div>
      <div className="stack-8">
        {plans.map(([id, name, sub, price, limit]) => (
          <button type="button" key={id} className={`option ${plan === id ? 'on' : ''}`} aria-pressed={plan === id} onClick={() => setPlan(id)}>
            <span className="grow"><span className="strong block">{name}</span><span className="xs muted block">{sub}</span></span>
            <span className="strong">{price}<span className="unit">/mo</span></span>
          </button>
        ))}
      </div>
      <Btn onClick={() => { const pl = plans.find(x => x[0] === plan); set(d => ({ storage: { ...d.storage, limit: pl[4], plan: pl[1] } })); closeSheet(); toast(`${pl[1]} added. Keep the memories coming.`); }}>Upgrade storage</Btn>
      <p className="fine">Billed with your plan. Cancel and your companion forgets what didn't fit.</p>
    </Sheet>
  );
}

// ---------- photo screens ----------
function addPhotos(set, keys) {
  set(d => {
    const room = d.storage.limit - d.storage.used;
    const fit = keys.slice(0, Math.max(0, Math.floor(room / 0.1 + 1e-9)));
    return { photos: [...d.photos, ...fit], storage: { ...d.storage, used: +(d.storage.used + fit.length * 0.1).toFixed(1) } };
  });
}

export function Library() {
  const { db, set, back, toast, openSheet } = useApp();
  const keys = ['dumplings', 'wedding', 'tea', 'visit', 'welcome', 'helen'];
  const [sel, setSel] = useState([]);
  const room = Math.floor((db.storage.limit - db.storage.used) / 0.1 + 1e-9);
  const tooMany = sel.length > room;
  return (
    <Screen header={<Header title="Choose photos" right={<span className="label teal">{sel.length} selected</span>} />}
      footer={tooMany
        ? <Btn kind="amber" icon="plus" onClick={() => openSheet('storage')}>Get more space to add {sel.length}</Btn>
        : <Btn disabled={!sel.length} onClick={() => { addPhotos(set, sel); toast(`${sel.length} ${sel.length === 1 ? 'photo' : 'photos'} added to the kit.`); back(); }}>Add {sel.length} {sel.length === 1 ? 'photo' : 'photos'} to the kit</Btn>}>
      <div className="stack">
        <div className="stack-6"><Title>Old family <Em>photos.</Em></Title><Sub>Pick the ones your companion should appear in.</Sub></div>
        <div className="lib-grid">
          {keys.map(k => {
            const on = sel.includes(k);
            return <button type="button" key={k} className={`lib-tile ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => setSel(on ? sel.filter(x => x !== k) : [...sel, k])}>
              <img src={art(k)} alt="Family photo" />{on && <span className="check-dot"><Icon name="check" size={14} sw={3} /></span>}
            </button>;
          })}
        </div>
        {tooMany && <p className="small amber-text">Only {room} more {room === 1 ? 'photo fits' : 'photos fit'} in your kit.</p>}
        <div className="note peach"><Icon name="swap" size={20} /><p>We swap your face for your companion's before the visit. The originals stay yours.</p></div>
      </div>
    </Screen>
  );
}

export function Camera() {
  const { set, back, toast } = useApp();
  return (
    <Screen className="camera" header={<Header title="Take a photo" />}>
      <div className="camera-body">
        <p className="small center">Line up the print inside the frame.</p>
        <div className="viewfinder"><img src={art('wedding')} alt="A wedding photo print in the viewfinder" /></div>
        <p className="xs center">We'll find her face, and yours, automatically.</p>
        <button type="button" className="shutter" aria-label="Take photo" onClick={() => { addPhotos(set, ['wedding']); toast('Photo added to the kit.'); back(); }}><span /></button>
      </div>
    </Screen>
  );
}

export function Generate() {
  const { set, back, toast } = useApp();
  const [txt, setTxt] = useState('');
  const [style, setStyle] = useState('Film photo');
  const [made, setMade] = useState(false);
  return (
    <Screen header={<Header title="PRESENT AI · Add-on" />}
      footer={made
        ? <Btn onClick={() => { addPhotos(set, ['visit']); toast('Generated photo added. $4.99 billed with your plan.'); back(); }}>Add to kit · $4.99</Btn>
        : <Btn icon="sparkle" disabled={!txt.trim()} onClick={() => setMade(true)}>Generate preview</Btn>}>
      <div className="stack">
        <Title>Make a memory <Em>that never happened.</Em></Title>
        <label className="field"><span>Describe the moment</span><textarea id="gen" rows="3" placeholder="e.g. Mom and me at the beach in 1998. I'm in the yellow raincoat she bought me." value={txt} onChange={e => { setTxt(e.target.value); setMade(false); }} /></label>
        <div className="stack-10"><p className="label">Style</p><div className="wrap">{['Film photo', 'Polaroid', 'Home video still'].map(s => <Pill key={s} on={style === s} onClick={() => { setStyle(s); setMade(false); }}>{s}</Pill>)}</div></div>
        {made && <div className="stack-10"><p className="label">Preview</p><div className="gen-grid"><img src={art('visit')} alt="Generated preview" /><img src={art('welcome')} alt="Generated preview, second option" /></div></div>}
        <div className="note peach"><Icon name="sparkle" size={18} /><p>$4.99 per photo. Faces are matched to your companion.</p></div>
      </div>
    </Screen>
  );
}
