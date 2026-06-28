const steps = [
  {
    title: "Post a coverage request",
    description:
      "Tell scouts which event matters, who you want them to find, and what kind of structured report you need.",
  },
  {
    title: "Match with a vetted scout",
    description:
      "Review scout profiles, experience, location, and proposed fee before confirming the assignment.",
  },
  {
    title: "Receive an investor-grade report",
    description:
      "Get key conversations, founder leads, permitted media, referral opportunities, and recommended follow-ups.",
  },
];

const deliverables = [
  "Executive event summary",
  "Founder and company leads",
  "Conversation notes",
  "Permitted photos and videos",
  "Referral opportunities",
  "Suggested follow-up messages",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">EventScout</div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#how-it-works" className="hover:text-white">
              How it works
            </a>
            <a href="#deliverables" className="hover:text-white">
              Deliverables
            </a>
            <a href="#trust" className="hover:text-white">
              Trust
            </a>
          </div>

          <a
            href="#waitlist"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Join waitlist
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Vetted event scouts for angels and VCs
            </div>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
              Never miss the room where your next deal appears.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              EventScout helps investors hire trusted local scouts to attend
              startup events, demo days, conferences, and meetups on their
              behalf. Get structured notes, qualified leads, permitted media,
              and warm follow-up opportunities without taking another flight.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="rounded-full bg-white px-8 py-4 text-center font-semibold text-slate-950 hover:bg-slate-200"
              >
                Post an event brief
              </a>

              <a
                href="#scouts"
                className="rounded-full border border-slate-700 px-8 py-4 text-center font-semibold text-white hover:bg-slate-900"
              >
                Become a scout
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-slate-800 pt-8">
              <div>
                <div className="text-3xl font-bold">3</div>
                <div className="mt-1 text-sm text-slate-400">
                  launch cities
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">24h</div>
                <div className="mt-1 text-sm text-slate-400">
                  report target
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">0%</div>
                <div className="mt-1 text-sm text-slate-400">
                  success fees
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
            <div className="rounded-2xl bg-white p-6 text-slate-950">
              <div className="text-sm font-semibold text-slate-500">
                Sample Coverage Request
              </div>

              <h2 className="mt-3 text-2xl font-bold">
                Attend AI Founder Demo Night
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Find seed-stage AI infrastructure founders, capture permitted
                booth media, and identify 3 warm intro opportunities.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">
                    Mission
                  </div>
                  <div className="mt-1 font-medium">
                    Scout 5 promising technical founders
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">
                    Deliverables
                  </div>
                  <div className="mt-1 font-medium">
                    Structured report, lead list, permitted media
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">
                    Budget
                  </div>
                  <div className="mt-1 font-medium">$500 fixed fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-slate-800 bg-slate-900 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-bold">
              A simple workflow for remote event coverage.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-800 bg-slate-950 p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-slate-950">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deliverables" className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Structured reports
            </p>
            <h2 className="mt-3 text-4xl font-bold">
              More useful than random notes.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every scout report should help an investor decide who is worth a
              follow-up meeting, what they learned, and what to do next.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Trust and compliance
              </p>
              <h2 className="mt-3 text-4xl font-bold">
                Built for sensitive investor workflows.
              </h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                Scouts are paid fixed fees for event coverage, research, and
                structured reporting.
              </p>
              <p>
                The platform should avoid success fees, investment negotiation,
                hidden recording, or off-platform payment.
              </p>
              <p>
                Media should only be collected where permitted by event policy
                and applicable consent rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="bg-white px-6 py-24 text-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">
            Start with a closed beta marketplace.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Launch with a small group of investors, scouts, and startup events
            before opening the full marketplace.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:founder@eventscout.local?subject=Investor beta request"
              className="rounded-full bg-slate-950 px-8 py-4 font-semibold text-white hover:bg-slate-800"
            >
              Join as investor
            </a>

            <a
              id="scouts"
              href="mailto:founder@eventscout.local?subject=Scout beta request"
              className="rounded-full border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-100"
            >
              Join as scout
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}