import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { ACCOUNT } from '../data/webinars.js';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('wipro-theme') || 'light';
  });
  useEffect(() => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('wipro-theme', theme);
  }, [theme]);
  return [theme, setTheme];
}

const NAV = [
  { to: '/',         label: 'Overview',  icon: Icon.Home },
  { to: '/webinars', label: 'Webinars',  icon: Icon.Calendar },
  { to: '/speakers', label: 'Speakers',  icon: Icon.Mic },
  { to: '/audience', label: 'Audience',  icon: Icon.Users },
  { to: '/insights', label: 'Insights',  icon: Icon.Chart },
];

function PageTitle() {
  const { pathname } = useLocation();
  if (pathname === '/') return { eyebrow: 'Overview', title: 'Webinar performance at a glance' };
  if (pathname.startsWith('/webinars')) return { eyebrow: 'Webinars', title: 'All sessions' };
  if (pathname.startsWith('/speakers')) return { eyebrow: 'Speakers', title: 'Voices on stage' };
  if (pathname.startsWith('/audience')) return { eyebrow: 'Audience', title: 'Who showed up' };
  if (pathname.startsWith('/insights')) return { eyebrow: 'Insights', title: 'Cross-webinar trends' };
  return { eyebrow: '', title: '' };
}

export function Shell({ children }) {
  const [theme, setTheme] = useTheme();
  const t = PageTitle();
  const { pathname } = useLocation();

  return (
    <div className="app-outer">
      <div className="atmosphere" />
      <div className="app-shell">
        <div className="glass-panel">
          <aside className="sidebar">
            <div className="logo-mark" title={ACCOUNT.name}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-3.5 4.5-6 7-6 11a6 6 0 0012 0c0-4-2.5-6.5-6-11z" fill="rgba(255,255,255,0.95)" stroke="none" />
              </svg>
            </div>
            {NAV.map((n) => {
              const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to);
              const Ico = n.icon;
              return (
                <NavLink
                  key={n.to}
                  to={n.to}
                  data-tooltip={n.label}
                  className={`sidebar-item ${active ? 'active' : ''}`}
                >
                  <Ico />
                </NavLink>
              );
            })}
          </aside>

          <div className="app-content">
            <header className="topbar">
              <div>
                <div className="eyebrow" style={{ marginBottom: 2 }}>{t.eyebrow}</div>
                <div style={{
                  fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                }}>{t.title}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  className="pill-elevated"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border-subtle)', cursor: 'pointer',
                    color: 'var(--text-secondary)',
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
                </button>
                <div className="pill-elevated" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.35rem 0.85rem 0.35rem 0.35rem',
                  background: 'var(--surface-card)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${ACCOUNT.brandColor}, ${ACCOUNT.brandColor}CC)`,
                    color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 12,
                  }}>WW</div>
                  <div style={{ lineHeight: 1.15 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {ACCOUNT.name}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                      {ACCOUNT.tagline}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main className="app-main">
              <div className="page-enter">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
