import { Link, useNavigate, useParams } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { byId, SERIES } from '../data/webinars.js';
import { KpiCard } from '../components/KpiCard.jsx';
import { StatusBadge, TagPill } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon } from '../components/Icons.jsx';

const PIE = ['#0891B2', '#06B6D4', '#0E7490', '#10B981', '#F59E0B', '#8B5CF6', '#F472B6', '#6366F1'];

function fmt(n) { return Number(n || 0).toLocaleString(); }
function pct(n) { return `${(Number(n) || 0).toFixed(1)}%`; }
function themeColor(theme) {
  const t = SERIES.themes.find((x) => x.name === theme);
  return t?.color || '#0891B2';
}

function embedUrl(url) {
  if (!url) return '';
  // youtube
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  // vimeo
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

export default function WebinarDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const w = byId(id);

  if (!w) {
    return (
      <div className="glass-card-static" style={{ padding: '2rem' }}>
        <div className="h-section">Webinar not found</div>
        <p style={{ color: 'var(--text-muted)' }}>No webinar with id <span className="mono">{id}</span>.</p>
        <Link to="/webinars" className="btn-primary" style={{ textDecoration: 'none' }}>Back to webinars</Link>
      </div>
    );
  }

  const attendanceRate = w.registrations ? (w.attendees / w.registrations) * 100 : 0;
  const tColor = themeColor(w.theme);
  const [c1, c2] = w.coverGradient || [tColor, tColor];
  const embed = embedUrl(w.replayUrl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-ghost" onClick={() => nav(-1)}>
          <Icon.ChevronLeft /> Back
        </button>
        <button className="btn-secondary" onClick={() => window.print()} style={{ marginLeft: 'auto' }}>
          Export PDF
        </button>
      </div>

      {/* Cover hero */}
      <div
        style={{
          borderRadius: '1.5rem',
          overflow: 'hidden',
          padding: '1.75rem 2rem',
          color: '#fff',
          background: w.coverImage
            ? `linear-gradient(135deg, ${c1}AA, ${c2}AA), url(${w.coverImage}) center/cover`
            : `linear-gradient(135deg, ${c1}, ${c2})`,
          boxShadow: `0 12px 36px ${c1}55`,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', border: '1px solid rgba(255,255,255,0.30)' }}>
            {w.theme}
          </span>
          <span className="mono" style={{ fontSize: '0.7rem', opacity: 0.85 }}>{w.id}</span>
          <StatusBadge status={w.status} />
        </div>
        <h1 style={{
          margin: 0,
          fontFamily: 'Fraunces, ui-serif, Georgia, serif',
          fontWeight: 800,
          fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>{w.title}</h1>
        <div style={{ opacity: 0.92, marginTop: 8, fontSize: '0.95rem' }}>{w.topic}</div>
        <div style={{ display: 'flex', gap: '1.1rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.95 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.Calendar size={14} /> {w.date}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.Clock /> {w.time} · {w.durationMin} min</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.MapPin /> {w.platform}</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <KpiCard label="Registrations" value={fmt(w.registrations)} accent="#0891B2" />
        <KpiCard label="Live Attendees" value={fmt(w.attendees)} meta={pct(attendanceRate) + ' attendance'} accent="#06B6D4" />
        <KpiCard label="Replay Views" value={fmt(w.replayViews)} accent="#10B981" />
        <KpiCard label="Avg Watch" value={`${(w.avgWatchMin || 0).toFixed(1)}m`} accent="#F59E0B" />
        <KpiCard label="Rating" value={`${(w.rating || 0).toFixed(1)} / 5`} accent="#F472B6" />
        <KpiCard label="Leads" value={fmt(w.leads)} accent="#6366F1" />
      </div>

      {/* Why it matters + Key takeaways */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '1.25rem' }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Why it matters</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Wipro Water angle</div>
          {w.whyItMatters ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.6, margin: 0 }}>
              {w.whyItMatters}
            </p>
          ) : (
            <Empty label="Add a 2-sentence framing in the data file." />
          )}
        </div>

        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Key takeaways</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>What the audience walked away with</div>
          {w.keyTakeaways && w.keyTakeaways.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {w.keyTakeaways.map((t, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--surface-hover)',
                  borderLeft: `3px solid ${tColor}`,
                  borderRadius: '0.625rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: tColor, fontWeight: 800, fontFamily: 'Fraunces, serif', minWidth: 18 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          ) : (
            <Empty label="Add 3 key takeaways once available." />
          )}
        </div>
      </div>

      {/* Replay + Q&A */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '1.25rem' }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Replay</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.75rem' }}>Watch on-demand</div>
          {embed ? (
            <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '1rem', overflow: 'hidden', background: '#000' }}>
              <iframe
                src={embed}
                title="Replay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          ) : (
            <div style={{
              aspectRatio: '16/9',
              borderRadius: '1rem',
              background: `linear-gradient(135deg, ${c1}, ${c2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              fontWeight: 600,
              opacity: 0.95,
            }}>
              Add a YouTube / Vimeo URL to <span className="mono" style={{ margin: '0 6px' }}>replayUrl</span>
            </div>
          )}
          {w.slidesUrl && (
            <a href={w.slidesUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', marginTop: '0.85rem' }}>
              Download slides <Icon.ArrowRight />
            </a>
          )}
        </div>

        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Q&amp;A highlights</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.75rem' }}>From the audience</div>
          {w.qaHighlights && w.qaHighlights.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {w.qaHighlights.map((qa, i) => (
                <div key={i} style={{
                  padding: '0.75rem 0.9rem',
                  borderRadius: '0.7rem',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    Q. {qa.q}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    A. {qa.a}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty label="Add a few Q&A pairs once curated." />
          )}
        </div>
      </div>

      {/* Speakers + Testimonial + Audience */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem' }}>
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

        {w.testimonial?.quote ? (
          <div className="glass-card-static" style={{
            padding: '1.5rem',
            background: `linear-gradient(135deg, ${c1}15, ${c2}10)`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 12, right: 18, fontSize: '3rem',
              fontFamily: 'Fraunces, serif', color: tColor, opacity: 0.25, lineHeight: 1,
            }}>“</div>
            <div className="eyebrow">Attendee voice</div>
            <blockquote style={{
              margin: '0.6rem 0 0', fontFamily: 'Fraunces, ui-serif, Georgia, serif',
              fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 600,
            }}>
              "{w.testimonial.quote}"
            </blockquote>
            <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              - {w.testimonial.author}{w.testimonial.role ? `, ${w.testimonial.role}` : ''}
            </div>
          </div>
        ) : (
          <div className="glass-card-static" style={{ padding: '1.25rem' }}>
            <div className="eyebrow">Industry mix</div>
            <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Who attended</div>
            {w.industries && w.industries.length ? (
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
        )}
      </div>

      {/* Registration curve + Countries */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '1.25rem' }}>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Registrations</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Build-up over time</div>
          {w.registrationsByDay && w.registrationsByDay.length > 0 ? (
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <AreaChart data={w.registrationsByDay} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reg-d" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={tColor} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={tColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke={tColor} strokeWidth={2} fill="url(#reg-d)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : <Empty label="No daily registration data yet" />}
        </div>
        <div className="glass-card-static" style={{ padding: '1.25rem' }}>
          <div className="eyebrow">Reach</div>
          <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>Top countries</div>
          {w.countries && w.countries.length ? (
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={w.countries} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(15,23,42,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(15,23,42,0.08)', fontSize: 12 }} />
                  <Bar dataKey="count" fill={tColor} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : <Empty label="No country data yet" />}
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card-static" style={{ padding: '1.25rem' }}>
        <div className="eyebrow">Summary</div>
        <div className="h-section" style={{ marginTop: 4, marginBottom: '0.5rem' }}>About this session</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
          {w.summary}
        </p>
      </div>
    </div>
  );
}

function Empty({ label }) {
  return (
    <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'var(--surface-hover)', borderRadius: '0.75rem' }}>
      {label}
    </div>
  );
}
