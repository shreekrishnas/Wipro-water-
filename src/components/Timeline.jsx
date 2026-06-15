import { Link } from 'react-router-dom';
import { webinars, SERIES } from '../data/webinars.js';
import { Icon } from './Icons.jsx';

function themeColor(theme) {
  const t = SERIES.themes.find((x) => x.name === theme);
  return t?.color || '#0891B2';
}
function shortDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
}
function monthYear(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export function Timeline() {
  const ordered = [...webinars].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="timeline">
      {ordered.map((w, i) => {
        const color = themeColor(w.theme);
        const [c1, c2] = w.coverGradient || [color, color];
        return (
          <div key={w.id} className="timeline-node">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                className="cover-thumb"
                style={{
                  width: 150,
                  flexShrink: 0,
                  background: w.coverImage
                    ? `url(${w.coverImage}) center/cover`
                    : `linear-gradient(135deg, ${c1}, ${c2})`,
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', opacity: 0.95 }}>
                  {shortDate(w.date)}
                </div>
              </div>
              <Link
                to={`/webinars/${w.id}`}
                className="glass-card-static"
                style={{
                  flex: 1,
                  padding: '0.95rem 1.1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span className="badge" style={{ background: `${color}1A`, color }}>
                    {w.theme}
                  </span>
                  <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {w.id} · {monthYear(w.date)}
                  </span>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.98rem', lineHeight: 1.25 }}>
                  {w.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {w.topic}
                </div>
                <div style={{
                  display: 'flex', gap: '0.9rem', fontSize: '0.78rem',
                  color: 'var(--text-secondary)', marginTop: 8,
                }}>
                  <span><b style={{ color: 'var(--text-primary)' }}>{(w.registrations || 0).toLocaleString()}</b> reg</span>
                  <span><b style={{ color: 'var(--text-primary)' }}>{(w.attendees || 0).toLocaleString()}</b> live</span>
                  <span><b style={{ color: 'var(--text-primary)' }}>{(w.replayViews || 0).toLocaleString()}</b> replay</span>
                  <span style={{ marginLeft: 'auto', color, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Open <Icon.ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
