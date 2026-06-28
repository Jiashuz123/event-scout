"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Badge,
  ButtonLink,
  Card,
  SectionTitle,
  WorkspaceShell,
} from "@/app/_components/workspace";
import { activeCoverageRequests, openScoutRequests } from "@/app/_data/mock";
import {
  formatRequestDate,
  getApplicationStatusLabel,
  getDemoCoverageRequests,
  getDemoScoutApplicationsForRequest,
  saveDemoScoutApplication,
  type CoverageRequest,
  type DemoScoutApplication,
  type NewDemoScoutApplicationInput,
} from "@/app/_lib/demo-store";

type ApplicationValues = Omit<NewDemoScoutApplicationInput, "requestId">;
type ApplicationErrors = Partial<Record<keyof ApplicationValues, string>>;

const initialValues: ApplicationValues = {
  scoutName: "",
  scoutCity: "",
  scoutLinkedIn: "",
  scoutExperience: "",
  proposal: "",
  quote: "",
  availability: "",
};

const requiredFields: Array<keyof ApplicationValues> = [
  "scoutName",
  "scoutCity",
  "scoutLinkedIn",
  "scoutExperience",
  "proposal",
  "quote",
  "availability",
];

function applicationTone(status: DemoScoutApplication["status"]) {
  if (status === "accepted") {
    return "green";
  }

  if (status === "rejected") {
    return "rose";
  }

  return "amber";
}

function validate(values: ApplicationValues) {
  const errors: ApplicationErrors = {};

  for (const field of requiredFields) {
    if (!values[field].trim()) {
      errors[field] = "This field is required.";
    }
  }

  if (values.scoutLinkedIn.trim()) {
    try {
      new URL(values.scoutLinkedIn);
    } catch {
      errors.scoutLinkedIn = "Enter a valid LinkedIn URL.";
    }
  }

  return errors;
}

function uniqueRequests(requests: CoverageRequest[]) {
  return requests.filter(
    (request, index, allRequests) =>
      allRequests.findIndex((item) => item.id === request.id) === index,
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-white">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-slate-300">{value}</dd>
    </div>
  );
}

type TextInputProps = {
  label: string;
  name: keyof ApplicationValues;
  value: string;
  onChange: (name: keyof ApplicationValues, value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
};

function TextInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-400"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </label>
  );
}

type TextAreaInputProps = Omit<TextInputProps, "type"> & {
  rows?: number;
};

function TextAreaInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 4,
}: TextAreaInputProps) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-400"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export default function ScoutRequestDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [demoRequests, setDemoRequests] = useState<CoverageRequest[]>([]);
  const [applications, setApplications] = useState<DemoScoutApplication[]>([]);
  const [hasLoadedDemoData, setHasLoadedDemoData] = useState(false);
  const [values, setValues] = useState<ApplicationValues>(initialValues);
  const [errors, setErrors] = useState<ApplicationErrors>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDemoRequests(getDemoCoverageRequests());
      setApplications(getDemoScoutApplicationsForRequest(id));
      setHasLoadedDemoData(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [id]);

  const mockRequests = useMemo(
    () => uniqueRequests([...openScoutRequests, ...activeCoverageRequests]),
    [],
  );
  const request =
    demoRequests.find((demoRequest) => demoRequest.id === id) ??
    mockRequests.find((mockRequest) => mockRequest.id === id);
  const existingApplication = applications[0];

  function handleChange(name: keyof ApplicationValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !request) {
      return;
    }

    const application = saveDemoScoutApplication({
      requestId: request.id,
      ...values,
    });
    setApplications([application]);
  }

  if (!request && !hasLoadedDemoData) {
    return (
      <WorkspaceShell
        eyebrow="Coverage request"
        title="Loading request."
        description="Checking browser-saved demo data for this coverage request."
      >
        <Card>
          <p className="text-sm text-slate-400">Loading request details...</p>
        </Card>
      </WorkspaceShell>
    );
  }

  if (!request) {
    return (
      <WorkspaceShell
        eyebrow="Coverage request"
        title="Request not found."
        description="This scout-facing request is not available in mock data or localStorage."
        actions={
          <ButtonLink href="/scout" variant="secondary">
            Back to scout dashboard
          </ButtonLink>
        }
      >
        <Card>
          <p className="font-semibold">No matching coverage request was found.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Return to the scout dashboard to review available coverage requests.
          </p>
        </Card>
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell
      eyebrow="Scout request detail"
      title={request.title}
      description="Review the investor brief and submit a browser-saved application for this fixed-fee coverage request."
      actions={
        <ButtonLink href="/scout" variant="secondary">
          Back to scout dashboard
        </ButtonLink>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div className="space-y-8">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">{request.eventName}</p>
                <h2 className="mt-2 text-2xl font-bold">Request details</h2>
              </div>
              <Badge tone={request.source === "demo" ? "green" : "slate"}>
                {request.source === "demo" ? "Demo saved" : "Mock"}
              </Badge>
            </div>
            <dl className="mt-6 grid gap-5 md:grid-cols-2">
              <DetailItem label="City" value={request.city} />
              <DetailItem label="Venue" value={request.venue} />
              <DetailItem label="Date" value={formatRequestDate(request.date)} />
              <DetailItem label="Budget" value={request.budget} />
            </dl>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold">Mission brief</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {request.missionBrief}
            </p>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <h2 className="text-xl font-bold">Target people</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {request.targetPeople}
              </p>
            </Card>
            <Card>
              <h2 className="text-xl font-bold">Target companies</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {request.targetCompanies}
              </p>
            </Card>
          </div>

          <Card>
            <h2 className="text-2xl font-bold">Deliverables</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {request.deliverables}
            </p>
            <h3 className="mt-6 text-lg font-bold">Permitted media notes</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {request.permittedMediaNotes}
            </p>
          </Card>
        </div>

        <aside>
          <SectionTitle eyebrow="Application" title="Scout application" />
          {existingApplication ? (
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {existingApplication.scoutName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {existingApplication.scoutCity}
                  </p>
                </div>
                <Badge tone={applicationTone(existingApplication.status)}>
                  {getApplicationStatusLabel(existingApplication.status)}
                </Badge>
              </div>
              <dl className="mt-6 space-y-5 text-sm text-slate-300">
                <DetailItem
                  label="LinkedIn"
                  value={existingApplication.scoutLinkedIn}
                />
                <DetailItem
                  label="Relevant experience"
                  value={existingApplication.scoutExperience}
                />
                <DetailItem label="Proposal" value={existingApplication.proposal} />
                <DetailItem label="Quote" value={existingApplication.quote} />
                <DetailItem
                  label="Availability"
                  value={existingApplication.availability}
                />
              </dl>
              <Link
                href="/scout"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Back to scout dashboard
              </Link>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card>
                <div className="grid gap-5">
                  <TextInput
                    label="Scout name"
                    name="scoutName"
                    value={values.scoutName}
                    onChange={handleChange}
                    error={errors.scoutName}
                    placeholder="Maya Chen"
                  />
                  <TextInput
                    label="City"
                    name="scoutCity"
                    value={values.scoutCity}
                    onChange={handleChange}
                    error={errors.scoutCity}
                    placeholder="San Francisco"
                  />
                  <TextInput
                    label="LinkedIn URL"
                    name="scoutLinkedIn"
                    type="url"
                    value={values.scoutLinkedIn}
                    onChange={handleChange}
                    error={errors.scoutLinkedIn}
                    placeholder="https://www.linkedin.com/in/example"
                  />
                  <TextAreaInput
                    label="Relevant experience"
                    name="scoutExperience"
                    rows={4}
                    value={values.scoutExperience}
                    onChange={handleChange}
                    error={errors.scoutExperience}
                    placeholder="Describe event coverage, startup research, and relevant sector experience."
                  />
                  <TextAreaInput
                    label="Proposal"
                    name="proposal"
                    rows={5}
                    value={values.proposal}
                    onChange={handleChange}
                    error={errors.proposal}
                    placeholder="Explain how you will cover the event and filter the strongest leads."
                  />
                  <TextInput
                    label="Quote"
                    name="quote"
                    value={values.quote}
                    onChange={handleChange}
                    error={errors.quote}
                    placeholder="$650 fixed fee"
                  />
                  <TextInput
                    label="Availability"
                    name="availability"
                    value={values.availability}
                    onChange={handleChange}
                    error={errors.availability}
                    placeholder="Available for full event and 24-hour report turnaround."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Submit application
                </button>
              </Card>
            </form>
          )}
        </aside>
      </div>
    </WorkspaceShell>
  );
}
