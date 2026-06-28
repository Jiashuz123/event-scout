import {
  Badge,
  Card,
  SectionTitle,
  StatCard,
  WorkspaceShell,
} from "@/app/_components/workspace";
import {
  activeBookings,
  adminMetrics,
  complianceItems,
  disputes,
  scoutApprovalQueue,
} from "@/app/_data/mock";

export default function AdminDashboard() {
  return (
    <WorkspaceShell
      eyebrow="Admin dashboard mock"
      title="Marketplace operations without live systems."
      description="A frontend-only admin view for scout approvals, active bookings, disputes, and compliance review items."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {adminMetrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
          />
        ))}
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionTitle eyebrow="Queue" title="Scout approval queue" />
          <div className="space-y-4">
            {scoutApprovalQueue.map((scout) => (
              <Card key={scout.name}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{scout.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {scout.city} · {scout.industries}
                    </p>
                  </div>
                  <Badge tone="amber">{scout.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="Bookings" title="Active bookings" />
          <div className="space-y-4">
            {activeBookings.map((booking) => (
              <Card key={booking.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{booking.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {booking.scout} for {booking.investor}
                    </p>
                  </div>
                  <Badge tone="blue">{booking.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Support" title="Disputes" />
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <Card key={dispute.title}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{dispute.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {dispute.issue}
                    </p>
                  </div>
                  <Badge tone="rose">{dispute.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="Compliance" title="Review items" />
          <Card>
            <ul className="space-y-4 text-sm leading-6 text-slate-300">
              {complianceItems.map((item) => (
                <li key={item} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </WorkspaceShell>
  );
}
