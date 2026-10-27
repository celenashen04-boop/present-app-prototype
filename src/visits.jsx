// PRESENT prototype — booking a visit: calendar → price → (matching) → pay → booked, and visit details.
import { NOW, CO, DAY, MONTH, MY_CALENDAR, DONT, RATES, patientOf, roleOf, sameDay, at, fmtHour, fmtDate, money, hoursFrom, quote, matchPool } from './data.js';
import { useApp, Screen, Header, Btn, AddBtn, Pill, Tag, Eyebrow, Title, Em, Sub, Pic, KV, Icon, IdCard, companionImg } from './ui.jsx';
import { PaymentRow } from './onboarding.jsx';

const { useState, useEffect } = React;

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const range = (start, hrs) => `${fmtHour(start)} – ${fmtHour(start + hrs)}`;

function locations(db) {
  const pt = patientOf(db);
  return [
    { id: 'home', name: pt.place, sub: `${pt.room ? pt.room + ' · ' : ''}${pt.name} lives here` },
    { id: 'hospital', name: 'Lakeview Hospital', sub: 'If she has been moved for care' },
  ];
}

// Step 1 of booking: where, then a calendar for the day and a day view for the time.
export function NewVisit({ p }) {
  const { db, nav } = useApp();
  const locs = locations(db);
  const [loc, setLoc] = useState(p.loc || 'home');
  const [month, setMonth] = useState(new Date(2026, (p.date || NOW).getMonth(), 1));
  const [date, setDate] = useState(p.date || null);
  const [start, setStart] = useState(p.start ?? null);
  const [hrs, setHrs] = useState(p.hrs || 2);
  const today = startOfDay(NOW);

  const first = month.getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const visitsOn = d => db.visits.filter(v => v.patient === db.patient && sameDay(v.start, d));
  const busyOn = d => MY_CALENDAR.filter(e => sameDay(e.date, d));
  const canPrev = month > new Date(2026, 9, 1), canNext = month < new Date(2026, 11, 1);

  const taken = (h, d) => visitsOn(d).some(v => h < v.start.getHours() + v.hrs && h + 1 > v.start.getHours());
  const past = (h, d) => at(d, h) <= NOW;
  const slotOk = (h, d) => !past(h, d) && !taken(h, d) && h + hrs <= 19;
  const pick = d => { setDate(d); if (start != null && !slotOk(start, d)) setStart(null); };
  const chosen = date && start != null;
  const late = chosen && hoursFrom(at(date, start)) < 24;
  const busy = chosen && busyOn(date).find(e => start < e.to && start + hrs > e.from);

  return (
    <Screen header={<Header title="New visit" />}
      footer={<>
        {chosen && <p className="fine strong">{fmtDate(date)} · {range(start, hrs)}</p>}
        <Btn disabled={!chosen} onClick={() => nav('quote', { loc, date, start, hrs, who: p.who })}>{chosen ? 'See price' : 'Pick a day and time'}</Btn>
      </>}>
      <div className="stack">
        <div className="stack-6"><Title>When should <Em>someone be you?</Em></Title><Sub>Pick where, which day and what time. We'll tell you the price next.</Sub></div>

        <div className="stack-10">
          <Eyebrow>1 · Where</Eyebrow>
          {locs.map(l => (
            <button type="button" key={l.id} className={`option ${loc === l.id ? 'on' : ''}`} aria-pressed={loc === l.id} onClick={() => setLoc(l.id)}>
              <Icon name="pin" size={20} /><span className="grow"><span className="strong">{l.name}</span><span className="xs muted block">{l.sub}</span></span>
              {loc === l.id && <span className="check-dot"><Icon name="check" size={14} sw={3} /></span>}
            </button>
          ))}
        </div>

        <div className="stack-10">
          <Eyebrow>2 · Day</Eyebrow>
          <div className="calendar">
            <div className="cal-head">
              <button type="button" className="cal-nav" disabled={!canPrev} aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><Icon name="back" size={18} /></button>
              <strong>{MONTH[month.getMonth()]} {month.getFullYear()}</strong>
              <button type="button" className="cal-nav" disabled={!canNext} aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><Icon name="chevron" size={18} /></button>
            </div>
            <div className="cal-grid" role="grid">
              {DAY.map(d => <span key={d} className="cal-dow">{d[0]}</span>)}
              {cells.map((d, i) => d
                ? <button type="button" key={i} disabled={d < today}
                    className={`cal-day ${date && sameDay(d, date) ? 'on' : ''} ${sameDay(d, today) ? 'today' : ''}`}
                    aria-label={fmtDate(d)} aria-pressed={!!date && sameDay(d, date)} onClick={() => pick(d)}>
                    {d.getDate()}
                    <span className="cal-dots">{visitsOn(d).length > 0 && <i className="teal" />}{busyOn(d).length > 0 && <i className="gray" />}</span>
                  </button>
                : <span key={i} />)}
            </div>
            <div className="cal-legend"><span><i className="teal" />PRESENT visit</span><span><i className="gray" />Your calendar</span><span><i className="ring" />Today</span></div>
          </div>
        </div>

        {date && (
          <div className="stack-10">
            <div className="row between"><Eyebrow>3 · Time on {fmtDate(date)}</Eyebrow></div>
            <div className="seg" role="group" aria-label="Visit length">
              {[1, 2, 3].map(h => <button type="button" key={h} className={hrs === h ? 'on' : ''} aria-pressed={hrs === h} onClick={() => { setHrs(h); if (start != null && start + h > 19) setStart(null); }}>{h} {h === 1 ? 'hour' : 'hours'}</button>)}
            </div>
            <div className="dayview">
              {HOURS.map(h => {
                const ok = slotOk(h, date);
                const sel = start != null && h >= start && h < start + hrs;
                const ev = busyOn(date).find(e => h >= e.from && h < e.to);
                const v = visitsOn(date).find(x => h >= x.start.getHours() && h < x.start.getHours() + x.hrs);
                return (
                  <button type="button" key={h} className={`slot ${sel ? 'on' : ''} ${sel && h === start ? 'first' : ''} ${!ok && !sel ? 'off' : ''}`}
                    disabled={!ok} onClick={() => setStart(h)} aria-label={`${fmtHour(h)}${ev ? ', busy: ' + ev.title : ''}`}>
                    <span className="slot-time">{fmtHour(h).replace(':00', '')}</span>
                    <span className="slot-lane">
                      {sel && h === start && <span className="blk new">New visit · {range(start, hrs)}</span>}
                      {!sel && v && <span className="blk visit">{CO[v.companion].first} · Visit {v.n}</span>}
                      {!sel && !v && ev && <span className="blk busy">{h === ev.from || h === start + hrs ? ev.title : ''}</span>}
                      {!sel && !v && !ev && past(h, date) && <span className="blk past">Past</span>}
                    </span>
                  </button>
                );
              })}
            </div>
            {late && <div className="note amber"><Icon name="bolt" size={18} /><p>This starts in under 24 hours, so last-minute pricing applies unless you're subscribed.</p></div>}
            {busy && <div className="note"><Icon name="calendar" size={18} /><p>You're busy then: {busy.title}. A good time to send someone.</p></div>}
          </div>
        )}
      </div>
    </Screen>
  );
}

// Step 2: what kind of visit this is and what it costs.
export function Quote({ p }) {
  const { db, nav, book } = useApp();
  const des = db.designated ? CO[db.designated] : null;
  const startAt = at(p.date, p.start);
  // Normal pricing (any available companion) unless the family asked for their designated companion.
  const [who, setWho] = useState(p.who || 'any');
  const [more, setMore] = useState(p.who === 'designated');
  const q = quote(db, startAt, p.hrs, who);
  const loc = locations(db).find(l => l.id === p.loc);
  const late = hoursFrom(startAt) < 24;
  const desBlocked = late && des && !des.lastMinute;
  const tone = q.kind === 'included' ? 'teal' : q.kind === 'last' ? 'amber' : 'ink';
  const anyOn = who === 'any' || desBlocked || !des;
  return (
    <Screen header={<Header title="New visit" />}
      footer={q.matching
        ? <Btn icon="shuffle" onClick={() => nav('matching', { ...p, who })}>Find a match</Btn>
        : q.kind === 'included'
          ? <Btn onClick={() => { const id = book({ ...p, companion: q.companion, kind: q.kind }); nav('booked', { id }); }}>Confirm visit · $0.00</Btn>
          : <Btn onClick={() => nav('pay', { ...p, who, companion: q.companion })}>Continue to payment</Btn>}>
      <div className="stack">
        <div className={`quote-card ${tone}`}>
          <span className="quote-tag">{q.kind === 'included' ? 'Included' : q.kind === 'last' ? 'Last-minute pricing' : 'Normal pricing'}</span>
          <p className="quote-price">{q.kind === 'included' ? 'Free' : money(q.rate)}<span>{q.kind === 'included' ? ' with Always ' + des.first : '/hr'}</span></p>
          <p className="small">{q.detail}</p>
        </div>

        <div className="summary">
          <KV k="When" v={`${fmtDate(p.date)} · ${range(p.start, p.hrs)}`} />
          <KV k="Where" v={loc.name} />
          <KV k="Visiting" v={`${patientOf(db).name} · as Claire`} />
        </div>

        {q.kind !== 'included' && (
          <div className="stack-10">
            <Eyebrow>Who goes</Eyebrow>
            <button type="button" className={`option ${anyOn ? 'on' : ''}`} aria-pressed={anyOn} onClick={() => setWho('any')}>
              <span className="choice-empty sm"><Icon name="shuffle" size={20} /></span>
              <span className="grow">
                <span className="strong">Any available companion</span>
                <span className="xs muted block">{money(late ? RATES.last : RATES.single)}/hr · we match the closest face</span>
              </span>
              {anyOn && <span className="check-dot"><Icon name="check" size={14} sw={3} /></span>}
            </button>

            <button type="button" className="more-toggle" aria-expanded={more} onClick={() => setMore(!more)}>
              {more ? 'Hide other pricing options' : 'See other pricing options'}<Icon name="down" size={16} sw={2.2} />
            </button>

            {more && <>
              <button type="button" className={`option ${who === 'designated' && !desBlocked && des ? 'on' : ''}`} disabled={desBlocked}
                aria-pressed={who === 'designated'} onClick={() => des ? setWho('designated') : nav('companions', { mode: 'pick' })}>
                {des ? <Pic src={companionImg(des)} w={44} h={44} r={12} alt="" /> : <span className="choice-empty sm"><Icon name="user" size={20} /></span>}
                <span className="grow">
                  <span className="strong">{des ? `Designated companion · ${des.name}` : 'Designated companion'}</span>
                  <span className="xs muted block">{!des ? 'Choose someone to send every time' : desBlocked ? `${des.first} doesn't take last-minute bookings` : `${money(late ? RATES.last : RATES.reserved)}/hr · same face every time`}</span>
                </span>
                {who === 'designated' && !desBlocked && des && <span className="check-dot"><Icon name="check" size={14} sw={3} /></span>}
              </button>
              <div className="option sub-offer">
                <span className="choice-empty sm"><Icon name="star" size={20} /></span>
                <span className="grow">
                  <span className="strong block">Always {des ? des.first : 'Maya'} · {money(RATES.always)}/mo</span>
                  <span className="xs muted block">Subscribe and this visit is included. No last-minute rates, ever.</span>
                </span>
                <Btn size="sm" kind="soft" full={false} onClick={() => nav('subscribe', { fromQuote: true })}>Subscribe</Btn>
              </div>
            </>}
          </div>
        )}

        <div className="stack-10 px-4">
          {q.kind === 'included'
            ? <><KV k={`${p.hrs} ${p.hrs === 1 ? 'hour' : 'hours'} with ${des.first}`} v="Included" /><KV k="Emotional labor surcharge" v="Included" /></>
            : <><KV k={`${p.hrs} ${p.hrs === 1 ? 'hr' : 'hrs'} × ${money(q.rate)}`} v={money(q.total)} /><KV k="Emotional labor surcharge" v="Included" /></>}
          <hr />
          <KV k="Total" v={money(q.total)} strong />
        </div>
        {q.matching && <p className="xs muted">Next we'll match a companion to Claire's face, voice and history. You approve the match before paying.</p>}
      </div>
    </Screen>
  );
}

// Step 3 (any available companion only): the matching process.
export function Matching({ p }) {
  const { db, nav } = useApp();
  const startAt = at(p.date, p.start);
  const late = hoursFrom(startAt) < 24;
  const pool = matchPool(db, late);
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [pick, setPick] = useState(0);
  const [stage, setStage] = useState(0);
  const [flick, setFlick] = useState(0);
  const stages = [`Checking ${pool.length} available companions near Maple Grove`, 'Applying your filters and do-not list', "Comparing face, voice and height to Claire's"];

  useEffect(() => {
    setStage(0);
    if (reduce) { setStage(3); return; }
    const timers = [1, 2, 3].map(s => setTimeout(() => setStage(s), s * 900));
    return () => timers.forEach(clearTimeout);
  }, [pick]);
  useEffect(() => {
    if (stage >= 3) return;
    const t = setInterval(() => setFlick(f => f + 1), 180);
    return () => clearInterval(t);
  }, [stage]);

  if (!pool.length) return (
    <Screen header={<Header title="Matching" />}><div className="stack"><Title>No one is free then.</Title><Sub>Try another time, or subscribe so your designated companion always goes.</Sub></div></Screen>
  );
  const c = pool[pick % pool.length];
  const shown = stage < 3 ? pool[flick % pool.length] : c;
  const done = stage >= 3;
  return (
    <Screen header={<Header title="Matching" />}
      footer={done ? <>
        <Btn onClick={() => nav('pay', { ...p, companion: c.id, who: 'any' })}>Accept {c.first}</Btn>
        <Btn kind="ghost" icon="shuffle" onClick={() => setPick(pick + 1)}>Find someone else</Btn>
      </> : <Btn disabled>Matching…</Btn>}>
      <div className="stack">
        <div className="stack-6"><Title>{done ? <>We found <Em>you.</Em></> : <>Finding someone <Em>like you…</Em></>}</Title>
          <Sub>{done ? `${c.first} is the closest available match for ${fmtDate(p.date)}.` : 'This usually takes a few seconds.'}</Sub></div>
        <div className={`match-stage ${done ? 'done' : ''}`}>
          <Pic src={companionImg(shown)} w={150} h={180} r={24} alt={done ? c.name : ''} />
          <div className="match-meter"><span style={{ width: `${done ? c.likeness : 30 + (flick * 7) % 60}%` }} /></div>
          <p className="strong">{done ? `${c.likeness}% likeness to Claire` : 'Comparing…'}</p>
        </div>
        <ol className="match-steps">
          {stages.map((s, i) => <li key={s} className={stage > i ? 'done' : stage === i ? 'now' : ''}><span className="dot">{stage > i ? <Icon name="check" size={12} sw={3} /> : null}</span>{s}</li>)}
        </ol>
        {done && <IdCard c={c} />}
      </div>
    </Screen>
  );
}

export function Pay({ p }) {
  const { db, nav, book } = useApp();
  const startAt = at(p.date, p.start);
  const q = quote(db, startAt, p.hrs, p.who);
  const c = CO[p.companion];
  const loc = locations(db).find(l => l.id === p.loc);
  const kind = q.kind;
  return (
    <Screen header={<Header title="Review & pay" />}
      footer={<><Btn onClick={() => { const id = book({ ...p, kind }); nav('booked', { id }); }}>Pay {money(q.total)}</Btn><p className="fine">One visit. No commitment, from anyone.</p></>}>
      <div className="stack">
        <div className="stack-6"><Title>Almost <Em>off the hook.</Em></Title><Sub>One last look before someone else starts being you.</Sub></div>
        <div className={`plan-box ${kind === 'last' ? 'amber' : ''}`}>
          <div className="row between"><Eyebrow>Your visit</Eyebrow>{kind === 'last' ? <Tag tone="amber">Last-minute</Tag> : <Tag>Normal pricing</Tag>}</div>
          <div className="row gap-12">
            <Pic src={companionImg(c)} w={52} h={52} r={14} alt={c.name} />
            <div className="grow"><p className="plan-name">{c.name} as Claire</p><p className="xs muted">{kind === 'reserved' ? 'Your designated companion' : 'Matched for this visit'} · {c.likeness}% likeness</p></div>
          </div>
          <hr />
          <KV k="When" v={`${fmtDate(p.date)} · ${range(p.start, p.hrs)}`} />
          <KV k="Where" v={loc.name} />
        </div>
        <div className="stack-10 px-4">
          <KV k={`${p.hrs} ${p.hrs === 1 ? 'hr' : 'hrs'} × ${money(q.rate)}`} v={money(q.total)} />
          <KV k="Emotional labor surcharge" v="Included" />
          <KV k="Guilt" v="$0.00" />
          <hr />
          <KV k="Due today" v={money(q.total)} strong />
        </div>
        <PaymentRow />
      </div>
    </Screen>
  );
}

export function Booked({ p }) {
  const { db, nav, reset } = useApp();
  const v = db.visits.find(x => x.id === p.id);
  const c = CO[v.companion];
  const pt = patientOf(db);
  const note = v.kind === 'included' ? `${pt.name} will be told her ${roleOf(db)} is on the way.`
    : v.kind === 'last' ? `Subscribers never pay last-minute rates. Always ${CO[db.designated || 'maya'].first} covers every visit.`
      : `${pt.name} will be told her ${roleOf(db)} is on the way.`;
  return (
    <Screen className="done" footer={<><Btn onClick={() => reset('home')}>Go to home</Btn><Btn kind="ghost" onClick={() => nav('visit', { id: v.id })}>See visit details</Btn></>}>
      <div className="done-body">
        <span className="done-mark hook"><Icon name="hook" size={56} sw={1.8} label="A fishhook" /></span>
        <Tag tone={v.kind === 'last' ? 'amber' : 'teal'}>{v.kind === 'included' ? 'Included' : v.kind === 'last' ? 'Last-minute' : 'Normal pricing'}</Tag>
        <h1 className="display-xl">You're off the hook.</h1>
        <p className="lede">{c.first} visits {pt.name} on {fmtDate(v.start)} at {fmtHour(v.start.getHours())} as Claire. We'll send a report after, so it feels like you were there.</p>
        <div className="note peach"><Icon name="heart" size={20} /><p>{note}</p></div>
      </div>
    </Screen>
  );
}

export function VisitDetail({ p }) {
  const { db, set, nav, back, toast, openSheet } = useApp();
  const upcoming = db.visits.filter(v => v.start > NOW).sort((a, b) => a.start - b.start);
  const v = db.visits.find(x => x.id === p.id) || upcoming[0];
  if (!v) return <Screen header={<Header title="Visit" />}><Sub>No upcoming visits.</Sub></Screen>;
  const c = CO[v.companion];
  const pt = patientOf(db);
  const toggle = i => set(d => ({ visits: d.visits.map(x => x.id === v.id ? { ...x, prep: x.prep.map((it, j) => j === i ? { ...it, done: !it.done } : it) } : x) }));
  const dont = db.intake.dont;
  return (
    <Screen header={<Header title={`Visit ${v.n}`} />} footer={<Btn onClick={() => { toast('Visit confirmed. Nothing else for you to do.'); back(); }}>Confirm</Btn>}>
      <div className="stack">
        <div className="stack-6"><Title>{fmtDate(v.start)}, {fmtHour(v.start.getHours())}. <Em>You're free.</Em></Title><Sub>{c.first} visits {pt.name} as Claire. Nothing for you to do but not show up.</Sub></div>
        <IdCard c={c} foot={`Visiting as Claire · Visit ${v.n}`} footTone="teal" onClick={() => nav('profile', { id: c.id })} />
        <div className="row gap-12 top"><span className="icon-tile"><Icon name="pin" size={20} /></span>
          <div><p className="strong">{pt.place}{pt.room ? ' · ' + pt.room : ''}</p><p className="small muted">{range(v.start.getHours(), v.hrs)}. The front desk knows {c.first} as Claire.</p></div></div>
        <div className="stack-6">
          <div className="row between"><Eyebrow>{c.first}'s prep for this visit</Eyebrow><AddBtn onClick={() => openSheet('addPrep', { id: v.id })} /></div>
          {v.prep.map((it, i) => (
            <label key={i} className="check-row"><input type="checkbox" checked={it.done} onChange={() => toggle(i)} /><span className="box"><Icon name="check" size={14} sw={3} /></span><span>{it.t}</span></label>
          ))}
        </div>
        <div className="note peach stack-6 dont">
          <div className="row between"><span className="row gap-8"><Icon name="ban" size={16} sw={2} /><Eyebrow tone="amber">Your do-not list</Eyebrow></span></div>
          {DONT.map(([title, items]) => {
            const on = items.filter(k => dont[k]);
            return on.length ? <p key={title} className="small"><b>{title}:</b> {on.map(k => k.charAt(0).toLowerCase() + k.slice(1)).join(', ').replace("dad's", "Dad's")}</p> : null;
          })}
        </div>
      </div>
    </Screen>
  );
}
