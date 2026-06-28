export const activeCoverageRequests = [
  {
    title: "AI Infrastructure Demo Night",
    event: "Frontier Builders SF",
    city: "San Francisco",
    date: "July 16, 2026",
    budget: "$650 fixed fee",
    status: "Scout review",
    mission:
      "Identify seed-stage infrastructure founders with developer traction and credible technical depth.",
    applicants: 7,
  },
  {
    title: "Climate Hardware Founder Salon",
    event: "Bay Area Climate Week",
    city: "Oakland",
    date: "July 22, 2026",
    budget: "$800 fixed fee",
    status: "Booked",
    mission:
      "Find founders building manufacturing, grid, or industrial decarbonization companies.",
    applicants: 3,
  },
  {
    title: "NYC Fintech Operator Meetup",
    event: "Empire Fintech Forum",
    city: "New York",
    date: "August 5, 2026",
    budget: "$575 fixed fee",
    status: "Draft brief",
    mission:
      "Capture operator-led fintech startups with bank partnerships or compliance automation angles.",
    applicants: 0,
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

export const openScoutRequests = [
  {
    title: "AI Infrastructure Demo Night",
    city: "San Francisco",
    date: "July 16, 2026",
    fee: "$650",
    fit: "Best for scouts who can evaluate developer tools and technical founder claims.",
  },
  {
    title: "Pre-seed Robotics Showcase",
    city: "Boston",
    date: "July 29, 2026",
    fee: "$700",
    fit: "Needs concise hardware observations, team signals, and permitted booth media.",
  },
  {
    title: "B2B SaaS Operator Summit",
    city: "Austin",
    date: "August 8, 2026",
    fee: "$550",
    fit: "Track category leaders, pricing patterns, and founder follow-up openings.",
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
