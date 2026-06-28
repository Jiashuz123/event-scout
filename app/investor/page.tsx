"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  StatCard,
  WorkspaceShell,
} from "@/app/_components/workspace";
import {
  activeCoverageRequests,
  recentReports,
  scoutApplicants,
} from "@/app/_data/mock";
import {
  clearDemoData,
  formatRequestDate,
  getBookingStatusLabel,
  getDemoBookings,
  getDemoCoverageRequests,
  getDemoScoutApplications,
  getStatusLabel,
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

function bookingTone(status: DemoBooking["status"]) {
  if (status === "accepted") {
    return "green";
  }

  if (status === "revision_requested") {
    return "amber";
  }

  return "blue";
}

export default function InvestorDashboard() {
  const [demoRequests, setDemoRequests] = useState<CoverageRequest[]>([]);
  const [applications, setApplications] = useState<DemoScoutApplication[]>([]);
  const [bookings, setBookings] = useState<DemoBooking[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDemoRequests(getDemoCoverageRequests());
      setApplications(getDemoScoutApplications());
      setBookings(getDemoBookings());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const requests = useMemo(
    () => [...demoRequests, ...activeCoverageRequests],
    [demoRequests],
  );
  const pendingApplications = applications.filter(
    (application) => application.status === "pending",
  );

  function handleClearDemoData() {
    clearDemoData();
    setDemoRequests([]);
    setApplications([]);
    setBookings([]);
  }

  return (
    <WorkspaceShell
      eyebrow="Investor dashboard"
      title="Coverage requests, scout signals, and report flow."
      description="A mock workspace for investors to track active event coverage, compare scouts, and review recent structured reports."
      actions={
        <>
          <button
            type="button"
            onClick={handleClearDemoData}
            disabled={
              demoRequests.length === 0 &&
              applications.length === 0 &&
              bookings.length === 0
            }
            className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear demo data
          </button>
          <ButtonLink href="/investor/requests/new">
            Create coverage request
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          label="Active coverage requests"
          value={String(requests.length)}
          detail={`${demoRequests.length} saved in this browser and ${activeCoverageRequests.length} mock requests.`}
        />
        <StatCard
          label="Pending applications"
          value={String(pendingApplications.length)}
          detail="Browser-saved scout applications waiting for investor review."
        />
        <StatCard
          label="Confirmed bookings"
          value={String(bookings.length)}
          detail="Accepted applications become booking workspaces in localStorage."
        />
      </div>

      {demoRequests.length === 0 ? (
        <Card className="mt-6">
          <p className="font-semibold">No browser-saved coverage requests yet.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Create a coverage request to see it appear at the top of the
            investor dashboard and scout marketplace.
          </p>
        </Card>
      ) : null}

      <section className="mt-10">
        <SectionTitle
          eyebrow="Pipeline"
          title="Active coverage requests"
          action={
            <ButtonLink href="/bookings/demo" variant="secondary">
              Open demo booking
            </ButtonLink>
          }
        />
        {requests.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {requests.map((request) => (
              <Card key={request.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      {request.eventName}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">
                      <Link
                        href={`/investor/requests/${request.id}`}
                        className="hover:text-slate-300"
                      >
                        {request.title}
                      </Link>
                    </h3>
                  </div>
                  <Badge tone={statusTone(request.status)}>
                    {getStatusLabel(request.status)}
                  </Badge>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {request.missionBrief}
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-400">
                  <div>{request.city}</div>
                  <div>{formatRequestDate(request.date)}</div>
                  <div>{request.budget}</div>
                  <div>{request.applicants} scout applicants</div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <Badge tone={request.source === "demo" ? "green" : "slate"}>
                    {request.source === "demo" ? "Demo saved" : "Mock"}
                  </Badge>
                  <Link
                    href={`/investor/requests/${request.id}`}
                    className="text-sm font-semibold text-white hover:text-slate-300"
                  >
                    View detail
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="font-semibold">No coverage requests to show.</p>
            <p className="mt-2 text-sm text-slate-400">
              Create a coverage request to start the demo workflow.
            </p>
          </Card>
        )}
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Bookings" title="Confirmed bookings" />
        {bookings.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{booking.city}</p>
                    <h3 className="mt-2 text-xl font-bold">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="hover:text-slate-300"
                      >
                        {booking.eventName}
                      </Link>
                    </h3>
                  </div>
                  <Badge tone={bookingTone(booking.status)}>
                    {getBookingStatusLabel(booking.status)}
                  </Badge>
                </div>
                <dl className="mt-5 grid gap-3 text-sm text-slate-400">
                  <div>Scout: {booking.scoutName}</div>
                  <div>Date: {formatRequestDate(booking.date)}</div>
                  <div>Budget: {booking.budget}</div>
                </dl>
                <Link
                  href={`/bookings/${booking.id}`}
                  className="mt-6 inline-flex rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                >
                  Open workspace
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="font-semibold">No confirmed bookings yet.</p>
            <p className="mt-2 text-sm text-slate-400">
              Accept a pending scout application from a request detail page to
              create a booking workspace.
            </p>
          </Card>
        )}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionTitle eyebrow="Talent" title="Mock applicants" />
          <div className="space-y-4">
            {scoutApplicants.map((applicant) => (
              <Card key={applicant.name}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{applicant.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {applicant.city} - {applicant.fit}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{applicant.rate}</span>
                    <Badge tone="amber">{applicant.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="Reports" title="Recent structured reports" />
          {recentReports.length > 0 ? (
            <div className="space-y-4">
              {recentReports.map((report) => (
                <Card key={report.title}>
                  <p className="text-sm text-slate-400">{report.delivered}</p>
                  <h3 className="mt-2 text-lg font-bold">{report.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Scout: {report.scout}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {report.summary}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="font-semibold">No structured reports yet.</p>
              <p className="mt-2 text-sm text-slate-400">
                Accepted scout deliverables will appear here.
              </p>
            </Card>
          )}
        </div>
      </section>
    </WorkspaceShell>
  );
}
