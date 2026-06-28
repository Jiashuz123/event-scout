"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { activeCoverageRequests, openScoutRequests } from "@/app/_data/mock";
import {
  acceptDemoScoutApplication,
  formatRequestDate,
  getApplicationStatusLabel,
  getBookingStatusLabel,
  getDemoBookingByRequestId,
  getDemoCoverageRequests,
  getDemoScoutApplicationsForRequest,
  getStatusLabel,
  rejectDemoScoutApplication,
  type DemoBooking,
  type DemoScoutApplication,
  type CoverageRequest,
} from "@/app/_lib/demo-store";

function statusTone(status: CoverageRequest["status"]) {
  if (status === "booked") {
    return "green";
  }

  if (status === "draft") {
    return "amber";
  }

  return "blue";
}

function applicationTone(status: DemoScoutApplication["status"]) {
  if (status === "accepted") {
    return "green";
  }

  if (status === "rejected") {
    return "rose";
  }

  return "amber";
}

function bookingTone(status: DemoBooking["status"]) {
  if (status === "accepted") {
    return "green";
  }

  if (status === "revision_requested") {
    return "amber";
  }

  return "blue";
}

function uniqueRequests(requests: CoverageRequest[]) {
  return requests.filter(
    (request, index, allRequests) =>
      allRequests.findIndex((item) => item.id === request.id) === index,
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-white">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-slate-300">{value}</dd>
    </div>
  );
}

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [demoRequests, setDemoRequests] = useState<CoverageRequest[]>([]);
  const [applications, setApplications] = useState<DemoScoutApplication[]>([]);
  const [booking, setBooking] = useState<DemoBooking | null>(null);
  const [hasLoadedDemoRequests, setHasLoadedDemoRequests] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDemoRequests(getDemoCoverageRequests());
      setApplications(getDemoScoutApplicationsForRequest(id));
      setBooking(getDemoBookingByRequestId(id) ?? null);
      setHasLoadedDemoRequests(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [id]);

  const mockRequests = useMemo(
    () => uniqueRequests([...activeCoverageRequests, ...openScoutRequests]),
    [],
  );
  const mockRequest = mockRequests.find((request) => request.id === id);
  const demoRequest = demoRequests.find((request) => request.id === id);
  const request = demoRequest ?? mockRequest;

  function refreshRequestState() {
    setDemoRequests(getDemoCoverageRequests());
    setApplications(getDemoScoutApplicationsForRequest(id));
    setBooking(getDemoBookingByRequestId(id) ?? null);
  }

  function handleReject(applicationId: string) {
    rejectDemoScoutApplication(applicationId);
    setApplications(getDemoScoutApplicationsForRequest(id));
  }

  function handleAccept(applicationId: string) {
    if (!request) {
      return;
    }

    const nextBooking = acceptDemoScoutApplication(applicationId, request);
    refreshRequestState();

    if (nextBooking) {
      setBooking(nextBooking);
    }
  }

  if (!request && !hasLoadedDemoRequests) {
    return (
      <WorkspaceShell
        eyebrow="Coverage request"
        title="Loading request."
        description="Checking browser-saved demo data for this coverage request."
      >
        <Card>
          <p className="text-sm text-slate-400">Loading request details...</p>
        </Card>
      </WorkspaceShell>
    );
  }

  if (!request) {
    return (
      <WorkspaceShell
        eyebrow="Coverage request"
        title="Request not found."
        description="This request may have been cleared from localStorage or the link may point to a demo request that does not exist."
        actions={
          <>
            <ButtonLink href="/investor" variant="secondary">
              Back to investor dashboard
            </ButtonLink>
            <ButtonLink href="/investor/requests/new">
              Create coverage request
            </ButtonLink>
          </>
        }
      >
        <Card>
          <p className="font-semibold">No matching coverage request was found.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            You can return to the investor dashboard to review existing mock
            requests or create a new browser-saved demo request.
          </p>
        </Card>
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell
      eyebrow="Coverage request detail"
      title={request.title}
      description="Review the event scope, scout applications, and booking path for this coverage request."
      actions={
        <>
          <ButtonLink href="/investor" variant="secondary">
            Back to dashboard
          </ButtonLink>
          <ButtonLink href={booking ? `/bookings/${booking.id}` : "/bookings/demo"}>
            {booking ? "Open booking" : "Open demo booking"}
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <div className="space-y-8">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">{request.eventName}</p>
                <h2 className="mt-2 text-2xl font-bold">Event details</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={request.source === "demo" ? "green" : "slate"}>
                  {request.source === "demo" ? "Demo saved" : "Mock"}
                </Badge>
                <Badge tone={statusTone(request.status)}>
                  {getStatusLabel(request.status)}
                </Badge>
              </div>
            </div>

            <dl className="mt-6 grid gap-5 md:grid-cols-2">
              <DetailItem label="City" value={request.city} />
              <DetailItem label="Venue" value={request.venue} />
              <DetailItem label="Date" value={formatRequestDate(request.date)} />
              <DetailItem label="Budget" value={request.budget} />
              <DetailItem label="Status" value={getStatusLabel(request.status)} />
              <div>
                <dt className="text-sm font-semibold text-white">Event URL</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-300">
                  <a
                    href={request.eventUrl}
                    className="break-words text-sky-200 hover:text-sky-100"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {request.eventUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold">Mission brief</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {request.missionBrief}
            </p>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <h2 className="text-xl font-bold">Target people</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {request.targetPeople}
              </p>
            </Card>
            <Card>
              <h2 className="text-xl font-bold">Target companies</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {request.targetCompanies}
              </p>
            </Card>
          </div>

          <Card>
            <h2 className="text-2xl font-bold">Deliverables</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {request.deliverables}
            </p>
            <h3 className="mt-6 text-lg font-bold">Permitted media notes</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {request.permittedMediaNotes}
            </p>
          </Card>
        </div>

        <aside className="space-y-8">
          {booking ? (
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Booking confirmed</p>
                  <h2 className="mt-2 text-xl font-bold">{booking.eventName}</h2>
                </div>
                <Badge tone={bookingTone(booking.status)}>
                  {getBookingStatusLabel(booking.status)}
                </Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {booking.scoutName} is assigned to cover {booking.eventName} in{" "}
                {booking.city}.
              </p>
              <Link
                href={`/bookings/${booking.id}`}
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Open booking workspace
              </Link>
            </Card>
          ) : null}

          <div>
            <SectionTitle eyebrow="Applications" title="Scout applications" />
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{application.scoutName}</h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {application.scoutCity}
                        </p>
                      </div>
                      <Badge tone={applicationTone(application.status)}>
                        {getApplicationStatusLabel(application.status)}
                      </Badge>
                    </div>
                    <dl className="mt-5 space-y-4">
                      <DetailItem label="LinkedIn" value={application.scoutLinkedIn} />
                      <DetailItem
                        label="Experience"
                        value={application.scoutExperience}
                      />
                      <DetailItem label="Proposal" value={application.proposal} />
                      <DetailItem label="Quote" value={application.quote} />
                      <DetailItem
                        label="Availability"
                        value={application.availability}
                      />
                    </dl>
                    {application.status === "pending" && !booking ? (
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => handleAccept(application.id)}
                          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(application.id)}
                          className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                        >
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <p className="font-semibold">No applications yet.</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Scout applications submitted in this browser will appear here.
                </p>
              </Card>
            )}
          </div>

          <Card>
            <h2 className="text-xl font-bold">Next step</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Accept one pending application to create a booking workspace. Other
              pending applications for this request will be rejected.
            </p>
            {booking ? (
              <Link
                href={`/bookings/${booking.id}`}
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Open booking workspace
              </Link>
            ) : (
              <Link
                href={`/scout/requests/${request.id}`}
                className="mt-6 inline-flex rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
              >
                Open scout-facing brief
              </Link>
            )}
          </Card>
        </aside>
      </div>
    </WorkspaceShell>
  );
}
