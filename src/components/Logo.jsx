// Wipro Water droplet mark — cyan gradient drop with a soft inner highlight.
export function Logo({ size = 44, rounded = 14 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 60%, #0E7490 100%)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 22px rgba(8,145,178,0.40), inset 0 1px 0 rgba(255,255,255,0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
        <defs>
          <linearGradient id="drop-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M12 3c-3.4 4.4-6 7-6 11a6 6 0 0012 0c0-4-2.6-6.6-6-11z"
          fill="url(#drop-fill)"
        />
        <path
          d="M9 14.5c0 2 1.4 3.5 3 3.5"
          stroke="#0891B2"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
