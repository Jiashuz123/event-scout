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

export default function InvestorDashboard() {
  return (
    <WorkspaceShell
      eyebrow="Investor dashboard"
      title="Coverage requests, scout signals, and report flow."
      description="A mock workspace for investors to track active event coverage, compare scouts, and review recent structured reports."
      actions={<ButtonLink href="/investor/requests/new">Create coverage request</ButtonLink>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          label="Active coverage requests"
          value="3"
          detail="One booked, one in scout review, and one still being drafted."
        />
        <StatCard
          label="Scout applicants"
          value="10"
          detail="Three shortlisted profiles are ready for investor review."
        />
        <StatCard
          label="Recent structured reports"
          value="2"
          detail="Both include founder leads, permitted media, and follow-up recommendations."
        />
      </div>

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
        <div className="grid gap-5 lg:grid-cols-3">
          {activeCoverageRequests.map((request) => (
            <Card key={request.title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{request.event}</p>
                  <h3 className="mt-2 text-xl font-bold">{request.title}</h3>
                </div>
                <Badge tone={request.status === "Booked" ? "green" : "blue"}>
                  {request.status}
                </Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {request.mission}
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-400">
                <div>{request.city}</div>
                <div>{request.date}</div>
                <div>{request.budget}</div>
                <div>{request.applicants} scout applicants</div>
              </div>
            </Card>
          ))}
        </div>
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
                      {applicant.city} · {applicant.fit}
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
        </div>
      </section>
    </WorkspaceShell>
  );
}
