// PRESENT prototype — onboarding (welcome + 3 steps), companions, filters and pricing.
import { CO, COMPANIONS, FILTER_GROUPS, EMPTY_FILTERS, DONT, RATES, ADDRESSES, applyFilters, activeFilterChips, money, patientOf, roleOf } from './data.js';
import { useApp, Screen, Header, Btn, IconBtn, AddBtn, Pill, Tag, Likeness, Eyebrow, Title, Em, Sub, Avatar, Pic, Switch, KV, Meter, Icon, IdCard, companionImg, art } from './ui.jsx';

const { useState } = React;

export function Welcome() {
  const { nav } = useApp();
  return (
    <Screen className="welcome" bodyStyle={{ padding: 0 }} footer={<>
      <Btn onClick={() => nav('intake', { onboarding: true })}>Outsource my guilt</Btn>
    </>}>
      <div className="welcome-hero"><img src={art('welcome')} alt="An older woman laughing beside a younger companion" /></div>
      <div className="welcome-copy">
        <h1>She won't remember you visited.</h1>
        <p className="so-why">So Why Visit?</p>
        <p className="lede">We send someone who looks enough like you, says what you'd say, and brings her favorite cardigan. She feels loved. You feel nothing. Everyone wins.</p>
      </div>
    </Screen>
  );
}

// Address field that suggests care homes as you type, or keeps exactly what you typed.
function AddressInput({ it, upd }) {
  const [q, setQ] = useState(it.address || '');
  const [open, setOpen] = useState(false);
  const term = q.trim().toLowerCase();
  const matches = term.length >= 2 ? ADDRESSES.filter(a => (a.name + ' ' + a.street).toLowerCase().includes(term)) : [];
  const pick = a => { upd({ place: a.name, address: a.street }); setQ(a.street); setOpen(false); };
  return (
    <div className="field">
      <label htmlFor="address">Where does she live now?</label>
      <div className="addr"><Icon name="pin" size={18} />
        <input id="address" autoComplete="off" role="combobox" aria-expanded={open && term.length >= 2} aria-controls="address-list"
          placeholder="Start typing an address or care home" value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); upd({ place: '', address: '' }); }} />
      </div>
      {open && term.length >= 2 && (
        <ul className="addr-list" id="address-list" role="listbox">
          {matches.map(a => <li key={a.name}><button type="button" role="option" aria-selected="false" onClick={() => pick(a)}><strong>{a.name}</strong><span>{a.street}</span></button></li>)}
          <li><button type="button" role="option" aria-selected="false" onClick={() => pick({ name: q.trim(), street: q.trim() })}><strong>Use “{q.trim()}”</strong><span>Exactly as typed</span></button></li>
        </ul>
      )}
      {it.place && !open && <p className="addr-picked"><Icon name="check" size={14} sw={2.6} />{it.place === it.address ? 'Address saved' : it.place}</p>}
    </div>
  );
}

// Step 1. Everything starts empty.
export function Intake({ p }) {
  const { db, set, nav, back, toast } = useApp();
  const it = db.intake;
  const edit = p.edit;
  const upd = patch => set(d => ({ intake: { ...d.intake, ...patch } }));
  const asks = ['Her daughter', 'Her son', 'Her granddaughter', 'Her grandson', 'Her husband', 'Her friend', 'Her sibling', 'Other'];
  const ready = it.called.trim() && it.place;
  return (
    <Screen header={edit ? <Header title="About her" /> : <Header step={1} />}
      footer={edit
        ? <Btn onClick={() => { toast('Saved.'); back(); }}>Save</Btn>
        : <>{!ready && <p className="fine">Add what she's called and where she lives to continue.</p>}<Btn disabled={!ready} onClick={() => nav('kit', { onboarding: true })}>Continue</Btn></>}>
      <div className="stack">
        <div className="stack-8"><Title size={31}>Tell us about her. Briefly.</Title><Sub>Just the highlights. You won't need to remember the rest, and neither will she.</Sub></div>
        <label className="field"><span>What does she like to be called?</span><input id="called" placeholder="e.g. Eleanor (Ellie)" value={it.called} onChange={e => upd({ called: e.target.value })} /></label>
        <AddressInput it={it} upd={upd} />
        <fieldset className="field">
          <legend>Who should we visit in place of?</legend>
          <div className="chip-grid">{asks.map(a => <button type="button" key={a} className={`chip ${it.asks === a ? 'on' : ''}`} aria-pressed={it.asks === a} onClick={() => upd({ asks: it.asks === a ? '' : a })}>{a}</button>)}</div>
        </fieldset>
        <div className="note peach"><Icon name="heart" size={20} /><p>Usually whoever she asks for most. We'll send a better-rested version of them.</p></div>
      </div>
    </Screen>
  );
}

// The do-not list, chosen in the memory kit and shown again in each visit's prep.
export function DontPanel() {
  const { db, set } = useApp();
  const toggle = k => set(d => ({ intake: { ...d.intake, dont: { ...d.intake.dont, [k]: !d.intake.dont[k] } } }));
  return (
    <div className="panel">
      <div className="row gap-10"><Icon name="ban" size={20} color="#A35A0C" /><strong>What should the companion avoid?</strong></div>
      <p className="small muted">Tap to add. Your companion reads this before every visit.</p>
      {DONT.map(([title, items]) => (
        <div key={title} className="stack-8">
          <Eyebrow>{title}</Eyebrow>
          <div className="wrap">{items.map(k => <Pill key={k} on={db.intake.dont[k]} onClick={() => toggle(k)}>{k}</Pill>)}</div>
        </div>
      ))}
    </div>
  );
}

export function Companions({ p }) {
  const { db, set, nav } = useApp();
  const mode = p.mode || 'tab';
  const list = applyFilters(COMPANIONS, db.filters, db.liked).sort((a, b) => b.likeness - a.likeness);
  const chips = activeFilterChips(db.filters);
  const removeChip = ch => set(d => {
    const f = { ...d.filters };
    if (ch.key === 'lastMinute' || ch.key === 'liked') f[ch.key] = false;
    else if (ch.key === 'minLikeness') f.minLikeness = 0;
    else f[ch.key] = f[ch.key].filter(v => v !== ch.value);
    return { filters: f };
  });
  const filterBtn = <button type="button" className="filter-btn" onClick={() => nav('filters')}><Icon name="filter" size={18} />Filters{chips.length ? ` · ${chips.length}` : ''}</button>;
  const header = mode === 'tab'
    ? <div className="header"><div className="header-row"><h1 className="title">Companions</h1>{filterBtn}</div></div>
    : mode === 'onboard' ? <Header step={2} right={filterBtn} /> : <Header title="Designated companion" right={filterBtn} />;
  return (
    <Screen header={header} tab={mode === 'tab' ? 'companions' : null}>
      <div className="stack">
        {mode === 'onboard' && <div className="stack-6"><Title>You, but <Em>available.</Em></Title><Sub>Ranked by how convincingly they can be you.</Sub></div>}
        {mode === 'pick' && <Sub>Your designated companion goes to every regular visit and is the one Always Maya covers.</Sub>}
        {mode === 'tab' && <Sub>Everyone who can be you, ranked by likeness to Claire.</Sub>}
        {chips.length > 0 && (
          <div className="wrap">
            {chips.map(ch => <button type="button" key={ch.label} className="pill on removable" onClick={() => removeChip(ch)} aria-label={`Remove filter ${ch.label}`}>{ch.label}<Icon name="close" size={12} sw={2.6} /></button>)}
            <button type="button" className="link" onClick={() => set({ filters: { ...EMPTY_FILTERS } })}>Clear all</button>
          </div>
        )}
        <div className="row between">
          <p className="small muted">{list.length} {list.length === 1 ? 'companion' : 'companions'}</p>
          <div className="seg mini" role="group" aria-label="Show">
            <button type="button" className={!db.filters.liked ? 'on' : ''} aria-pressed={!db.filters.liked} onClick={() => set(d => ({ filters: { ...d.filters, liked: false } }))}>All</button>
            <button type="button" className={db.filters.liked ? 'on' : ''} aria-pressed={db.filters.liked} onClick={() => set(d => ({ filters: { ...d.filters, liked: true } }))}><Icon name="heart" size={14} fill={db.filters.liked ? 'currentColor' : 'none'} />Liked · {db.liked.length}</button>
          </div>
        </div>
        {list.map(c => <IdCard key={c.id} c={c} onClick={() => nav('profile', { id: c.id, mode })} />)}
        {!list.length && (
          <div className="empty"><Icon name={db.filters.liked && !db.liked.length ? 'heart' : 'search'} size={28} color="#5A6B78" /><p>{db.filters.liked && !db.liked.length ? 'You haven\'t liked anyone yet. Tap the heart on a profile to save them here.' : 'No one matches all of these filters.'}</p><Btn kind="soft" size="sm" full={false} onClick={() => set({ filters: { ...EMPTY_FILTERS } })}>Clear filters</Btn></div>
        )}
      </div>
    </Screen>
  );
}

export function Filters() {
  const { db, set, back } = useApp();
  const f = db.filters;
  const toggle = (key, v) => set(d => ({ filters: { ...d.filters, [key]: d.filters[key].includes(v) ? d.filters[key].filter(x => x !== v) : [...d.filters[key], v] } }));
  const count = applyFilters(COMPANIONS, f, db.liked).length;
  return (
    <Screen header={<Header onBack={back} title="Filters" right={<button type="button" className="link" onClick={() => set({ filters: { ...EMPTY_FILTERS } })}>Reset</button>} />}
      footer={<Btn onClick={back} disabled={!count}>{count ? `Show ${count} ${count === 1 ? 'companion' : 'companions'}` : 'No matches'}</Btn>}>
      <div className="stack">
        <Sub>The closer the match, the less she'll notice.</Sub>
        {FILTER_GROUPS.map(g => (
          <div key={g.key} className="stack-10">
            <p className="label">{g.label}</p>
            <div className="wrap">{g.opts.map(o => <Pill key={o} on={f[g.key].includes(o)} onClick={() => toggle(g.key, o)}>{g.key === 'age' ? 'Age ' + o : o}</Pill>)}</div>
          </div>
        ))}
        <div className="stack-10">
          <div className="row between"><label className="label" htmlFor="likeness">Minimum Likeness</label><span className="label teal">{f.minLikeness}%+</span></div>
          <input id="likeness" type="range" min="0" max="95" step="5" value={f.minLikeness} onChange={e => set(d => ({ filters: { ...d.filters, minLikeness: +e.target.value } }))} />
        </div>
        <div className="row between"><span className="label row gap-6"><Icon name="heart" size={16} />Only Companions You've Liked</span><Switch label="Only companions you've liked" on={f.liked} onChange={v => set(d => ({ filters: { ...d.filters, liked: v } }))} /></div>
        <div className="row between"><span className="label">Takes Last-Minute Bookings</span><Switch label="Takes last-minute bookings" on={f.lastMinute} onChange={v => set(d => ({ filters: { ...d.filters, lastMinute: v } }))} /></div>
      </div>
    </Screen>
  );
}

export function Profile({ p }) {
  const { db, set, nav, back, toast } = useApp();
  const c = CO[p.id];
  const mode = p.mode || 'tab';
  const saved = db.liked.includes(c.id);
  const toggleLike = () => { set(d => ({ liked: saved ? d.liked.filter(x => x !== c.id) : [...d.liked, c.id] })); toast(saved ? `Removed ${c.first} from Liked.` : `${c.first} saved to Liked.`); };
  const isDes = db.designated === c.id;
  const makeDes = () => { set({ designated: c.id }); toast(`${c.first} is now your designated companion.`); };
  let footer;
  if (mode === 'onboard') footer = <><Btn onClick={() => { set({ designated: c.id }); nav('kit', { onboarding: true }); }}>Cast {c.first} as Claire</Btn><p className="fine">Next: hand over your memories. You'll pick a plan after.</p></>;
  else if (mode === 'pick') footer = <Btn onClick={() => { makeDes(); back(2); }}>Make {c.first} your designated companion</Btn>;
  else footer = isDes
    ? <><Btn onClick={() => nav('newVisit', { who: 'designated' })} icon="plus">Book a visit with {c.first}</Btn><p className="fine">{c.first} is your designated companion.</p></>
    : <><Btn onClick={makeDes}>Make {c.first} your designated companion</Btn><p className="fine">Or book any visit and we'll match whoever is closest.</p></>;
  return (
    <Screen className="profile" bodyStyle={{ padding: 0 }} footer={footer}>
      <div className="profile-hero">
        <img src={companionImg(c)} alt={c.name} />
        <IconBtn name="back" label="Back" onClick={() => back()} style={{ position: 'absolute', left: 24, top: 56 }} />
        <button type="button" className={`icon-btn ${saved ? 'saved' : ''}`} aria-pressed={saved} aria-label={saved ? 'Unlike companion' : 'Like companion'} onClick={toggleLike} style={{ position: 'absolute', right: 24, top: 56 }}>
          <Icon name="heart" size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="profile-sheet stack">
        <div className="stack-4">
          <div className="row between baseline"><h1 className="display">{c.name}</h1><Likeness pct={c.likeness} /></div>
          <p className="small muted">Age {c.age} · {c.background} · {c.langs.join(', ')}</p>
        </div>
        <div className="persona"><Avatar letter="C" /><div><p className="xs muted">Will visit {patientOf(db).name} as</p><p className="strong">Claire, her {roleOf(db)}</p></div></div>
        <div className="stack-6"><Eyebrow>In {c.first}'s words</Eyebrow><p className="quote">{c.quote}</p></div>
        <div className="stack-10">
          <Eyebrow>Takes bookings</Eyebrow>
          <div className="row gap-8">
            <span className="booktag yes"><Icon name="check" size={14} sw={2.4} />Regular</span>
            <span className={`booktag ${c.lastMinute ? 'yes' : 'no'}`}><Icon name={c.lastMinute ? 'check' : 'close'} size={14} sw={2.4} />Last-minute</span>
          </div>
          <p className="small muted">{c.bookNote} Has been somebody's daughter {c.played} times.</p>
        </div>
      </div>
    </Screen>
  );
}

export function StorageMeter() {
  const { db, openSheet } = useApp();
  const s = db.storage;
  const unlimited = s.limit === Infinity;
  const full = !unlimited && s.used / s.limit >= 0.9;
  return (
    <div className={`storage ${full ? 'full' : ''}`}>
      <div className="row between"><span className="row gap-8"><Icon name="storage" size={16} sw={2} /><strong className="small">Kit storage · {s.plan}</strong></span>
        <span className="xs strong">{unlimited ? `${s.used.toFixed(1)} GB · unlimited` : `${s.used.toFixed(1)} of ${s.limit} GB`}</span></div>
      {!unlimited && <Meter value={s.used / s.limit} tone={full ? 'amber' : 'teal'} />}
      {full && <div className="row between gap-10"><p className="xs">Almost full. New memories won't fit.</p><Btn kind="amber" size="sm" full={false} icon="plus" onClick={() => openSheet('storage')}>Get more space</Btn></div>}
    </div>
  );
}

export function PhotoGrid() {
  const { db, openSheet } = useApp();
  return (
    <div className="photo-grid">
      {db.photos.map((k, i) => <Pic key={k + i} src={art(k)} w="100%" h="auto" r={12} alt="Family photo" style={{ aspectRatio: '1' }} />)}
      <button type="button" className="add-tile" onClick={() => openSheet('addPhoto')}><Icon name="plus" size={22} sw={2} />Add</button>
    </div>
  );
}

export const MemoryCard = ({ m }) => <div className="memory"><strong>{m.t}</strong><p>{m.b}</p></div>;

// Step 2.
export function Kit({ p }) {
  const { db, set, nav, openSheet } = useApp();
  // Everything here is about the person the companion will play (picked in step 1), not the user.
  const pt = patientOf(db), role = roleOf(db);
  const [obj, setObj] = useState('');
  const addObj = e => { e.preventDefault(); const t = obj.trim(); if (!t) return; set(d => ({ objects: [...d.objects, t] })); setObj(''); };
  return (
    <Screen header={p.onboarding ? <Header step={2} /> : <Header title="Memory kit" />}
      footer={p.onboarding ? <Btn onClick={() => nav('plans', { onboarding: true })}>Continue</Btn> : null}>
      <div className="stack">
        <div className="stack-6"><Title>Hand over <Em>shared memories.</Em></Title><Sub>Tell us about {pt.name} and her {role}, so the companion can be them.</Sub></div>
        <label className="field"><span>What does {pt.name} call her {role}?</span><input id="nickname" placeholder="e.g. Clairey" value={db.nickname} onChange={e => set({ nickname: e.target.value })} /></label>
        <div className="stack-10">
          <div className="row between"><p className="label">Shared Memories</p><AddBtn onClick={() => openSheet('addMemory')} /></div>
          {db.memories.map((m, i) => <MemoryCard key={i} m={m} />)}
          {!db.memories.length && <p className="empty-line">Nothing yet. Add a story only {pt.name} and her {role} would know.</p>}
        </div>
        <div className="stack-10"><p className="label">Photos</p><PhotoGrid /></div>
        <div className="stack-10">
          <p className="label">Objects &amp; Scents</p>
          {db.objects.length > 0 && <div className="wrap">{db.objects.map((o, i) => <Tag key={o + i}>{o}</Tag>)}</div>}
          <form className="row gap-8" onSubmit={addObj}>
            <input className="mini-input" id="object" aria-label="Object or scent" placeholder={`e.g. Jasmine tea, her ${role}'s perfume`} value={obj} onChange={e => setObj(e.target.value)} />
            <button type="submit" className="add-btn" disabled={!obj.trim()}><Icon name="plus" size={14} sw={2.6} />Add</button>
          </form>
        </div>
        <DontPanel />
        <StorageMeter />
      </div>
    </Screen>
  );
}

// 06: the pricing list is a description. Only the designated companion and the subscription can be changed here.
export function Plans({ p }) {
  const { db, set, nav, back, reset, toast } = useApp();
  const des = db.designated ? CO[db.designated] : null;
  const first = des ? des.first : 'Maya';
  const [want, setWant] = useState(false);
  const subOn = p.onboarding ? want : db.subscribed;
  const toggleSub = v => {
    if (p.onboarding) return setWant(v);
    if (v) nav('subscribe');
    else { set({ subscribed: false }); toast("Subscription canceled. She won't notice."); }
  };
  const tiers = [
    ['PRESENT AI', 'Free', "AI texts her back in your voice. Voice notes, photos and videos are paid add-ons."],
    ['Any available companion', money(RATES.single) + '/hr', 'We match the closest face on the day.'],
    ['Designated companion', money(RATES.reserved) + '/hr', `${first}, every visit you book.`],
    ['Last-minute visit', money(RATES.last) + '/hr', "Under 24 hours' notice. Holidays and her birthday always count."],
    [`Always ${first}`, money(RATES.always) + '/mo', 'Unlimited visits with your designated companion, last-minute included.'],
  ];
  return (
    <Screen header={p.onboarding ? <Header step={3} /> : <Header title="Your plan" />}
      footer={p.onboarding
        ? (subOn
          ? <><Btn onClick={() => nav('subscribe', { onboarding: true })}>Subscribe and feel better</Btn><p className="fine">Cancel anytime. She won't notice.</p></>
          : <><Btn onClick={() => { reset('home'); toast("You're all set. Tap Add visit whenever you'd rather not go."); }}>Continue and pay per visit</Btn><p className="fine">You can subscribe any time from Account.</p></>)
        : <Btn kind="soft" onClick={back}>Done</Btn>}>
      <div className="stack">
        <div className="stack-6"><Title size={31}>Never visit <Em>again.</Em></Title><Sub>Pick who goes and whether you subscribe. Everything else is priced per visit.</Sub></div>

        <div className="stack-10">
          <Eyebrow>Your designated companion</Eyebrow>
          <div className="choice">
            {des ? <Pic src={companionImg(des)} w={56} h={56} r={14} alt={des.name} /> : <span className="choice-empty"><Icon name="user" size={24} /></span>}
            <div className="grow">
              <p className="strong">{des ? `${des.name} as Claire` : 'No one yet'}</p>
              <p className="xs muted">{des ? `${des.likeness}% likeness · goes to your regular visits` : 'Choose who goes to regular visits'}</p>
            </div>
            <Btn kind="soft" size="sm" full={false} onClick={() => nav('companions', { mode: 'pick' })}>{des ? 'Change' : 'Choose'}</Btn>
          </div>
        </div>

        <div className="stack-10">
          <Eyebrow>Subscription</Eyebrow>
          <div className={`choice sub ${subOn ? 'on' : ''}`}>
            <div className="grow stack-6">
              <div className="row between baseline"><p className="plan-name">Always {first}</p><p className="strong teal">{money(RATES.always)}<span className="unit">/mo</span></p></div>
              <ul className="ticks"><li>Same person, unlimited hours</li><li>Never pay last-minute rates</li><li>Visit reports after every visit</li></ul>
              <div className="row between"><span className="small strong">{subOn ? (p.onboarding ? 'Subscribe' : 'Subscribed') : 'Not subscribed'}</span><Switch label={`Subscribe to Always ${first}`} on={subOn} onChange={toggleSub} /></div>
            </div>
          </div>
        </div>

        <div className="stack-10">
          <Eyebrow>How pricing works</Eyebrow>
          <dl className="price-list">
            {tiers.map(([name, price, desc]) => (
              <div key={name} className="price-row">
                <dt>{name}{name.startsWith('Always') && db.subscribed ? <Tag>Your plan</Tag> : null}{name.startsWith('Last') ? <Tag tone="amber">Under 24 hrs</Tag> : null}</dt>
                <dd className="price">{price}</dd>
                <dd className="desc">{desc}</dd>
              </div>
            ))}
          </dl>
          <p className="xs muted">Book visits from Home with Add visit. We'll tell you which price applies before you pay.</p>
        </div>
        <p className="xs muted">If {first} is no longer available, we'll gently introduce a new companion with {patientOf(db).name}'s full memory kit. Most residents adjust within a few visits.</p>
      </div>
    </Screen>
  );
}

export function Subscribe({ p }) {
  const { db, set, nav, back, reset, toast } = useApp();
  const des = db.designated ? CO[db.designated] : null;
  const pt = patientOf(db);
  if (!des) return (
    <Screen header={<Header title="Review & pay" />} footer={<Btn onClick={() => nav('companions', { mode: 'pick' })}>Choose a designated companion</Btn>}>
      <div className="stack"><Title>Pick who goes first.</Title><Sub>Always covers one designated companion. Choose them, then come back.</Sub></div>
    </Screen>
  );
  // No visit time exists yet, so subscribing returns to where you came from instead of a confirmation.
  const pay = () => {
    set({ subscribed: true });
    if (p.fromQuote) { toast('Subscribed. This visit is now included.'); back(); }
    else if (p.onboarding) { reset('home'); toast(`Subscribed to Always ${des.first}. Tap Add visit to book the first one.`); }
    else { toast(`Subscribed to Always ${des.first}.`); back(); }
  };
  return (
    <Screen header={<Header title="Review & pay" />}
      footer={<><Btn onClick={pay}>Pay {money(RATES.always)}</Btn><p className="fine">Renews monthly. Cancel anytime. She won't notice.</p></>}>
      <div className="stack">
        <div className="stack-6"><Title>Almost <Em>off the hook.</Em></Title><Sub>One last look before someone else starts being you.</Sub></div>
        <div className="plan-box">
          <div className="row between"><Eyebrow>Your plan</Eyebrow><button type="button" className="link" onClick={back}>Change</button></div>
          <div className="row between baseline"><p className="plan-name">Always {des.first}</p><p className="strong teal">{money(RATES.always)}<span className="unit">/mo</span></p></div>
          <p className="small muted">Unlimited visits with {des.first}, last-minute included.</p>
          <hr />
          <KV k="Companion" v={`${des.name} as Claire`} />
          <KV k="Visiting" v={`${pt.name} · ${pt.place}`} />
          <KV k="Starts" v="Today. Book visits any time." />
          <KV k="Hours" v="Unlimited" />
        </div>
        <div className="stack-10 px-4">
          <KV k="Always, monthly" v={money(RATES.always)} />
          <KV k="Emotional labor surcharge" v="Included" />
          <KV k="Guilt" v="$0.00" />
          <hr />
          <KV k="Due today" v={money(RATES.always)} strong />
        </div>
        <PaymentRow />
      </div>
    </Screen>
  );
}

export const PaymentRow = () => (
  <div className="pay-row"><Icon name="card" size={20} /><div className="grow"><p className="xs muted">Payment</p><p className="strong">Card on file</p></div><span className="link">Change</span></div>
);
