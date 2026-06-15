// Inline-SVG icon set (§15). All use currentColor + stroke 2.
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Icon = {
  Home: (p) => (
    <svg {...base} width={p.size || 20} height={p.size || 20} {...p}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  Calendar: (p) => (
    <svg {...base} width={p.size || 20} height={p.size || 20} {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  ),
  Users: (p) => (
    <svg {...base} width={p.size || 20} height={p.size || 20} {...p}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M22 19c0-2.5-1.8-4.5-4-5" />
    </svg>
  ),
  Mic: (p) => (
    <svg {...base} width={p.size || 20} height={p.size || 20} {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </svg>
  ),
  Chart: (p) => (
    <svg {...base} width={p.size || 20} height={p.size || 20} {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 3 5-7" />
    </svg>
  ),
  Search: (p) => (
    <svg {...base} width={p.size || 18} height={p.size || 18} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  Sun: (p) => (
    <svg {...base} width={p.size || 18} height={p.size || 18} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  Moon: (p) => (
    <svg {...base} width={p.size || 18} height={p.size || 18} {...p}>
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg {...base} strokeWidth={2.3} width={p.size || 16} height={p.size || 16} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ChevronLeft: (p) => (
    <svg {...base} strokeWidth={2.3} width={p.size || 18} height={p.size || 18} {...p}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  Clock: (p) => (
    <svg {...base} width={p.size || 14} height={p.size || 14} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  MapPin: (p) => (
    <svg {...base} width={p.size || 14} height={p.size || 14} {...p}>
      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg {...base} width={p.size || 14} height={p.size || 14} {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={p.size || 14} height={p.size || 14} {...p}>
      <path d="M12 2l3 7 7 .6-5.3 4.6L18 22l-6-3.6L6 22l1.3-7.8L2 9.6 9 9z" />
    </svg>
  ),
};
