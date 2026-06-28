export type CoverageRequestStatus = "open" | "scout_review" | "booked" | "draft";

export type CoverageRequestSource = "mock" | "demo";

export type DemoScoutApplicationStatus = "pending" | "accepted" | "rejected";

export type DemoBookingStatus =
  | "confirmed"
  | "in_progress"
  | "submitted"
  | "accepted"
  | "revision_requested";

export type CoverageRequest = {
  id: string;
  title: string;
  eventName: string;
  eventUrl: string;
  city: string;
  venue: string;
  date: string;
  missionBrief: string;
  targetPeople: string;
  targetCompanies: string;
  deliverables: string;
  permittedMediaNotes: string;
  budget: string;
  status: CoverageRequestStatus;
  createdAt: string;
  applicants: number;
  source: CoverageRequestSource;
};

export type DemoScoutApplication = {
  id: string;
  requestId: string;
  scoutName: string;
  scoutCity: string;
  scoutLinkedIn: string;
  scoutExperience: string;
  proposal: string;
  quote: string;
  availability: string;
  status: DemoScoutApplicationStatus;
  createdAt: string;
};

export type DemoBooking = {
  id: string;
  requestId: string;
  applicationId: string;
  investorName: string;
  scoutName: string;
  eventName: string;
  city: string;
  venue: string;
  date: string;
  missionBrief: string;
  budget: string;
  status: DemoBookingStatus;
  createdAt: string;
};

export type NewCoverageRequestInput = {
  eventName: string;
  eventUrl: string;
  city: string;
  venue: string;
  date: string;
  missionBrief: string;
  targetPeople: string;
  targetCompanies: string;
  deliverables: string;
  permittedMediaNotes: string;
  budget: string;
};

export type NewDemoScoutApplicationInput = Omit<
  DemoScoutApplication,
  "id" | "status" | "createdAt"
>;

const STORAGE_KEY = "eventscout.demo.coverageRequests.v1";
const APPLICATIONS_STORAGE_KEY = "eventscout.demo.scoutApplications.v1";
const BOOKINGS_STORAGE_KEY = "eventscout.demo.bookings.v1";
const DEFAULT_DEMO_INVESTOR_NAME = "Demo Investor";

const requestStatuses: CoverageRequestStatus[] = [
  "open",
  "scout_review",
  "booked",
  "draft",
];
const applicationStatuses: DemoScoutApplicationStatus[] = [
  "pending",
  "accepted",
  "rejected",
];
const bookingStatuses: DemoBookingStatus[] = [
  "confirmed",
  "in_progress",
  "submitted",
  "accepted",
  "revision_requested",
];

function canUseLocalStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function isCoverageRequest(value: unknown): value is CoverageRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const request = value as Record<string, unknown>;

  return (
    typeof request.id === "string" &&
    typeof request.title === "string" &&
    typeof request.eventName === "string" &&
    typeof request.eventUrl === "string" &&
    typeof request.city === "string" &&
    typeof request.venue === "string" &&
    typeof request.date === "string" &&
    typeof request.missionBrief === "string" &&
    typeof request.targetPeople === "string" &&
    typeof request.targetCompanies === "string" &&
    typeof request.deliverables === "string" &&
    typeof request.permittedMediaNotes === "string" &&
    typeof request.budget === "string" &&
    requestStatuses.includes(request.status as CoverageRequestStatus) &&
    typeof request.createdAt === "string" &&
    typeof request.applicants === "number" &&
    request.source === "demo"
  );
}

function isDemoScoutApplication(value: unknown): value is DemoScoutApplication {
  if (!value || typeof value !== "object") {
    return false;
  }

  const application = value as Record<string, unknown>;

  return (
    typeof application.id === "string" &&
    typeof application.requestId === "string" &&
    typeof application.scoutName === "string" &&
    typeof application.scoutCity === "string" &&
    typeof application.scoutLinkedIn === "string" &&
    typeof application.scoutExperience === "string" &&
    typeof application.proposal === "string" &&
    typeof application.quote === "string" &&
    typeof application.availability === "string" &&
    applicationStatuses.includes(
      application.status as DemoScoutApplicationStatus,
    ) &&
    typeof application.createdAt === "string"
  );
}

function isDemoBooking(value: unknown): value is DemoBooking {
  if (!value || typeof value !== "object") {
    return false;
  }

  const booking = value as Record<string, unknown>;

  return (
    typeof booking.id === "string" &&
    typeof booking.requestId === "string" &&
    typeof booking.applicationId === "string" &&
    typeof booking.investorName === "string" &&
    typeof booking.scoutName === "string" &&
    typeof booking.eventName === "string" &&
    typeof booking.city === "string" &&
    typeof booking.venue === "string" &&
    typeof booking.date === "string" &&
    typeof booking.missionBrief === "string" &&
    typeof booking.budget === "string" &&
    bookingStatuses.includes(booking.status as DemoBookingStatus) &&
    typeof booking.createdAt === "string"
  );
}

function sortNewestFirst(requests: CoverageRequest[]) {
  return [...requests].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

function sortApplicationsNewestFirst(applications: DemoScoutApplication[]) {
  return [...applications].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

function sortBookingsNewestFirst(bookings: DemoBooking[]) {
  return [...bookings].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `demo-${crypto.randomUUID()}`;
  }

  return `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeComparable(value: string) {
  return value.trim().toLowerCase();
}

function normalizeLinkedInUrl(value: string) {
  return normalizeComparable(value).replace(/\/+$/, "");
}

function readStorageArray<T>(
  key: string,
  guard: (value: unknown) => value is T,
) {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(guard);
  } catch {
    return [];
  }
}

function writeStorageArray<T>(key: string, values: T[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(values));
}

function updateDemoRequestAfterApplication(requestId: string) {
  const requests = getDemoCoverageRequests();
  const applications = getDemoScoutApplicationsForRequest(requestId);

  const nextRequests = requests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    return {
      ...request,
      applicants: applications.length,
      status: request.status === "open" ? "scout_review" : request.status,
    };
  });

  writeStorageArray(STORAGE_KEY, sortNewestFirst(nextRequests));
}

function markDemoRequestBooked(requestId: string) {
  const requests = getDemoCoverageRequests();
  const nextRequests = requests.map((request) =>
    request.id === requestId ? { ...request, status: "booked" as const } : request,
  );

  writeStorageArray(STORAGE_KEY, sortNewestFirst(nextRequests));
}

export function getDemoCoverageRequests() {
  return sortNewestFirst(readStorageArray(STORAGE_KEY, isCoverageRequest));
}

export function saveDemoCoverageRequest(input: NewCoverageRequestInput) {
  const request: CoverageRequest = {
    id: createId(),
    title: input.eventName.trim(),
    eventName: input.eventName.trim(),
    eventUrl: input.eventUrl.trim(),
    city: input.city.trim(),
    venue: input.venue.trim(),
    date: input.date,
    missionBrief: input.missionBrief.trim(),
    targetPeople: input.targetPeople.trim(),
    targetCompanies: input.targetCompanies.trim(),
    deliverables: input.deliverables.trim(),
    permittedMediaNotes: input.permittedMediaNotes.trim(),
    budget: input.budget.trim(),
    status: "open",
    createdAt: new Date().toISOString(),
    applicants: 0,
    source: "demo",
  };

  if (!canUseLocalStorage()) {
    return request;
  }

  const requests = getDemoCoverageRequests();
  writeStorageArray(STORAGE_KEY, sortNewestFirst([request, ...requests]));

  return request;
}

export function getDemoScoutApplications() {
  return sortApplicationsNewestFirst(
    readStorageArray(APPLICATIONS_STORAGE_KEY, isDemoScoutApplication),
  );
}

export function getDemoScoutApplicationsForRequest(requestId: string) {
  return getDemoScoutApplications().filter(
    (application) => application.requestId === requestId,
  );
}

export function getExistingDemoScoutApplication(
  requestId: string,
  scoutName: string,
  scoutLinkedIn: string,
) {
  const normalizedName = normalizeComparable(scoutName);
  const normalizedLinkedIn = normalizeLinkedInUrl(scoutLinkedIn);

  return getDemoScoutApplicationsForRequest(requestId).find((application) => {
    const sameName = normalizeComparable(application.scoutName) === normalizedName;
    const sameLinkedIn =
      normalizeLinkedInUrl(application.scoutLinkedIn) === normalizedLinkedIn;

    return sameName || sameLinkedIn;
  });
}

export function saveDemoScoutApplication(input: NewDemoScoutApplicationInput) {
  const existingApplication = getExistingDemoScoutApplication(
    input.requestId,
    input.scoutName,
    input.scoutLinkedIn,
  );

  if (existingApplication) {
    return existingApplication;
  }

  const application: DemoScoutApplication = {
    id: createId(),
    requestId: input.requestId,
    scoutName: input.scoutName.trim(),
    scoutCity: input.scoutCity.trim(),
    scoutLinkedIn: input.scoutLinkedIn.trim(),
    scoutExperience: input.scoutExperience.trim(),
    proposal: input.proposal.trim(),
    quote: input.quote.trim(),
    availability: input.availability.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const applications = getDemoScoutApplications();
  writeStorageArray(
    APPLICATIONS_STORAGE_KEY,
    sortApplicationsNewestFirst([application, ...applications]),
  );
  updateDemoRequestAfterApplication(application.requestId);

  return application;
}

export function rejectDemoScoutApplication(applicationId: string) {
  const applications = getDemoScoutApplications();
  let rejectedApplication: DemoScoutApplication | undefined;

  const nextApplications = applications.map((application) => {
    if (application.id !== applicationId || application.status !== "pending") {
      return application;
    }

    rejectedApplication = { ...application, status: "rejected" };
    return rejectedApplication;
  });

  writeStorageArray(
    APPLICATIONS_STORAGE_KEY,
    sortApplicationsNewestFirst(nextApplications),
  );

  return rejectedApplication ?? null;
}

export function createDemoBookingFromAcceptedApplication(
  application: DemoScoutApplication,
  request: CoverageRequest,
) {
  const existingBooking = getDemoBookingByRequestId(request.id);

  if (existingBooking) {
    return existingBooking;
  }

  const booking: DemoBooking = {
    id: createId(),
    requestId: request.id,
    applicationId: application.id,
    investorName: DEFAULT_DEMO_INVESTOR_NAME,
    scoutName: application.scoutName,
    eventName: request.eventName,
    city: request.city,
    venue: request.venue,
    date: request.date,
    missionBrief: request.missionBrief,
    budget: request.budget,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const bookings = getDemoBookings();
  writeStorageArray(BOOKINGS_STORAGE_KEY, sortBookingsNewestFirst([booking, ...bookings]));
  markDemoRequestBooked(request.id);

  return booking;
}

export function acceptDemoScoutApplication(
  applicationId: string,
  request: CoverageRequest,
) {
  const applications = getDemoScoutApplications();
  const selectedApplication = applications.find(
    (application) =>
      application.id === applicationId && application.requestId === request.id,
  );

  if (!selectedApplication) {
    return null;
  }

  const nextApplications = applications.map((application) => {
    if (application.id === applicationId) {
      return { ...application, status: "accepted" as const };
    }

    if (
      application.requestId === request.id &&
      application.status === "pending"
    ) {
      return { ...application, status: "rejected" as const };
    }

    return application;
  });

  writeStorageArray(
    APPLICATIONS_STORAGE_KEY,
    sortApplicationsNewestFirst(nextApplications),
  );

  return createDemoBookingFromAcceptedApplication(
    { ...selectedApplication, status: "accepted" },
    request,
  );
}

export function getDemoBookings() {
  return sortBookingsNewestFirst(
    readStorageArray(BOOKINGS_STORAGE_KEY, isDemoBooking),
  );
}

export function getDemoBookingById(id: string) {
  return getDemoBookings().find((booking) => booking.id === id);
}

export function getDemoBookingByRequestId(requestId: string) {
  return getDemoBookings().find((booking) => booking.requestId === requestId);
}

export function updateDemoBookingStatus(
  bookingId: string,
  status: DemoBookingStatus,
) {
  const bookings = getDemoBookings();
  let updatedBooking: DemoBooking | undefined;

  const nextBookings = bookings.map((booking) => {
    if (booking.id !== bookingId) {
      return booking;
    }

    updatedBooking = { ...booking, status };
    return updatedBooking;
  });

  writeStorageArray(BOOKINGS_STORAGE_KEY, sortBookingsNewestFirst(nextBookings));

  return updatedBooking ?? null;
}

export function clearDemoCoverageRequests() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function clearDemoData() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(APPLICATIONS_STORAGE_KEY);
  window.localStorage.removeItem(BOOKINGS_STORAGE_KEY);
}

export function getStatusLabel(status: CoverageRequestStatus) {
  const labels: Record<CoverageRequestStatus, string> = {
    open: "Open",
    scout_review: "Scout review",
    booked: "Booked",
    draft: "Draft brief",
  };

  return labels[status];
}

export function getApplicationStatusLabel(status: DemoScoutApplicationStatus) {
  const labels: Record<DemoScoutApplicationStatus, string> = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
  };

  return labels[status];
}

export function getBookingStatusLabel(status: DemoBookingStatus) {
  const labels: Record<DemoBookingStatus, string> = {
    confirmed: "Confirmed",
    in_progress: "In progress",
    submitted: "Submitted",
    accepted: "Accepted",
    revision_requested: "Revision requested",
  };

  return labels[status];
}

export function formatRequestDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
