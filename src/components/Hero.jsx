import { Counter } from './Counter.jsx';
import { Logo } from './Logo.jsx';
import { SERIES, totals } from '../data/webinars.js';

export function Hero({ onExport }) {
  const t = totals();
  return (
    <div className="hero-strip">
      <div className="hero-ripple" aria-hidden />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.30)',
            padding: '0.3rem 0.7rem',
            borderRadius: 9999,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '0.85rem',
            backdropFilter: 'blur(8px)',
          }}>
            <Logo size={20} rounded={6} /> {SERIES.kicker}
          </div>
          <h1 style={{
            margin: 0,
            fontFamily: 'Fraunces, ui-serif, Georgia, serif',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 2.4vw, 2.25rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>{SERIES.title}</h1>
          <p style={{
            marginTop: '0.7rem',
            maxWidth: 640,
            fontSize: '0.92rem',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.92)',
          }}>{SERIES.mission}</p>

          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.1rem', flexWrap: 'wrap' }}>
            <Stat label="Webinars" value={t.webinarCount} />
            <Stat label="Registrations" value={t.totalRegistrations} />
            <Stat label="Live Attendees" value={t.totalAttendees} />
            <Stat label="Replay Views" value={t.totalReplayViews} />
          </div>
        </div>

        <button
          onClick={onExport}
          style={{
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            padding: '0.55rem 1rem',
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
          </svg>
          Export Report
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{
        fontSize: '0.66rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.72)',
        marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: 'Fraunces, ui-serif, Georgia, serif',
        fontSize: '1.65rem',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: '#fff',
      }}>
        <Counter value={value} />
      </div>
    </div>
  );
}
