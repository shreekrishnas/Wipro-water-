import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { webinars, totals, ACCOUNT } from '../data/webinars.js';
import { KpiCard } from '../components/KpiCard.jsx';
import { StatusBadge } from '../components/Badge.jsx';
import { Icon } from '../components/Icons.jsx';

function fmt(n) { return Number(n || 0).toLocaleString(); }
function pct(n) { return `${(Number(n) || 0).toFixed(1)}%`; }

export default function Overview() {
  const t = totals();
  const series = webinars.map((w) => ({
    name: `#${w.id.split('-')[1]}`,
    registrations: w.registrations,
    attendees: w.attendees,
  }));
  const recent = [...webinars]
    .filter((w) => w.status === 'completed')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* KPI row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1rem',
      }}>
        <KpiCard label="Webinars" value={t.webinarCount} meta={`${t.completedCount} completed · ${t.upcomingCount} upcoming`} accent="#7C3AED" />
        <KpiCard label="Registrations" value={fmt(t.totalRegistrations)} meta="across all sessions" accent="#6366F1" />
        <KpiCard label="Live Attendees" value={fmt(t.totalAttendees)} meta={`${pct(t.avgAttendanceRate)} avg attendance`} accent="#0EA5E9" />
        <KpiCard label="Replay Views" value={fmt(t.totalReplayViews)} meta="post-event reach" accent="#10B981" />
        <KpiCard label="Qualified Leads" value={fmt(t.totalLeads)} meta="captured via webinars" accent="#F59E0B" />
      </div>

      {/* Charts row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <div>
              <div className="eyebrow">Reach per webinar</div>
              <div className="h-section" style={{ marginTop: 4 }}>Registrations vs. live attendees</div>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="reg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface-card-elevated)',
                    border: '1px solid rgba(15,23,42,0.08)',
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#7C3AED" strokeWidth={2} fill="url(#reg)" />
                <Area type="monotone" dataKey="attendees" stroke="#0EA5E9" strokeWidth={2} fill="url(#att)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Engagement</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.75rem' }}>Avg watch time</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <div className="num-serif" style={{ fontSize: '2.4rem', color: 'var(--text-primary)' }}>
              {t.avgWatchMin.toFixed(1)}
            </div>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>min</div>
          </div>
          <div style={{ marginTop: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Across completed sessions
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

          <div className="eyebrow">Satisfaction</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.75rem' }}>Average rating</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div className="num-serif" style={{ fontSize: '2.4rem', color: 'var(--text-primary)' }}>
              {t.avgRating.toFixed(1)}
            </div>
            <span style={{ color: '#F59E0B', display: 'inline-flex' }}><Icon.Star size={20} /></span>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>/ 5</div>
          </div>
        </div>
      </div>

      {/* Recent webinars */}
      <div className="glass-card-static" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.25rem',
        }}>
          <div>
            <div className="eyebrow">Recent</div>
            <div className="h-section" style={{ marginTop: 4 }}>Latest webinars</div>
          </div>
          <Link to="/webinars" className="btn-secondary" style={{ textDecoration: 'none' }}>
            View all <Icon.ArrowRight />
          </Link>
        </div>
        <div className="t-wrap">
          <table>
            <thead>
              <tr>
                <th>Webinar</th>
                <th>Date</th>
                <th>Registrations</th>
                <th>Attendees</th>
                <th>Rate</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((w) => {
                const rate = w.registrations ? (w.attendees / w.registrations) * 100 : 0;
                return (
                  <tr key={w.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{w.title}</div>
                      <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{w.id}</div>
                    </td>
                    <td>{w.date}</td>
                    <td>{fmt(w.registrations)}</td>
                    <td>{fmt(w.attendees)}</td>
                    <td>{pct(rate)}</td>
                    <td><StatusBadge status={w.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <Link to={`/webinars/${w.id}`} className="btn-ghost" style={{ textDecoration: 'none' }}>
                        Open <Icon.ArrowRight />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {!recent.length && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No completed webinars yet — drop your data into <span className="mono">src/data/webinars.js</span>.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
