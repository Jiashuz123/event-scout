import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  TextArea,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { bookingChecklist, bookingMessages } from "@/app/_data/mock";

export default function DemoBookingPage() {
  return (
    <WorkspaceShell
      eyebrow="Booking workspace"
      title="AI Infrastructure Demo Night assignment."
      description="A mock shared workspace for the investor, scout, and admin to coordinate an event assignment and final structured report."
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
                <h2 className="mt-2 text-2xl font-bold">
                  Scout seed-stage AI infrastructure founders
                </h2>
              </div>
              <Badge tone="blue">In progress</Badge>
            </div>
            <dl className="mt-6 grid gap-4 text-sm text-slate-300">
              <div>
                <dt className="font-semibold text-white">Investor</dt>
                <dd className="mt-1">Horizon Seed Fund</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Scout</dt>
                <dd className="mt-1">Maya Chen</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Event</dt>
                <dd className="mt-1">Frontier Builders SF · July 16, 2026</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Mission</dt>
                <dd className="mt-1 leading-6">
                  Identify technical founders with evidence of developer adoption,
                  capture permitted media, and surface permissioned warm introduction
                  opportunities.
                </dd>
              </div>
            </dl>
          </Card>

          <div>
            <SectionTitle eyebrow="Progress" title="Checklist" />
            <Card>
              <ul className="space-y-4">
                {bookingChecklist.map((task) => (
                  <li key={task.item} className="flex items-start gap-3 text-sm leading-6">
                    <span
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                        task.done
                          ? "border-emerald-400 bg-emerald-400 text-slate-950"
                          : "border-slate-600 text-slate-500"
                      }`}
                    >
                      {task.done ? "✓" : ""}
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
                  <article key={`${message.author}-${message.time}`} className="border-b border-slate-800 pb-5 last:border-0 last:pb-0">
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
                <p className="font-semibold">Drop permitted media and report files here</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Mock upload target for permitted photos, founder lead lists, and
                  supporting event materials.
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
Frontier Builders SF produced five relevant AI infrastructure leads. Two companies appear immediately worth investor follow-up based on technical credibility, early developer adoption, and clear founder-market fit.

Top leads:
1. TraceForge - observability for LLM workflows with three design partners.
2. EvalDock - model evaluation automation for regulated enterprise teams.
3. LatencyBase - inference optimization for high-volume consumer AI apps.

Recommended follow-up:
Ask TraceForge and EvalDock for 30-minute intro calls. Scout can request permissioned introductions after confirming founder interest.`}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              Request revision
            </button>
            <button
              type="button"
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
