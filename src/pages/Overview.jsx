import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { webinars, totals, SERIES } from '../data/webinars.js';
import { KpiCard } from '../components/KpiCard.jsx';
import { StatusBadge } from '../components/Badge.jsx';
import { Icon } from '../components/Icons.jsx';
import { Hero } from '../components/Hero.jsx';
import { Timeline } from '../components/Timeline.jsx';
import { Funnel } from '../components/Funnel.jsx';
import { Heatmap } from '../components/Heatmap.jsx';
import { ReachGlobe } from '../components/ReachGlobe.jsx';

function fmt(n) { return Number(n || 0).toLocaleString(); }
function pct(n) { return `${(Number(n) || 0).toFixed(1)}%`; }

export default function Overview() {
  const t = totals();
  const series = webinars.map((w) => ({
    name: `#${w.id.split('-')[1]}`,
    registrations: w.registrations,
    attendees: w.attendees,
  }));

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Hero onExport={() => window.print()} />

      {/* Themes strip */}
      <div className="glass-card-static" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
        <div className="eyebrow">Themes</div>
        {SERIES.themes.map((th) => (
          <span key={th.name} className="badge" style={{ background: `${th.color}1A`, color: th.color }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: th.color }} /> {th.name}
          </span>
        ))}
      </div>

      {/* KPI row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1rem',
      }}>
        <KpiCard label="Webinars" value={t.webinarCount} meta={`${t.completedCount} completed · ${t.upcomingCount} upcoming`} accent="#0891B2" />
        <KpiCard label="Registrations" value={fmt(t.totalRegistrations)} meta="across all sessions" accent="#06B6D4" />
        <KpiCard label="Live Attendees" value={fmt(t.totalAttendees)} meta={`${pct(t.avgAttendanceRate)} avg attendance`} accent="#0E7490" />
        <KpiCard label="Replay Views" value={fmt(t.totalReplayViews)} meta="post-event reach" accent="#10B981" />
        <KpiCard label="Qualified Leads" value={fmt(t.totalLeads)} meta="captured via webinars" accent="#F59E0B" />
      </div>

      {/* Funnel + Calendar heatmap */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
        gap: '1.25rem',
      }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Conversion</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '1rem' }}>From sign-up to qualified lead</div>
          <Funnel />
        </div>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Cadence</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '1rem' }}>Webinars across the year</div>
          <Heatmap />

          <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: '1.25rem 0 1rem' }} />

          <div className="eyebrow">Engagement</div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <Mini label="Avg watch" value={`${t.avgWatchMin.toFixed(1)}m`} />
            <Mini label="Avg rating" value={`${t.avgRating.toFixed(1)} / 5`} />
            <Mini label="Attendance rate" value={pct(t.avgAttendanceRate)} />
          </div>
        </div>
      </div>

      {/* Reach + Series performance */}
      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div className="eyebrow">Geographic reach</div>
        <div className="h-section" style={{ marginTop: 4, marginBottom: '1rem' }}>Where the audience is tuning in from</div>
        <ReachGlobe />
      </div>

      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div className="eyebrow">Performance</div>
        <div className="h-section" style={{ marginTop: 4, marginBottom: '0.25rem' }}>Registrations vs. live attendees per webinar</div>
        <div style={{ width: '100%', height: 240, marginTop: '0.5rem' }}>
          <ResponsiveContainer>
            <AreaChart data={series} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="ov-reg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891B2" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ov-att" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface-card-elevated)', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="registrations" stroke="#0891B2" strokeWidth={2} fill="url(#ov-reg)" />
              <Area type="monotone" dataKey="attendees" stroke="#06B6D4" strokeWidth={2} fill="url(#ov-att)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Series journey timeline */}
      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div className="eyebrow">Series journey</div>
            <div className="h-section" style={{ marginTop: 4 }}>Every session, in order</div>
          </div>
          <Link to="/webinars" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Browse webinars <Icon.ArrowRight />
          </Link>
        </div>
        <Timeline />
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {label}
      </div>
      <div className="num-serif" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}
