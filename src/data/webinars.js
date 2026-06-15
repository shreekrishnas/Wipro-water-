// ─────────────────────────────────────────────────────────────────────────────
//  WIPRO WATER · WEBINAR DATA · SINGLE SOURCE OF TRUTH
// ─────────────────────────────────────────────────────────────────────────────
//
//  Drop your real webinar details into the array below - every page in the
//  dashboard (overview, list, detail, charts, KPIs) re-renders from this file.
//
//  Each webinar follows the shape:
//
//    {
//      id:           "WEB-001",            // stable id
//      title:        "...",                // webinar title
//      topic:        "...",                // short topic / tagline
//      date:         "2025-04-18",         // ISO date (YYYY-MM-DD)
//      time:         "15:00",              // 24h HH:MM (local)
//      durationMin:  60,                   // minutes
//      status:       "completed",          // completed | upcoming | cancelled
//      platform:     "Zoom",               // Zoom / Teams / GoToWebinar / ...
//      registrations: 0,                   // # registered
//      attendees:     0,                   // # actually attended (live)
//      replayViews:   0,                   // # post-event replay views
//      avgWatchMin:   0,                   // average watch time (min)
//      rating:        0,                   // 0–5
//      leads:         0,                   // qualified leads captured
//      speakers: [
//        { name: "", title: "", company: "Wipro Water", avatar: "" }
//      ],
//      summary:      "",                   // 2–3 sentence description
//      tags:         ["industrial", "ZLD"],
//      registrationsByDay: [               // optional, for the chart
//        { day: "-14", count: 0 }, ...     // days-from-event
//      ],
//      countries: [                        // optional, top countries
//        { name: "India", count: 0 }, ...
//      ],
//      industries: [                       // optional, attendee distribution
//        { name: "Manufacturing", count: 0 }, ...
//      ],
//      questions: 0,                       // Q&A questions asked
//      pollResponses: 0,                   // poll responses
//
//      // ── Editorial / brand fields (optional but recommended) ──
//      theme:           "ZLD",             // matches SERIES.themes
//      coverGradient:   ["#0891B2", "#06B6D4"], // two-stop hero gradient
//      coverImage:      "",                // optional URL; falls back to gradient
//      whyItMatters:    "",                // 2-sentence framing tied to Wipro Water
//      keyTakeaways:    ["", "", ""],      // 3 bullet pull-quotes
//      replayUrl:       "",                // YouTube/Vimeo embed URL
//      slidesUrl:       "",                // PDF / slide deck link
//      qaHighlights:    [                  // representative Q&A
//        { q: "", a: "" },
//      ],
//      testimonial:     { quote: "", author: "", role: "" },
//    }
//
// ─────────────────────────────────────────────────────────────────────────────

export const ACCOUNT = {
  name: "Wipro Water",
  tagline: "Webinar Series · 2025",
  brandColor: "#0891B2",        // cyan-700 - water depth
  brandColorSoft: "#06B6D4",    // cyan-500 - surface ripple
  brandColorDeep: "#0E7490",    // cyan-800
  gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)",
};

export const SERIES = {
  title: "The Wipro Water Webinar Series",
  kicker: "Conversations on sustainable industrial water",
  mission:
    "A monthly conversation with leaders shaping the future of industrial water - covering zero-liquid discharge, reuse, digital water, ESG and the engineering behind clean operations.",
  themes: [
    { name: "Zero Liquid Discharge", color: "#0891B2" },
    { name: "Water Reuse & Recycle", color: "#06B6D4" },
    { name: "Digital & Smart Water", color: "#6366F1" },
    { name: "ESG & Sustainability",  color: "#10B981" },
    { name: "Process Industry",      color: "#F59E0B" },
  ],
};

const COVER_PALETTE = [
  ["#0891B2", "#06B6D4"], // cyan ZLD
  ["#0E7490", "#0891B2"], // teal reuse
  ["#6366F1", "#06B6D4"], // indigo→cyan digital
  ["#10B981", "#06B6D4"], // emerald ESG
  ["#0EA5E9", "#0891B2"], // sky
  ["#F59E0B", "#06B6D4"], // amber process
  ["#8B5CF6", "#0891B2"], // violet
  ["#06B6D4", "#0E7490"], // cyan deep
  ["#0891B2", "#10B981"], // cyan→emerald
];
const THEME_CYCLE = [
  "Zero Liquid Discharge",
  "Water Reuse & Recycle",
  "Digital & Smart Water",
  "ESG & Sustainability",
  "Process Industry",
];

const _webinars = [
  {
    id: "WEB-001",
    title: "Driving Sustainability with Zero Liquid Discharge (ZLD) Technology",
    topic: "How ZLD closes the loop on industrial wastewater",
    date: "2024-11-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Zero Liquid Discharge",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 4,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Opening session of the series - an introduction to ZLD as a strategy for industries facing tightening discharge norms.",
    tags: ["ZLD", "Sustainability"],
  },
  {
    id: "WEB-002",
    title: "How Effective O&M Practices Can Maximize Efficiency and Minimize Costs",
    topic: "Operations & maintenance best-practices for water treatment plants",
    date: "2025-01-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Process Industry",
    registrations: 219,
    attendees: 89,
    replayViews: 0,
    avgWatchMin: 35,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Practical playbook for plant operators on uptime, energy efficiency, and life-cycle cost control.",
    tags: ["O&M", "Efficiency"],
  },
  {
    id: "WEB-003",
    title: "Industrial Water Treatment Strategies for Achieving Sustainable Development Goals",
    topic: "Aligning plant water strategy with the SDGs",
    date: "2025-04-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "ESG & Sustainability",
    registrations: 247,
    attendees: 113,
    replayViews: 0,
    avgWatchMin: 36 + 21 / 60,
    rating: 0,
    leads: 6,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Mapping industrial water programmes to UN SDG 6 and beyond - what gets measured, what gets funded.",
    tags: ["SDG", "ESG"],
  },
  {
    id: "WEB-004",
    title: "Discover How Retrofitting Can Enhance Environmental Compliance, Increase Capacity, And Advance Technology With Minimal Capex",
    topic: "Retrofits that pay for themselves",
    date: "2025-05-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Process Industry",
    registrations: 150,
    attendees: 81,
    replayViews: 0,
    avgWatchMin: 58 + 51 / 60,
    rating: 0,
    leads: 8,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Case studies on extending existing assets - compliance gains, debottlenecking, and modern instrumentation without greenfield spend.",
    tags: ["Retrofit", "Compliance", "CapEx"],
  },
  {
    id: "WEB-005",
    title: "Ultrapure Water Generation & Distribution in the Solar Industry",
    topic: "UPW for photovoltaic & semiconductor-grade manufacturing",
    date: "2025-06-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Process Industry",
    registrations: 137,
    attendees: 69,
    replayViews: 0,
    avgWatchMin: 38 + 24 / 60,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "What it takes to produce and deliver ultrapure water at solar-grade specs, including loop design and resistivity targets.",
    tags: ["UPW", "Solar"],
  },
  {
    id: "WEB-006",
    title: "Effluent Treatment for Sustainable Tomorrow",
    topic: "Modern ETP design for industrial discharge",
    date: "2025-07-15",
    time: "15:00",
    durationMin: 75,
    status: "completed",
    platform: "Zoom",
    theme: "Water Reuse & Recycle",
    registrations: 255,
    attendees: 107,
    replayViews: 0,
    avgWatchMin: 60 + 1 + 37 / 60,
    rating: 0,
    leads: 5,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "A deep-dive on effluent treatment plant design choices and operating models that keep industries compliant and competitive.",
    tags: ["ETP", "Effluent"],
  },
  {
    id: "WEB-007",
    title: "Effluent Treatment for Sustainable Tomorrow - Series 2",
    topic: "Effluent treatment, continued: advanced processes & reuse",
    date: "2025-09-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Water Reuse & Recycle",
    registrations: 279,
    attendees: 113,
    replayViews: 0,
    avgWatchMin: 50 + 59 / 60,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Follow-up to the July session - advanced oxidation, polishing trains, and water reuse strategies for industrial sites.",
    tags: ["ETP", "Reuse"],
  },
  {
    id: "WEB-008",
    title: "Next-Generation Wastewater Treatment: The Role of Membrane Bioreactors",
    topic: "MBR systems for high-quality reuse-ready effluent",
    date: "2025-12-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    theme: "Water Reuse & Recycle",
    registrations: 234,
    attendees: 101,
    replayViews: 0,
    avgWatchMin: 57 + 10 / 60,
    rating: 0,
    leads: 3,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Why MBRs are becoming the default for new industrial wastewater builds - footprint, effluent quality, and operating envelope.",
    tags: ["MBR", "Wastewater"],
  },
  {
    id: "WEB-009",
    title: "Webinar 9 - Pending",
    topic: "Details to be confirmed",
    date: "2026-03-15",
    time: "15:00",
    durationMin: 60,
    status: "upcoming",
    platform: "Zoom",
    theme: "Digital & Smart Water",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Placeholder for the 9th session - share the title and stats whenever ready and this card refreshes automatically.",
    tags: [],
  },
];

// Auto-decorate every webinar with a default coverGradient & theme so the
// UI looks alive even before you fill in editorial fields. Anything you set
// explicitly on the webinar object wins.
export const webinars = _webinars.map((w, i) => ({
  coverGradient: COVER_PALETTE[i % COVER_PALETTE.length],
  theme: THEME_CYCLE[i % THEME_CYCLE.length],
  whyItMatters: "",
  keyTakeaways: [],
  replayUrl: "",
  slidesUrl: "",
  qaHighlights: [],
  testimonial: null,
  ...w,
}));

// ─────────────────────────────────────────────────────────────────────────────
//  Derived aggregates - consumed by the Overview page. Do not edit by hand;
//  they recompute on every render from the array above.
// ─────────────────────────────────────────────────────────────────────────────

export const totals = () => {
  const sum = (key) => webinars.reduce((a, w) => a + (Number(w[key]) || 0), 0);
  const completed = webinars.filter((w) => w.status === "completed");
  const avg = (key) => {
    const c = completed.filter((w) => Number(w[key]) > 0);
    if (!c.length) return 0;
    return c.reduce((a, w) => a + Number(w[key]), 0) / c.length;
  };
  return {
    webinarCount: webinars.length,
    completedCount: completed.length,
    upcomingCount: webinars.filter((w) => w.status === "upcoming").length,
    totalRegistrations: sum("registrations"),
    totalAttendees: sum("attendees"),
    totalReplayViews: sum("replayViews"),
    totalLeads: sum("leads"),
    avgAttendanceRate:
      sum("registrations") > 0
        ? (sum("attendees") / sum("registrations")) * 100
        : 0,
    avgWatchMin: avg("avgWatchMin"),
    avgRating: avg("rating"),
  };
};

export const byId = (id) => webinars.find((w) => w.id === id);
