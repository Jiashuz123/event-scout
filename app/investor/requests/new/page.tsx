import {
  ButtonLink,
  Card,
  Field,
  TextArea,
  WorkspaceShell,
} from "@/app/_components/workspace";

export default function NewCoverageRequestPage() {
  return (
    <WorkspaceShell
      eyebrow="New coverage request"
      title="Draft an investor-grade event brief."
      description="This mock form captures the scope scouts need before applying or accepting a fixed-fee coverage request."
      actions={<ButtonLink href="/investor" variant="secondary">Back to investor dashboard</ButtonLink>}
    >
      <form className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Event name" defaultValue="AI Infrastructure Demo Night" />
            <Field
              label="Event URL"
              type="url"
              defaultValue="https://example.com/ai-demo-night"
            />
            <Field label="City" defaultValue="San Francisco" />
            <Field label="Venue" defaultValue="South Park Commons" />
            <Field label="Date" type="date" defaultValue="2026-07-16" />
            <Field label="Budget" defaultValue="$650 fixed fee" />
          </div>

          <div className="mt-6 grid gap-5">
            <TextArea
              label="Mission brief"
              rows={5}
              defaultValue="Find seed-stage AI infrastructure founders with meaningful developer traction. Prioritize technical depth, evidence of usage, and warm introduction potential."
            />
            <TextArea
              label="Target people"
              defaultValue="Founders, technical cofounders, former infrastructure operators, and organizers who know the strongest teams in the room."
            />
            <TextArea
              label="Target companies"
              defaultValue="Vector database tooling, observability for AI apps, inference optimization, model evaluation, and developer workflow companies."
            />
            <TextArea
              label="Deliverables requested"
              defaultValue="Structured report, founder lead list, ranked follow-up recommendations, permitted media, and permissioned warm introduction opportunities."
            />
            <TextArea
              label="Permitted media notes"
              defaultValue="Collect photos of public booths or demo materials only where event policy allows. Ask before capturing founder demos or slides."
            />
          </div>
        </Card>

        <aside className="space-y-5">
          <Card>
            <h2 className="text-xl font-bold">Brief quality checklist</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              <li>Define the investor thesis scouts should use to filter leads.</li>
              <li>Keep requested work within fixed-fee research and event coverage.</li>
              <li>Specify permitted media rules before the event starts.</li>
              <li>Ask for permissioned introductions only.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Mock actions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              These controls are visual only. Submission, validation, persistence,
              and scout matching will be added later.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Save draft
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Preview request
              </button>
            </div>
          </Card>
        </aside>
      </form>
    </WorkspaceShell>
  );
}
