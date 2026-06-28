"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  TextArea,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { bookingChecklist, bookingMessages } from "@/app/_data/mock";
import {
  formatRequestDate,
  getBookingStatusLabel,
  getDemoBookingById,
  updateDemoBookingStatus,
  type DemoBooking,
  type DemoBookingStatus,
} from "@/app/_lib/demo-store";

function bookingTone(status: DemoBooking["status"]) {
  if (status === "accepted") {
    return "green";
  }

  if (status === "revision_requested") {
    return "amber";
  }

  return "blue";
}

export default function BookingWorkspacePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [booking, setBooking] = useState<DemoBooking | null>(null);
  const [hasLoadedBooking, setHasLoadedBooking] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBooking(getDemoBookingById(id) ?? null);
      setHasLoadedBooking(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [id]);

  function handleStatusChange(status: DemoBookingStatus) {
    const updatedBooking = updateDemoBookingStatus(id, status);

    if (updatedBooking) {
      setBooking(updatedBooking);
    }
  }

  if (!booking && !hasLoadedBooking) {
    return (
      <WorkspaceShell
        eyebrow="Booking workspace"
        title="Loading booking."
        description="Checking browser-saved demo data for this booking workspace."
      >
        <Card>
          <p className="text-sm text-slate-400">Loading booking details...</p>
        </Card>
      </WorkspaceShell>
    );
  }

  if (!booking) {
    return (
      <WorkspaceShell
        eyebrow="Booking workspace"
        title="Booking not found."
        description="This booking may have been cleared from localStorage or the link may point to a booking that does not exist."
        actions={
          <>
            <ButtonLink href="/investor" variant="secondary">
              Investor dashboard
            </ButtonLink>
            <ButtonLink href="/bookings/demo">Open demo booking</ButtonLink>
          </>
        }
      >
        <Card>
          <p className="font-semibold">No matching booking was found.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Accept a scout application from an investor request detail page to
            create a browser-saved booking workspace.
          </p>
        </Card>
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell
      eyebrow="Booking workspace"
      title={`${booking.eventName} assignment.`}
      description="A browser-saved shared workspace for the investor and scout to coordinate the assignment, deliverables, and final structured report."
      actions={
        <>
          <ButtonLink href="/investor" variant="secondary">
            Investor view
          </ButtonLink>
          <ButtonLink href="/scout" variant="secondary">
            Scout view
          </ButtonLink>
        </>
      }
    >
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Assignment brief</p>
                <h2 className="mt-2 text-2xl font-bold">{booking.eventName}</h2>
              </div>
              <Badge tone={bookingTone(booking.status)}>
                {getBookingStatusLabel(booking.status)}
              </Badge>
            </div>
            <dl className="mt-6 grid gap-4 text-sm text-slate-300">
              <div>
                <dt className="font-semibold text-white">Investor</dt>
                <dd className="mt-1">{booking.investorName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Scout</dt>
                <dd className="mt-1">{booking.scoutName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Event details</dt>
                <dd className="mt-1">
                  {booking.venue} - {booking.city} -{" "}
                  {formatRequestDate(booking.date)}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Budget</dt>
                <dd className="mt-1">{booking.budget}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Mission</dt>
                <dd className="mt-1 leading-6">{booking.missionBrief}</dd>
              </div>
            </dl>
          </Card>

          <div>
            <SectionTitle eyebrow="Progress" title="Checklist" />
            <Card>
              <ul className="space-y-4">
                {bookingChecklist.map((task) => (
                  <li
                    key={task.item}
                    className="flex items-start gap-3 text-sm leading-6"
                  >
                    <span
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                        task.done
                          ? "border-emerald-400 bg-emerald-400 text-slate-950"
                          : "border-slate-600 text-slate-500"
                      }`}
                    >
                      {task.done ? "OK" : ""}
                    </span>
                    <span className={task.done ? "text-slate-300" : "text-slate-400"}>
                      {task.item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <SectionTitle eyebrow="Communication" title="Message thread" />
            <Card>
              <div className="space-y-5">
                {bookingMessages.map((message) => (
                  <article
                    key={`${message.author}-${message.time}`}
                    className="border-b border-slate-800 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">{message.author}</h3>
                      <p className="text-xs text-slate-500">{message.time}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {message.body}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <input
                  aria-label="Reply"
                  placeholder="Write a mock reply..."
                  className="min-w-0 flex-1 rounded-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-slate-400"
                />
                <button
                  type="button"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Send
                </button>
              </div>
            </Card>
          </div>

          <div>
            <SectionTitle eyebrow="Deliverables" title="Upload mock section" />
            <Card>
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-6 py-8 text-center">
                <p className="font-semibold">
                  Drop permitted media and report files here
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Mock upload target for permitted photos, founder lead lists,
                  and supporting event materials.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Report" title="Final structured report" />
        <Card>
          <TextArea
            label="Structured report text"
            rows={11}
            defaultValue={`Executive summary:
${booking.eventName} produced several relevant founder and company leads. The strongest opportunities should be evaluated against the investor mission brief, technical credibility, customer evidence, and founder-market fit.

Top leads:
1. Founder or company lead with clear pain and credible product progress.
2. Startup with early customer validation and differentiated technical approach.
3. Operator-led team with a permissioned follow-up opportunity.

Recommended follow-up:
Request investor intro calls only where the founder has explicitly given permission. Include permitted media and event context in the follow-up packet.`}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => handleStatusChange("in_progress")}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              Mark in progress
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("submitted")}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              Submit report
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("revision_requested")}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              Request revision
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange("accepted")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Accept structured report
            </button>
          </div>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
