import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { webinars } from '../data/webinars.js';
import { StatusBadge, TagPill } from '../components/Badge.jsx';
import { Icon } from '../components/Icons.jsx';

function fmt(n) { return Number(n || 0).toLocaleString(); }

export default function WebinarList() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return webinars.filter((w) => {
      if (filter !== 'all' && w.status !== filter) return false;
      if (!q) return true;
      const hay = `${w.title} ${w.topic} ${w.id} ${(w.tags||[]).join(' ')}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, filter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <div className="search-wrap">
          <Icon.Search />
          <input
            className="search-pill"
            placeholder="Search by title, topic, tag, or id…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="seg-toggle">
          {['all', 'completed', 'upcoming', 'cancelled'].map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
              style={{ textTransform: 'capitalize' }}
            >{f}</button>
          ))}
        </div>
      </div>

      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.1rem',
        }}
      >
        {filtered.map((w) => (
          <Link
            key={w.id}
            to={`/webinars/${w.id}`}
            className="glass-card"
            style={{
              padding: '1.15rem 1.2rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              color: 'inherit',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{w.id}</div>
              <StatusBadge status={w.status} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.25 }}>
                {w.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                {w.topic}
              </div>
            </div>
            <div style={{
              display: 'flex', gap: '0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.Calendar size={13} /> {w.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.Clock /> {w.time}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.MapPin /> {w.platform}
              </span>
            </div>
            <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: 0 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
              <Stat label="Reg" value={fmt(w.registrations)} />
              <Stat label="Live" value={fmt(w.attendees)} />
              <Stat label="Replay" value={fmt(w.replayViews)} />
              <Stat label="Leads" value={fmt(w.leads)} />
            </div>
            {!!(w.tags && w.tags.length) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {w.tags.slice(0, 3).map((t) => <TagPill key={t} color="#0EA5E9">{t}</TagPill>)}
              </div>
            )}
          </Link>
        ))}
        {!filtered.length && (
          <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>
            No webinars match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>{value}</div>
    </div>
  );
}
