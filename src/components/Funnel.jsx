import { totals } from '../data/webinars.js';

function pct(num, den) {
  if (!den) return '-';
  return `${((num / den) * 100).toFixed(1)}%`;
}

export function Funnel() {
  const t = totals();
  const steps = [
    { label: 'Registered',     value: t.totalRegistrations,  color: '#06B6D4' },
    { label: 'Attended live',  value: t.totalAttendees,      color: '#0891B2' },
    { label: 'Watched replay', value: t.totalReplayViews,    color: '#0E7490' },
    { label: 'Qualified leads',value: t.totalLeads,          color: '#10B981' },
  ];
  const top = steps[0].value || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.05rem' }}>
      {steps.map((s, i) => {
        const width = Math.max(28, (s.value / top) * 100);
        const prev = i > 0 ? steps[i - 1].value : 0;
        return (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: `${width}%`,
                minHeight: 64,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}CC)`,
                color: '#fff',
                borderRadius: '0.85rem',
                padding: '0.7rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 8px 22px ${s.color}40`,
                transition: 'width .5s ease',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.02em' }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: 'Fraunces, ui-serif, Georgia, serif',
                fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em',
              }}>
                {(s.value || 0).toLocaleString()}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {pct(steps[i + 1].value, s.value)} convert
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
