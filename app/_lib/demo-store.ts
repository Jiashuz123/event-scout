export type CoverageRequestStatus = "open" | "scout_review" | "booked" | "draft";

export type CoverageRequestSource = "mock" | "demo";

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

const STORAGE_KEY = "eventscout.demo.coverageRequests.v1";
const requestStatuses: CoverageRequestStatus[] = [
  "open",
  "scout_review",
  "booked",
  "draft",
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

function sortNewestFirst(requests: CoverageRequest[]) {
  return [...requests].sort(
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

export function getDemoCoverageRequests() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return sortNewestFirst(parsed.filter(isCoverageRequest));
  } catch {
    return [];
  }
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
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(sortNewestFirst([request, ...requests])),
  );

  return request;
}

export function clearDemoCoverageRequests() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
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
