import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { webinars } from '../data/webinars.js';
import { Avatar } from '../components/Avatar.jsx';
import { Icon } from '../components/Icons.jsx';

export default function Speakers() {
  const speakers = useMemo(() => {
    const map = new Map();
    for (const w of webinars) {
      for (const s of (w.speakers || [])) {
        const key = (s.name || '').trim() || 'TBD';
        if (!map.has(key)) map.set(key, { ...s, name: key, sessions: [] });
        map.get(key).sessions.push({ id: w.id, title: w.title, date: w.date });
      }
    }
    return [...map.values()].sort((a, b) => b.sessions.length - a.sessions.length);
  }, []);

  return (
    <div
      className="stagger"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.1rem',
      }}
    >
      {speakers.map((s) => (
        <div key={s.name} className="glass-card-static" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
            <Avatar name={s.name} id={s.name} size={52} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {[s.title, s.company].filter(Boolean).join(' · ') || '—'}
              </div>
            </div>
          </div>
          <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: '0.9rem 0' }} />
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {s.sessions.length} session{s.sessions.length === 1 ? '' : 's'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {s.sessions.map((sess) => (
              <Link
                key={sess.id}
                to={`/webinars/${sess.id}`}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.5rem',
                  background: 'var(--surface-hover)',
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {sess.title}
                </span>
                <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {sess.date} <Icon.ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {!speakers.length && (
        <div className="glass-card-static" style={{ padding: '2rem', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
          No speakers yet — they'll appear here once you fill in the <span className="mono">speakers</span> array on each webinar.
        </div>
      )}
    </div>
  );
}
