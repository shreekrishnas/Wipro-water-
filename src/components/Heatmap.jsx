import { webinars } from '../data/webinars.js';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function Heatmap({ year }) {
  const targetYear = year || (() => {
    const years = webinars.map((w) => new Date(w.date).getFullYear());
    return Math.max(...years);
  })();

  const cells = MONTHS.map((m, idx) => {
    const found = webinars.find((w) => {
      const d = new Date(w.date);
      return d.getFullYear() === targetYear && d.getMonth() === idx;
    });
    return { month: m, webinar: found };
  });

  return (
    <div>
      <div className="heatmap">
        {cells.map((c, i) => (
          <div
            key={i}
            className={`heatmap-cell ${c.webinar ? 'active' : ''}`}
            title={c.webinar ? `${c.webinar.title} · ${c.webinar.date}` : `${c.month} ${targetYear} - no session`}
          >
            {c.month}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: '0.75rem', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: 'linear-gradient(135deg, #06B6D4, #0891B2)' }} />
          Session
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--surface-hover)' }} />
          Gap month
        </span>
        <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--text-primary)' }}>{targetYear}</span>
      </div>
    </div>
  );
}
