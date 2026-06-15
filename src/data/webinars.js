// ─────────────────────────────────────────────────────────────────────────────
//  WIPRO WATER · WEBINAR DATA · SINGLE SOURCE OF TRUTH
// ─────────────────────────────────────────────────────────────────────────────
//
//  Drop your real webinar details into the array below — every page in the
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
  brandColor: "#0891B2",        // cyan-700 — water depth
  brandColorSoft: "#06B6D4",    // cyan-500 — surface ripple
  brandColorDeep: "#0E7490",    // cyan-800
  gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)",
};

export const SERIES = {
  title: "The Wipro Water Webinar Series",
  kicker: "Conversations on sustainable industrial water",
  mission:
    "A monthly conversation with leaders shaping the future of industrial water — covering zero-liquid discharge, reuse, digital water, ESG and the engineering behind clean operations.",
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
    title: "Webinar 1 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-01-15",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-002",
    title: "Webinar 2 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-02-12",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-003",
    title: "Webinar 3 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-03-19",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-004",
    title: "Webinar 4 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-04-23",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-005",
    title: "Webinar 5 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-05-21",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-006",
    title: "Webinar 6 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-06-18",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-007",
    title: "Webinar 7 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-07-16",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-008",
    title: "Webinar 8 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-08-20",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
  },
  {
    id: "WEB-009",
    title: "Webinar 9 — Title TBD",
    topic: "Topic placeholder",
    date: "2025-09-17",
    time: "15:00",
    durationMin: 60,
    status: "completed",
    platform: "Zoom",
    registrations: 0,
    attendees: 0,
    replayViews: 0,
    avgWatchMin: 0,
    rating: 0,
    leads: 0,
    speakers: [{ name: "Speaker TBD", title: "", company: "Wipro Water" }],
    summary: "Summary to be added once the dataset is shared.",
    tags: [],
    registrationsByDay: [],
    countries: [],
    industries: [],
    questions: 0,
    pollResponses: 0,
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
//  Derived aggregates — consumed by the Overview page. Do not edit by hand;
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
