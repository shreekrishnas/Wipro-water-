// §7 KPI card - coloured left accent strip + uppercase micro-label + big serif value.
export function KpiCard({ label, value, meta, accent = '#7C3AED', serif = true }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1rem',
        padding: '1rem 1.1rem 1.05rem 1.25rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        minHeight: 110,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, width: 4,
          background: accent,
        }}
      />
      <div className="eyebrow" style={{ marginBottom: '0.55rem' }}>{label}</div>
      <div
        className={serif ? 'num-serif' : ''}
        style={{
          fontSize: serif ? '1.85rem' : '1.45rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
      {meta && (
        <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {meta}
        </div>
      )}
    </div>
  );
}
