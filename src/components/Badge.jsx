// §10 — pills always set inline background so the dark-mode safety net
// preserves the text colour.
const MAP = {
  completed: { bg: 'rgba(16,185,129,0.12)', fg: '#059669', dot: '#10B981', label: 'Completed' },
  upcoming:  { bg: 'rgba(14,165,233,0.12)', fg: '#0369A1', dot: '#0EA5E9', label: 'Upcoming' },
  cancelled: { bg: 'rgba(239,68,68,0.12)',  fg: '#B91C1C', dot: '#EF4444', label: 'Cancelled' },
  live:      { bg: 'rgba(124,58,237,0.12)', fg: '#6D28D9', dot: '#7C3AED', label: 'Live' },
};

export function StatusBadge({ status }) {
  const m = MAP[status] || MAP.completed;
  return (
    <span className="badge" style={{ background: m.bg, color: m.fg }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.dot }} />
      {m.label}
    </span>
  );
}

export function TagPill({ children, color = '#7C3AED' }) {
  return (
    <span
      className="badge"
      style={{
        background: `${color}1A`,
        color,
      }}
    >
      {children}
    </span>
  );
}
