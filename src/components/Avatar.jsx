const PALETTE = ['#6366F1','#0EA5E9','#10B981','#F59E0B','#F472B6','#8B5CF6','#06B6D4','#EF4444'];

function hashColor(id = '') {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

export function Avatar({ name = '', id, size = 40 }) {
  const color = hashColor(id || name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.4,
        boxShadow: `0 8px 20px ${color}55`,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}
