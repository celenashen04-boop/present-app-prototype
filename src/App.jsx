// PRESENT prototype — app shell: state, navigation, phone frame, toasts.
import { initialDB, demoDB, at } from './data.js';
import { Ctx } from './ui.jsx';
import * as O from './onboarding.jsx';
import * as Vi from './visits.jsx';
import * as Tb from './tabs.jsx';

const { useState, useEffect, useRef } = React;

const SCREENS = {
  welcome: O.Welcome, intake: O.Intake, companions: O.Companions, filters: O.Filters, profile: O.Profile, kit: O.Kit,
  plans: O.Plans, subscribe: O.Subscribe,
  newVisit: Vi.NewVisit, quote: Vi.Quote, matching: Vi.Matching, pay: Vi.Pay, booked: Vi.Booked, visit: Vi.VisitDetail,
  home: Tb.Home, memoriesTab: Tb.MemoriesTab, account: Tb.Account, notifications: Tb.Notifications,
  library: Tb.Library, camera: Tb.Camera, generate: Tb.Generate,
};
const SHEETS = { switcher: Tb.SwitcherSheet, addMemory: Tb.AddMemorySheet, addPrep: Tb.AddPrepSheet, addPhoto: Tb.AddPhotoSheet, storage: Tb.StorageSheet };
const DEFAULT_PREP = ['Bring something she loves', 'Learn one new story from the kit'];

const DEVICE_W = 402 + 24, DEVICE_H = 874 + 24; // screen plus bezel

function App() {
  const [db, setDb] = useState(initialDB);
  const key = useRef(1);
  const [stack, setStack] = useState([{ name: 'welcome', params: {}, k: 0 }]);
  const [motion, setMotion] = useState('fade');
  const [sheet, setSheet] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  // Shown at true size (402 × 874 CSS px) unless "Fit to window" is on. On a real phone the app fills the screen.
  const [fitToWindow, setFitToWindow] = useState(false);
  const [scale, setScale] = useState(1);
  const [onPhone, setOnPhone] = useState(false);

  useEffect(() => {
    const measure = () => {
      setOnPhone(window.innerWidth <= 500);
      setScale(fitToWindow ? Math.min(1, (window.innerWidth - 32) / DEVICE_W, (window.innerHeight - 96) / DEVICE_H) : 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [fitToWindow]);
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2800);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const go = (name, params = {}) => [{ name, params, k: key.current++ }];
  const app = {
    db,
    set: patch => setDb(d => ({ ...d, ...(typeof patch === 'function' ? patch(d) : patch) })),
    nav: (name, params = {}) => { setMotion('push'); setSheet(null); setStack(s => [...s, ...go(name, params)]); },
    // Goes back n screens (one by default). Ignores anything that isn't a number, like a click event.
    back: n => { const k = typeof n === 'number' ? n : 1; setMotion('pop'); setSheet(null); setStack(s => s.length > k ? s.slice(0, -k) : s.slice(0, 1)); },
    tab: name => { setMotion('fade'); setSheet(null); setStack(go(name)); },
    reset: name => { setMotion('fade'); setSheet(null); setStack(go(name)); },
    openSheet: (name, params = {}) => setSheet({ name, params, k: key.current++ }),
    closeSheet: () => setSheet(null),
    toast: msg => setToastMsg({ msg, k: key.current++ }),
    // Adds a visit for the current person and returns its id.
    book: ({ date, start, hrs, companion, kind }) => {
      const id = key.current++;
      setDb(d => {
        const n = Math.max(12, ...d.visits.map(v => v.n)) + 1;
        const visit = { id, patient: d.patient, start: at(date, start), hrs, companion, kind, n, prep: DEFAULT_PREP.map(t => ({ t, done: false })) };
        const note = { icon: 'calendar', t: 'Visit booked', b: `Visit ${n} is confirmed. Nothing else for you to do.`, time: 'Now', unread: true, to: 'home' };
        return { ...d, visits: [...d.visits, visit], notifications: [note, ...d.notifications] };
      });
      return id;
    },
  };

  const startOver = () => { setDb(initialDB()); setSheet(null); setMotion('fade'); setStack(go('welcome')); };
  const demo = () => { setDb(demoDB()); setSheet(null); setMotion('fade'); setStack(go('home')); };
  const top = stack[stack.length - 1];
  const Current = SCREENS[top.name];
  const SheetC = sheet && SHEETS[sheet.name];

  const device = (
    <div className="device">
      <div key={top.k} className={`stage ${motion}`}><Current p={top.params} /></div>
      {SheetC && <SheetC key={sheet.k} p={sheet.params} />}
      {toastMsg && <div key={toastMsg.k} className="toast" role="status">{toastMsg.msg}</div>}
    </div>
  );

  if (onPhone) return <Ctx.Provider value={app}><div className="phone-full">{device}</div></Ctx.Provider>;

  return (
    <Ctx.Provider value={app}>
      <div className="page">
        <div className="toolbar">
          <p><b>PRESENT</b> · {scale < 1 ? `fit to window (${Math.round(scale * 100)}%)` : 'actual size · 402 × 874'}</p>
          <div className="toolbar-actions">
            <button type="button" onClick={startOver}>Start over</button>
            <button type="button" onClick={demo}>Demo account</button>
            <button type="button" aria-pressed={fitToWindow} onClick={() => setFitToWindow(!fitToWindow)}>{fitToWindow ? 'Actual size' : 'Fit to window'}</button>
          </div>
        </div>
        <div className="device-slot" style={{ width: DEVICE_W * scale, height: DEVICE_H * scale }}>
          <div className="bezel" style={{ transform: `scale(${scale})` }}>{device}</div>
        </div>
      </div>
    </Ctx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
