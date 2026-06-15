import { useMemo } from 'react';
import { webinars } from '../data/webinars.js';

// Stylized "reach" visual: a translucent globe with country pins. Not a real
// projection - designed to look beautiful with very small datasets.
//
// If your country list grows, we can wire react-simple-maps for a real world
// map; for 9 webinars this reads cleaner.

// Approximate {x, y} positions on a 100×100 grid for common countries.
const COORDS = {
  India:        { x: 70, y: 55 },
  USA:          { x: 22, y: 42 },
  UK:           { x: 47, y: 32 },
  Germany:      { x: 51, y: 35 },
  France:       { x: 49, y: 38 },
  UAE:          { x: 62, y: 50 },
  'Saudi Arabia': { x: 60, y: 52 },
  Singapore:    { x: 78, y: 64 },
  Japan:        { x: 87, y: 44 },
  Australia:    { x: 85, y: 78 },
  Brazil:       { x: 32, y: 70 },
  Canada:       { x: 22, y: 28 },
  China:        { x: 80, y: 46 },
  Indonesia:    { x: 80, y: 70 },
  'South Africa': { x: 54, y: 78 },
  Vietnam:      { x: 77, y: 58 },
  Thailand:     { x: 76, y: 60 },
  Mexico:       { x: 18, y: 55 },
};

export function ReachGlobe() {
  const countries = useMemo(() => {
    const map = new Map();
    for (const w of webinars) {
      for (const c of (w.countries || [])) {
        map.set(c.name, (map.get(c.name) || 0) + (Number(c.count) || 0));
      }
    }
    const arr = [...map.entries()].map(([name, count]) => ({ name, count }));
    return arr.sort((a, b) => b.count - a.count);
  }, []);

  const max = countries[0]?.count || 1;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '1.25rem', alignItems: 'center' }}>
      <svg viewBox="0 0 100 100" width="100%" style={{ maxHeight: 320 }}>
        <defs>
          <radialGradient id="globe-fill" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0E7490" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="pin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="url(#globe-fill)" stroke="rgba(8,145,178,0.35)" strokeWidth="0.4" />
        {/* meridians */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`m${i}`} cx="50" cy="50" rx={42 - i * 12} ry="42" fill="none"
            stroke="rgba(8,145,178,0.18)" strokeWidth="0.25" />
        ))}
        {/* parallels */}
        {[-2, -1, 0, 1, 2].map((i) => (
          <ellipse key={`p${i}`} cx="50" cy={50 + i * 10} rx="42" ry={Math.max(2, 42 - Math.abs(i) * 12)}
            fill="none" stroke="rgba(8,145,178,0.18)" strokeWidth="0.25" />
        ))}
        {/* pins */}
        {countries.map((c) => {
          const pos = COORDS[c.name];
          if (!pos) return null;
          const r = 1 + (c.count / max) * 2.6;
          return (
            <g key={c.name}>
              <circle cx={pos.x} cy={pos.y} r={r + 1.5} fill="url(#pin)" opacity="0.25" />
              <circle cx={pos.x} cy={pos.y} r={r} fill="url(#pin)">
                <title>{c.name}: {c.count.toLocaleString()}</title>
              </circle>
            </g>
          );
        })}
      </svg>

      <div>
        <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>Top countries</div>
        {countries.length === 0 && (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No country data yet - add to <span className="mono">countries</span> on each webinar.
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: 280, overflow: 'auto' }}>
          {countries.slice(0, 8).map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, minWidth: 110,
              }}>{c.name}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--surface-hover)', overflow: 'hidden' }}>
                <div style={{
                  width: `${(c.count / max) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #06B6D4, #0891B2)',
                }} />
              </div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: 36, textAlign: 'right' }}>
                {c.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
