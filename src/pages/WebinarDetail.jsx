import { Link, useNavigate, useParams } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { byId } from '../data/webinars.js';
import { KpiCard } from '../components/KpiCard.jsx';
import { StatusBadge, TagPill } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon } from '../components/Icons.jsx';

const PIE = ['#7C3AED', '#0EA5E9', '#10B981', '#F59E0B', '#F472B6', '#8B5CF6', '#06B6D4', '#EF4444'];

function fmt(n) { return Number(n || 0).toLocaleString(); }
function pct(n) { return `${(Number(n) || 0).toFixed(1)}%`; }

export default function WebinarDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const w = byId(id);

  if (!w) {
    return (
      <div className="glass-card-static" style={{ padding: '2rem' }}>
        <div className="h-section">Webinar not found</div>
        <p style={{ color: 'var(--text-muted)' }}>
          No webinar with id <span className="mono">{id}</span>.
        </p>
        <Link to="/webinars" className="btn-primary" style={{ textDecoration: 'none' }}>Back to webinars</Link>
      </div>
    );
  }

  const attendanceRate = w.registrations ? (w.attendees / w.registrations) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <button className="btn-ghost" onClick={() => nav(-1)} style={{ alignSelf: 'flex-start' }}>
        <Icon.ChevronLeft /> Back
      </button>

      {/* Header card */}
      <div className="glass-card-static" style={{ padding: '1.4rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{w.id}</span>
              <StatusBadge status={w.status} />
            </div>
            <h1 className="h-page" style={{ margin: 0 }}>{w.title}</h1>
            <div style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: '0.95rem' }}>{w.topic}</div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.85rem', flexWrap: 'wrap',
              color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon.Calendar size={14} /> {w.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon.Clock /> {w.time} · {w.durationMin} min
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon.MapPin /> {w.platform}
              </span>
            </div>
            {!!(w.tags && w.tags.length) && (
              <div style={{ display: 'flex', gap: 4, marginTop: '0.8rem', flexWrap: 'wrap' }}>
                {w.tags.map((t) => <TagPill key={t} color="#7C3AED">{t}</TagPill>)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}>
        <KpiCard label="Registrations" value={fmt(w.registrations)} accent="#7C3AED" />
        <KpiCard label="Live Attendees" value={fmt(w.attendees)} meta={pct(attendanceRate) + ' attendance'} accent="#0EA5E9" />
        <KpiCard label="Replay Views" value={fmt(w.replayViews)} accent="#10B981" />
        <KpiCard label="Avg Watch" value={`${(w.avgWatchMin || 0).toFixed(1)}m`} accent="#F59E0B" />
        <KpiCard label="Rating" value={`${(w.rating || 0).toFixed(1)} / 5`} accent="#F472B6" />
        <KpiCard label="Leads" value={fmt(w.leads)} accent="#6366F1" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        {/* Registration trajectory */}
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Registrations</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Build-up over time</div>
          {w.registrationsByDay && w.registrationsByDay.length > 0 ? (
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <AreaChart data={w.registrationsByDay} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reg-d" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#0EA5E9" strokeWidth={2} fill="url(#reg-d)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Empty label="No daily registration data yet" />
          )}
        </div>

        {/* Industry / audience distribution */}
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Audience</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Industry mix</div>
          {w.industries && w.industries.length > 0 ? (
            <>
              <div style={{ width: '100%', height: 180 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={w.industries} dataKey="count" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                      {w.industries.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.75rem', marginTop: '0.5rem' }}>
                {w.industries.map((it, i) => (
                  <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: PIE[i % PIE.length] }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{it.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{fmt(it.count)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Empty label="No industry breakdown yet" />
          )}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        {/* Speakers */}
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Speakers</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.85rem' }}>On stage</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {w.speakers.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Avatar name={s.name} id={s.name + i} size={44} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {[s.title, s.company].filter(Boolean).join(' · ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top countries */}
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Reach</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Top countries</div>
          {w.countries && w.countries.length > 0 ? (
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={w.countries} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(15,23,42,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  <Bar dataKey="count" fill="#7C3AED" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Empty label="No country data yet" />
          )}
        </div>
      </div>

      {/* Summary + engagement */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
        gap: '1.25rem',
      }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Summary</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>About this session</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55, margin: 0 }}>
            {w.summary}
          </p>
        </div>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Engagement</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.85rem' }}>Live interaction</div>
          <Row label="Questions in Q&A" value={fmt(w.questions)} />
          <Row label="Poll responses" value={fmt(w.pollResponses)} />
          <Row label="Avg watch (min)" value={(w.avgWatchMin || 0).toFixed(1)} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '0.6rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: '0.88rem',
    }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function Empty({ label }) {
  return (
    <div style={{
      padding: '2rem 1rem',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.85rem',
    }}>
      {label}
    </div>
  );
}
