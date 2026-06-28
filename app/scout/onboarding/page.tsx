import {
  ButtonLink,
  Card,
  Field,
  TextArea,
  WorkspaceShell,
} from "@/app/_components/workspace";

export default function ScoutOnboardingPage() {
  return (
    <WorkspaceShell
      eyebrow="Scout onboarding"
      title="Build a vetted scout profile."
      description="This mock profile form captures the experience investors need to evaluate a scout for event coverage."
      actions={<ButtonLink href="/scout" variant="secondary">Back to scout dashboard</ButtonLink>}
    >
      <form className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" defaultValue="Maya Chen" />
            <Field label="City" defaultValue="San Francisco" />
            <Field
              label="LinkedIn"
              type="url"
              defaultValue="https://linkedin.com/in/mayachen"
            />
            <Field label="Rate" defaultValue="$650 per event coverage request" />
            <Field label="Industries" defaultValue="AI infrastructure, devtools, data" />
            <Field label="Languages" defaultValue="English, Mandarin" />
          </div>

          <div className="mt-6 grid gap-5">
            <TextArea
              label="Event experience"
              defaultValue="Covered founder demo nights, technical meetups, and accelerator showcases. Comfortable interviewing technical founders and summarizing product-market signals."
            />
            <TextArea
              label="Writing sample"
              rows={7}
              defaultValue="Example: The strongest company at the event was building observability for LLM apps. The founder showed a live workflow, had five design partners, and could clearly explain why existing APM tools fail for prompt-heavy systems."
            />
          </div>
        </Card>

        <aside className="space-y-5">
          <Card>
            <h2 className="text-xl font-bold">Profile review</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              <li>Confirm industry depth and event coverage judgment.</li>
              <li>Review writing sample for investor-grade clarity.</li>
              <li>Check that rate is a fixed fee for research work.</li>
              <li>Verify scout understands permitted media boundaries.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Mock actions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              These controls do not submit yet. Approval, identity checks, and
              availability workflows will be added later.
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Submit profile for review
            </button>
          </Card>
        </aside>
      </form>
    </WorkspaceShell>
  );
}
