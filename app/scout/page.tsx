"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  StatCard,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { assignedBookings, openScoutRequests } from "@/app/_data/mock";
import {
  formatRequestDate,
  getApplicationStatusLabel,
  getBookingStatusLabel,
  getDemoBookings,
  getDemoCoverageRequests,
  getDemoScoutApplications,
  type DemoBooking,
  type DemoScoutApplication,
  type CoverageRequest,
} from "@/app/_lib/demo-store";

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

export default function ScoutDashboard() {
  const [demoRequests, setDemoRequests] = useState<CoverageRequest[]>([]);
  const [applications, setApplications] = useState<DemoScoutApplication[]>([]);
  const [demoBookings, setDemoBookings] = useState<DemoBooking[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDemoRequests(
        getDemoCoverageRequests().filter(
          (request) =>
            request.status === "open" || request.status === "scout_review",
        ),
      );
      setApplications(getDemoScoutApplications());
      setDemoBookings(getDemoBookings());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const availableRequestCount = demoRequests.length + openScoutRequests.length;
  const assignedBookingCount = demoBookings.length + assignedBookings.length;

  return (
    <WorkspaceShell
      eyebrow="Scout dashboard"
      title="Find coverage requests and manage assigned work."
      description="A mock scout workspace for reviewing open requests, tracking booked assignments, and monitoring fixed-fee earnings status."
      actions={<ButtonLink href="/scout/onboarding">Complete scout onboarding</ButtonLink>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          label="Available requests"
          value={String(availableRequestCount)}
          detail={`${demoRequests.length} browser-saved requests and ${openScoutRequests.length} mock matches.`}
        />
        <StatCard
          label="Assigned bookings"
          value={String(assignedBookingCount)}
          detail={`${demoBookings.length} browser-saved assignments and ${assignedBookings.length} mock bookings.`}
        />
        <StatCard
          label="Submitted applications"
          value={String(applications.length)}
          detail="Applications are saved in this browser for the demo scout workflow."
        />
      </div>

      {demoRequests.length === 0 ? (
        <Card className="mt-6">
          <p className="font-semibold">No browser-saved open requests yet.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Submit the investor coverage request form to add a new open request
            above the mock scout marketplace.
          </p>
        </Card>
      ) : null}

      <section className="mt-10">
        <SectionTitle eyebrow="Marketplace" title="Open coverage requests" />
        {availableRequestCount > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {demoRequests.map((request) => (
              <Card key={request.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      <Link
                        href={`/scout/requests/${request.id}`}
                        className="hover:text-slate-300"
                      >
                        {request.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {request.city} - {formatRequestDate(request.date)}
                    </p>
                  </div>
                  <Badge tone="green">{request.budget}</Badge>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {request.missionBrief}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <Badge tone="green">Demo saved</Badge>
                  <Link
                    href={`/scout/requests/${request.id}`}
                    className="text-sm font-semibold hover:text-slate-300"
                  >
                    Apply
                  </Link>
                </div>
              </Card>
            ))}

            {openScoutRequests.map((request) => (
              <Card key={request.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      <Link
                        href={`/scout/requests/${request.id}`}
                        className="hover:text-slate-300"
                      >
                        {request.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {request.city} - {formatRequestDate(request.date)}
                    </p>
                  </div>
                  <Badge tone="green">{request.budget}</Badge>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {request.missionBrief}
                </p>
                <Link
                  href={`/scout/requests/${request.id}`}
                  className="mt-6 inline-flex rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                >
                  View brief
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="font-semibold">No open coverage requests right now.</p>
            <p className="mt-2 text-sm text-slate-400">
              New investor requests will appear here when they are saved.
            </p>
          </Card>
        )}
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Applications" title="Submitted by this browser" />
        {applications.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {applications.map((application) => (
              <Card key={application.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{application.scoutName}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {application.scoutCity} - {application.quote}
                    </p>
                  </div>
                  <Badge tone={applicationTone(application.status)}>
                    {getApplicationStatusLabel(application.status)}
                  </Badge>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {application.proposal}
                </p>
                <Link
                  href={`/scout/requests/${application.requestId}`}
                  className="mt-5 inline-flex text-sm font-semibold hover:text-slate-300"
                >
                  View request
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="font-semibold">No submitted applications yet.</p>
            <p className="mt-2 text-sm text-slate-400">
              Apply to an open coverage request to see the browser-saved status
              here.
            </p>
          </Card>
        )}
      </section>

      <section className="mt-10">
        <SectionTitle
          eyebrow="Assigned"
          title="Booking cards"
          action={
            <ButtonLink href="/bookings/demo" variant="secondary">
              Open workspace
            </ButtonLink>
          }
        />
        {assignedBookingCount > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {demoBookings.map((booking) => (
              <Card key={booking.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="hover:text-slate-300"
                      >
                        {booking.eventName}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Investor: {booking.investorName}
                    </p>
                  </div>
                  <Badge tone={bookingTone(booking.status)}>
                    {getBookingStatusLabel(booking.status)}
                  </Badge>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {booking.city} - {formatRequestDate(booking.date)} -{" "}
                  {booking.budget}
                </p>
              </Card>
            ))}
            {assignedBookings.map((booking) => (
              <Card key={booking.title}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{booking.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Investor: {booking.investor}
                    </p>
                  </div>
                  <Badge tone={booking.status.includes("Revision") ? "amber" : "blue"}>
                    {booking.status}
                  </Badge>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {booking.due}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="font-semibold">No assigned bookings yet.</p>
            <p className="mt-2 text-sm text-slate-400">
              Accepted assignments will appear in this section.
            </p>
          </Card>
        )}
      </section>
    </WorkspaceShell>
  );
}
