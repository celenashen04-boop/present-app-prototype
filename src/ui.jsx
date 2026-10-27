// PRESENT prototype — shared UI pieces.
import { CO, avatarSVG } from './data.js';

const { createContext, useContext } = React;
export const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const SVG = window.__PRESENT_SVG || {};
const svgUrl = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
const avatarCache = {};
export function companionImg(c) {
  if (c.img) return svgUrl(SVG[c.img]);
  return avatarCache[c.id] || (avatarCache[c.id] = svgUrl(avatarSVG(c.av)));
}
export const art = key => svgUrl(SVG[key]);

const ICON = {
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
  shuffle: '<path d="M4 7h3c5 0 5 10 10 10h3M4 17h3c2 0 3-1.5 4-3.3M14 8.7C15 7.4 16 7 17 7h3M18 4l3 3-3 3M18 14l3 3-3 3"/>',
};
export function Icon({ name, size = 20, color = 'currentColor', sw = 1.8, fill = 'none', label }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label} style={{ flex: 'none' }}
    dangerouslySetInnerHTML={{ __html: ICON[name] }} />;
}

export const Btn = ({ children, onClick, kind = 'primary', size, icon, disabled, full = true, style, label }) => (
  <button type="button" className={`btn ${kind} ${size || ''} ${full ? 'full' : ''}`} onClick={onClick} disabled={disabled} style={style} aria-label={label}>
    {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} sw={2.2} />}{children}
  </button>
);
export const IconBtn = ({ name, onClick, label, style, tone }) => (
  <button type="button" className={`icon-btn ${tone || ''}`} onClick={onClick} aria-label={label} style={style}><Icon name={name} size={20} /></button>
);
export const AddBtn = ({ children = 'Add', onClick }) => (
  <button type="button" className="add-btn" onClick={onClick}><Icon name="plus" size={14} sw={2.6} />{children}</button>
);
export const Pill = ({ on, children, onClick, disabled }) => (
  <button type="button" className={`pill ${on ? 'on' : ''}`} aria-pressed={!!on} onClick={onClick} disabled={disabled}>{children}</button>
);
export const Tag = ({ children, tone = 'teal' }) => <span className={`tag ${tone}`}>{children}</span>;
export const Likeness = ({ pct }) => <span className="tag teal">{pct}% likeness</span>;
export const Eyebrow = ({ children, tone }) => <p className={`eyebrow ${tone || ''}`}>{children}</p>;
export const Title = ({ children, size }) => <h1 className="title" style={size ? { fontSize: size } : null}>{children}</h1>;
export const Em = ({ children }) => <span className="em">{children}</span>;
export const Sub = ({ children }) => <p className="sub">{children}</p>;
export const Avatar = ({ letter, size = 36, color = '#17808A', ring }) => (
  <span className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.45, boxShadow: ring ? '0 0 0 2px #fff' : 'none' }}>{letter}</span>
);
export const Pic = ({ src, w, h, r = 14, alt = '', style }) => (
  <img src={src} alt={alt} width={w} height={h} style={{ width: w, height: h, borderRadius: r, objectFit: 'cover', flex: 'none', display: 'block', ...style }} />
);
export const Switch = ({ on, onChange, label }) => (
  <button type="button" role="switch" aria-checked={on} aria-label={label} className={`switch ${on ? 'on' : ''}`} onClick={() => onChange(!on)}><span /></button>
);
export const KV = ({ k, v, strong }) => (
  <div className={`kv ${strong ? 'strong' : ''}`}><span>{k}</span><span>{v}</span></div>
);
export const Meter = ({ value, tone = 'amber' }) => (
  <div className={`meter ${tone}`} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${Math.min(100, value * 100)}%` }} /></div>
);

// Onboarding: 1 About her → 2 Memory kit → 3 Plan.
export const STEPS = ['About her', 'Memory kit', 'Plan'];
export const StepBar = ({ n }) => (
  <div className="stepbar" aria-label={`Step ${n} of ${STEPS.length}`} style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}>{STEPS.map((s, i) => <span key={s} className={i < n ? 'on' : ''} />)}</div>
);

export function Header({ title, onBack, right, step }) {
  const { back } = useApp();
  return (
    <div className="header">
      <div className="header-row">
        {onBack !== false ? <IconBtn name="back" label="Back" onClick={() => (onBack ? onBack() : back())} /> : <span className="spacer44" />}
        {(title || step) && <span className="header-title">{step ? `Step ${step} of ${STEPS.length} · ${STEPS[step - 1]}` : title}</span>}
        {right || <span className="spacer44" />}
      </div>
      {step && <StepBar n={step} />}
    </div>
  );
}

// A screen: optional header, scrolling body, optional fixed footer and tab bar.
export function Screen({ header, children, footer, tab, className = '', bodyStyle }) {
  return (
    <section className={`screen ${className}`}>
      {header}
      <div className="body" style={bodyStyle}>{children}</div>
      {footer && <div className="footer">{footer}</div>}
      {tab && <TabBar active={tab} />}
    </section>
  );
}

export function TabBar({ active }) {
  const { tab } = useApp();
  const tabs = [['home', 'Home', 'home'], ['companions', 'Companions', 'people'], ['memoriesTab', 'Memories', 'doc'], ['account', 'Account', 'user']];
  return (
    <nav className="tabbar" aria-label="Main">
      {tabs.map(([key, label, icon]) => (
        <button type="button" key={key} className={active === key ? 'on' : ''} aria-current={active === key ? 'page' : undefined} onClick={() => tab(key)}>
          <Icon name={icon} size={22} sw={1.7} />{label}
        </button>
      ))}
    </nav>
  );
}

export function Sheet({ title, sub, children }) {
  const { closeSheet } = useApp();
  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="scrim" aria-label="Close" onClick={closeSheet} />
      <div className="sheet">
        <span className="grabber" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <IconBtn name="close" label="Close" onClick={closeSheet} />
        </div>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

// Companion ID card, used in the Companions list, matching and visit details.
export function IdCard({ c, onClick, foot, footTone, badge }) {
  const { db } = useApp();
  const Tag2 = onClick ? 'button' : 'div';
  return (
    <Tag2 type={onClick ? 'button' : undefined} className="idcard" onClick={onClick}>
      <Pic src={companionImg(c)} w={88} h={112} alt={c.name} />
      <div className="idcard-body">
        <div className="row between"><strong className="idname row gap-6">{c.name}{db.liked.includes(c.id) && <Icon name="heart" size={14} color="#17808A" fill="#17808A" label="Liked" />}</strong><Likeness pct={c.likeness} /></div>
        <dl className="facts">
          <dt>Age</dt><dd>{c.age}</dd>
          <dt>Role</dt><dd>{c.background === 'Teaching' ? 'Retired teacher' : c.background === 'Acting' ? 'Actor' : c.background === 'Hospice care' ? 'Hospice aide' : c.background === 'Social work' ? 'Social worker' : 'Nurse'}</dd>
          <dt>Speaks</dt><dd>{c.langs.join(', ')}</dd>
        </dl>
        <div className={`idfoot ${footTone || (c.available ? 'amber' : 'muted')}`}>
          <Icon name={foot ? 'user' : 'clock'} size={14} sw={2} />
          <span>{foot || c.avail}{!foot && c.lastMinute ? ' · last-minute OK' : ''}</span>
        </div>
        {(badge || db.designated === c.id) && <span className="designated-badge"><Icon name="star" size={12} sw={2} fill="currentColor" />{badge || 'Designated'}</span>}
      </div>
    </Tag2>
  );
}

export const companionById = id => CO[id];
