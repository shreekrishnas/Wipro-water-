import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { webinars, totals } from '../data/webinars.js';
import { KpiCard } from '../components/KpiCard.jsx';

const PIE = ['#7C3AED', '#0EA5E9', '#10B981', '#F59E0B', '#F472B6', '#8B5CF6', '#06B6D4', '#EF4444'];

function fmt(n) { return Number(n || 0).toLocaleString(); }

function aggregate(key) {
  const map = new Map();
  for (const w of webinars) {
    for (const item of (w[key] || [])) {
      map.set(item.name, (map.get(item.name) || 0) + (Number(item.count) || 0));
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export default function Audience() {
  const t = totals();
  const countries = useMemo(() => aggregate('countries'), []);
  const industries = useMemo(() => aggregate('industries'), []);

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1rem',
      }}>
        <KpiCard label="Total Registered" value={fmt(t.totalRegistrations)} accent="#7C3AED" />
        <KpiCard label="Total Attended" value={fmt(t.totalAttendees)} accent="#0EA5E9" />
        <KpiCard label="Attendance Rate" value={`${t.avgAttendanceRate.toFixed(1)}%`} accent="#10B981" />
        <KpiCard label="Replay Viewers" value={fmt(t.totalReplayViews)} accent="#F59E0B" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Geography</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Top countries (all webinars)</div>
          {countries.length ? (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={countries} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(15,23,42,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  <Bar dataKey="count" fill="#0EA5E9" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Empty />
          )}
        </div>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Verticals</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Industry distribution</div>
          {industries.length ? (
            <>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={industries} dataKey="count" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                      {industries.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 0.75rem', marginTop: '0.6rem' }}>
                {industries.map((it, i) => (
                  <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: PIE[i % PIE.length] }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{it.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{fmt(it.count)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      No data yet - fill <span className="mono">countries</span> / <span className="mono">industries</span> on each webinar.
    </div>
  );
}
