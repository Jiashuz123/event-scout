import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  StatCard,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { assignedBookings, openScoutRequests } from "@/app/_data/mock";

export default function ScoutDashboard() {
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
          value="14"
          detail="Three strong matches based on your mock profile industries."
        />
        <StatCard
          label="Assigned bookings"
          value="2"
          detail="One active event brief and one structured report revision."
        />
        <StatCard
          label="Earnings status"
          value="$1,350"
          detail="Mock pending fixed fees. No success fees or investment commissions."
        />
      </div>

      <section className="mt-10">
        <SectionTitle eyebrow="Marketplace" title="Open coverage requests" />
        <div className="grid gap-5 lg:grid-cols-3">
          {openScoutRequests.map((request) => (
            <Card key={request.title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{request.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {request.city} · {request.date}
                  </p>
                </div>
                <Badge tone="green">{request.fee}</Badge>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                {request.fit}
              </p>
              <button
                type="button"
                className="mt-6 rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
              >
                View brief
              </button>
            </Card>
          ))}
        </div>
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
        <div className="grid gap-5 md:grid-cols-2">
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
      </section>
    </WorkspaceShell>
  );
}
