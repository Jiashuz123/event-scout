import type { CoverageRequest } from "@/app/_lib/demo-store";

export const activeCoverageRequests: CoverageRequest[] = [
  {
    id: "mock-ai-infrastructure-demo-night",
    title: "AI Infrastructure Demo Night",
    eventName: "Frontier Builders SF",
    eventUrl: "https://example.com/frontier-builders-sf",
    city: "San Francisco",
    venue: "South Park Commons",
    date: "2026-07-16",
    budget: "$650 fixed fee",
    status: "scout_review",
    missionBrief:
      "Identify seed-stage infrastructure founders with developer traction and credible technical depth.",
    targetPeople:
      "Technical founders, developer relations leads, and organizers with visibility into standout teams.",
    targetCompanies:
      "AI observability, model evaluation, inference optimization, and developer workflow startups.",
    deliverables:
      "Structured report, ranked founder leads, permitted media, and permissioned warm introduction opportunities.",
    permittedMediaNotes:
      "Public demo tables only. Ask founders before capturing slides, product screens, or private conversations.",
    createdAt: "2026-06-27T16:00:00.000Z",
    applicants: 7,
    source: "mock",
  },
  {
    id: "mock-climate-hardware-founder-salon",
    title: "Climate Hardware Founder Salon",
    eventName: "Bay Area Climate Week",
    eventUrl: "https://example.com/bay-area-climate-week",
    city: "Oakland",
    venue: "Oakland Climate Lab",
    date: "2026-07-22",
    budget: "$800 fixed fee",
    status: "booked",
    missionBrief:
      "Find founders building manufacturing, grid, or industrial decarbonization companies.",
    targetPeople:
      "Hardware founders, industrial operators, climate investors, and technical advisors.",
    targetCompanies:
      "Grid resilience, industrial heat, manufacturing automation, and carbon accounting hardware companies.",
    deliverables:
      "Structured report, 6 company profiles, permitted media, and investor follow-up recommendations.",
    permittedMediaNotes:
      "Confirm permission before photographing prototypes or facility diagrams.",
    createdAt: "2026-06-26T18:30:00.000Z",
    applicants: 3,
    source: "mock",
  },
  {
    id: "mock-nyc-fintech-operator-meetup",
    title: "NYC Fintech Operator Meetup",
    eventName: "Empire Fintech Forum",
    eventUrl: "https://example.com/empire-fintech-forum",
    city: "New York",
    venue: "Union Square Ventures event space",
    date: "2026-08-05",
    budget: "$575 fixed fee",
    status: "draft",
    missionBrief:
      "Capture operator-led fintech startups with bank partnerships or compliance automation angles.",
    targetPeople:
      "Former fintech operators, bank partnership leads, compliance founders, and seed-stage CEOs.",
    targetCompanies:
      "Regtech, payments infrastructure, lending workflow, and embedded finance companies.",
    deliverables:
      "Structured report, lead list, target company summary, and suggested follow-up messages.",
    permittedMediaNotes:
      "No private attendee list capture. Public stage and sponsor booth media only.",
    createdAt: "2026-06-25T20:15:00.000Z",
    applicants: 0,
    source: "mock",
  },
];

export const scoutApplicants = [
  {
    name: "Maya Chen",
    city: "San Francisco",
    fit: "AI infra, devtools, founder interviewing",
    rate: "$650",
    status: "Available",
  },
  {
    name: "Andre Wallace",
    city: "Oakland",
    fit: "Climate tech, hardware demos, technical summaries",
    rate: "$775",
    status: "Pending reply",
  },
  {
    name: "Priya Raman",
    city: "New York",
    fit: "Fintech, enterprise SaaS, warm intro mapping",
    rate: "$600",
    status: "Shortlisted",
  },
];

export const recentReports = [
  {
    title: "Robotics Investor Night",
    scout: "Noah Kim",
    delivered: "Delivered June 24, 2026",
    summary: "11 founder leads, 4 strong follow-ups, 18 permitted media items",
  },
  {
    title: "Healthcare AI Breakfast",
    scout: "Elena Ortiz",
    delivered: "Delivered June 18, 2026",
    summary: "8 company profiles, 3 intro opportunities, compliance notes included",
  },
];

export const openScoutRequests: CoverageRequest[] = [
  activeCoverageRequests[0],
  {
    id: "mock-pre-seed-robotics-showcase",
    title: "Pre-seed Robotics Showcase",
    eventName: "Pre-seed Robotics Showcase",
    eventUrl: "https://example.com/pre-seed-robotics-showcase",
    city: "Boston",
    venue: "Kendall Hardware Lab",
    date: "2026-07-29",
    budget: "$700 fixed fee",
    status: "open",
    missionBrief:
      "Evaluate early robotics teams for technical credibility, customer pull, and ability to ship hardware on tight cycles.",
    targetPeople:
      "Robotics founders, technical leads, hardware operators, and demo table organizers.",
    targetCompanies:
      "Pre-seed robotics startups working on warehouse automation, inspection, defense-adjacent tools, and manufacturing workflows.",
    deliverables:
      "Structured report, team signal summary, 5 founder profiles, permitted media, and recommended investor follow-ups.",
    permittedMediaNotes:
      "Ask before photographing prototypes, demo rigs, or screens. Do not capture private customer discussions.",
    createdAt: "2026-06-24T15:00:00.000Z",
    applicants: 0,
    source: "mock",
  },
  {
    id: "mock-b2b-saas-operator-summit",
    title: "B2B SaaS Operator Summit",
    eventName: "B2B SaaS Operator Summit",
    eventUrl: "https://example.com/b2b-saas-operator-summit",
    city: "Austin",
    venue: "Capital Factory",
    date: "2026-08-08",
    budget: "$550 fixed fee",
    status: "open",
    missionBrief:
      "Track operator-led SaaS companies with durable workflow pain, expansion potential, and clear buyer urgency.",
    targetPeople:
      "B2B SaaS founders, former operators, revenue leaders, and event moderators with category visibility.",
    targetCompanies:
      "Vertical SaaS, workflow automation, sales tooling, pricing infrastructure, and founder-led operator tools.",
    deliverables:
      "Structured report, category map, founder lead list, permitted media, and suggested follow-up questions.",
    permittedMediaNotes:
      "Public stage and sponsor booth media only. Do not record private attendee conversations.",
    createdAt: "2026-06-23T17:20:00.000Z",
    applicants: 0,
    source: "mock",
  },
];

export const assignedBookings = [
  {
    title: "Climate Hardware Founder Salon",
    investor: "North Pier Ventures",
    due: "Report due July 23, 2026 at 10:00 AM PT",
    status: "Brief accepted",
  },
  {
    title: "Healthcare AI Breakfast",
    investor: "Redwood Angel Syndicate",
    due: "Revision due June 30, 2026 at 5:00 PM PT",
    status: "Revision requested",
  },
];

export const adminMetrics = [
  {
    label: "Open coverage requests",
    value: "18",
    detail: "Across SF, NYC, Boston, Austin, and remote events.",
  },
  {
    label: "Scout approval queue",
    value: "12",
    detail: "4 have complete profiles and writing samples.",
  },
  {
    label: "Active bookings",
    value: "9",
    detail: "2 reports are due in the next 24 hours.",
  },
  {
    label: "Compliance items",
    value: "5",
    detail: "Mostly media permissions and scope clarifications.",
  },
];

export const scoutApprovalQueue = [
  {
    name: "Lena Brooks",
    city: "Boston",
    industries: "Robotics, defense tech, hardware",
    status: "Writing sample review",
  },
  {
    name: "Marcus Hill",
    city: "Austin",
    industries: "B2B SaaS, marketplaces, fintech",
    status: "Reference check",
  },
  {
    name: "Sara Nouri",
    city: "New York",
    industries: "Healthtech, AI, enterprise",
    status: "Profile complete",
  },
];

export const activeBookings = [
  {
    title: "Climate Hardware Founder Salon",
    scout: "Andre Wallace",
    investor: "North Pier Ventures",
    status: "In progress",
  },
  {
    title: "AI Infrastructure Demo Night",
    scout: "Maya Chen",
    investor: "Horizon Seed Fund",
    status: "Awaiting acceptance",
  },
  {
    title: "Robotics Investor Night",
    scout: "Noah Kim",
    investor: "Atlas Capital",
    status: "Report submitted",
  },
];

export const disputes = [
  {
    title: "Founder Dinner Coverage",
    issue: "Investor requested media that event policy did not permit.",
    status: "Admin review",
  },
  {
    title: "Security Startup Meetup",
    issue: "Scope mismatch on number of founder interviews requested.",
    status: "Needs clarification",
  },
];

export const complianceItems = [
  "Confirm permitted media language for private demo rooms.",
  "Review coverage request that asks for non-public fundraising details.",
  "Check scout profile claim for prior VC operating role.",
  "Verify final structured report excludes confidential attendee list.",
];

export const bookingChecklist = [
  { item: "Confirm event time, venue, and badge instructions", done: true },
  { item: "Review investor mission brief and target company list", done: true },
  { item: "Collect permitted media only where allowed", done: false },
  { item: "Submit structured report within 24 hours", done: false },
  { item: "Flag warm introductions that have explicit permission", done: false },
];

export const bookingMessages = [
  {
    author: "Investor",
    time: "June 27, 2026 9:14 AM",
    body: "Please prioritize technical founders over service providers. We care most about infra, tooling, and developer adoption.",
  },
  {
    author: "Scout",
    time: "June 27, 2026 10:02 AM",
    body: "Confirmed. I will focus on founder-led teams and include a short evidence section for each recommended follow-up.",
  },
  {
    author: "Admin",
    time: "June 27, 2026 10:30 AM",
    body: "Reminder: permitted media must follow event policy and any speaker or founder consent requirements.",
  },
];
