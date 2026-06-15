import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { webinars } from '../data/webinars.js';

function fmt(n) { return Number(n || 0).toLocaleString(); }

export default function Insights() {
  const byNumber = webinars.map((w) => {
    const n = w.id.split('-')[1];
    return {
      name: `#${n}`,
      title: w.title,
      registrations: w.registrations,
      attendees: w.attendees,
      replayViews: w.replayViews,
      attendanceRate: w.registrations ? (w.attendees / w.registrations) * 100 : 0,
      rating: w.rating,
      leads: w.leads,
      avgWatchMin: w.avgWatchMin,
    };
  });

  const best = [...byNumber].sort((a, b) => b.attendees - a.attendees).slice(0, 3);

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div className="eyebrow">Comparison</div>
        <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Attendance & replay views by webinar</div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={byNumber} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
              <Bar dataKey="attendees" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              <Bar dataKey="replayViews" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Trend</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Attendance rate over series</div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={byNumber} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                <Line type="monotone" dataKey="attendanceRate" stroke="#10B981" strokeWidth={2.4} dot={{ r: 3, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Quality</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Rating & lead capture</div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={byNumber} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="r" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <YAxis yAxisId="l" orientation="right" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                <Line yAxisId="r" type="monotone" dataKey="rating" stroke="#F59E0B" strokeWidth={2.4} dot={{ r: 3 }} />
                <Line yAxisId="l" type="monotone" dataKey="leads" stroke="#7C3AED" strokeWidth={2.4} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div className="eyebrow">Highlights</div>
        <div className="h-section" style={{ marginTop: 4, marginBottom: '0.75rem' }}>Top-performing sessions by live attendance</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {best.map((w, i) => (
            <div key={w.name} style={{
              padding: '1rem',
              borderRadius: '1rem',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <span style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                background: ['#7C3AED', '#0EA5E9', '#10B981'][i],
              }} />
              <div className="eyebrow" style={{ marginBottom: 4 }}>Rank #{i + 1}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{w.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
                {fmt(w.attendees)} attendees · {w.attendanceRate.toFixed(1)}% rate
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
