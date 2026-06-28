"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ButtonLink,
  Card,
  WorkspaceShell,
} from "@/app/_components/workspace";
import {
  saveDemoCoverageRequest,
  type NewCoverageRequestInput,
} from "@/app/_lib/demo-store";

type RequestErrors = Partial<Record<keyof NewCoverageRequestInput, string>>;

const initialValues: NewCoverageRequestInput = {
  eventName: "",
  eventUrl: "",
  city: "",
  venue: "",
  date: "",
  missionBrief: "",
  targetPeople: "",
  targetCompanies: "",
  deliverables: "",
  permittedMediaNotes: "",
  budget: "",
};

const requiredFields: Array<keyof NewCoverageRequestInput> = [
  "eventName",
  "eventUrl",
  "city",
  "venue",
  "date",
  "missionBrief",
  "targetPeople",
  "targetCompanies",
  "deliverables",
  "permittedMediaNotes",
  "budget",
];

function validate(values: NewCoverageRequestInput) {
  const errors: RequestErrors = {};

  for (const field of requiredFields) {
    if (!values[field].trim()) {
      errors[field] = "This field is required.";
    }
  }

  if (values.eventUrl.trim()) {
    try {
      new URL(values.eventUrl);
    } catch {
      errors.eventUrl = "Enter a valid event URL.";
    }
  }

  return errors;
}

type TextInputProps = {
  label: string;
  name: keyof NewCoverageRequestInput;
  value: string;
  onChange: (name: keyof NewCoverageRequestInput, value: string) => void;
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

export default function NewCoverageRequestPage() {
  const router = useRouter();
  const [values, setValues] = useState<NewCoverageRequestInput>(initialValues);
  const [errors, setErrors] = useState<RequestErrors>({});

  function handleChange(name: keyof NewCoverageRequestInput, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    saveDemoCoverageRequest(values);
    router.push("/investor");
  }

  return (
    <WorkspaceShell
      eyebrow="New coverage request"
      title="Draft an investor-grade event brief."
      description="This browser-only form creates a demo coverage request that appears on both the investor and scout dashboards."
      actions={
        <ButtonLink href="/investor" variant="secondary">
          Back to investor dashboard
        </ButtonLink>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Event name"
              name="eventName"
              value={values.eventName}
              onChange={handleChange}
              error={errors.eventName}
              placeholder="AI Infrastructure Demo Night"
            />
            <TextInput
              label="Event URL"
              name="eventUrl"
              type="url"
              value={values.eventUrl}
              onChange={handleChange}
              error={errors.eventUrl}
              placeholder="https://example.com/ai-demo-night"
            />
            <TextInput
              label="City"
              name="city"
              value={values.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="San Francisco"
            />
            <TextInput
              label="Venue"
              name="venue"
              value={values.venue}
              onChange={handleChange}
              error={errors.venue}
              placeholder="South Park Commons"
            />
            <TextInput
              label="Date"
              name="date"
              type="date"
              value={values.date}
              onChange={handleChange}
              error={errors.date}
            />
            <TextInput
              label="Budget"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              error={errors.budget}
              placeholder="$650 fixed fee"
            />
          </div>

          <div className="mt-6 grid gap-5">
            <TextAreaInput
              label="Mission brief"
              name="missionBrief"
              rows={5}
              value={values.missionBrief}
              onChange={handleChange}
              error={errors.missionBrief}
              placeholder="Find seed-stage AI infrastructure founders with meaningful developer traction."
            />
            <TextAreaInput
              label="Target people"
              name="targetPeople"
              value={values.targetPeople}
              onChange={handleChange}
              error={errors.targetPeople}
              placeholder="Founders, technical cofounders, operators, and organizers."
            />
            <TextAreaInput
              label="Target companies"
              name="targetCompanies"
              value={values.targetCompanies}
              onChange={handleChange}
              error={errors.targetCompanies}
              placeholder="AI observability, evaluation, inference optimization, and devtools companies."
            />
            <TextAreaInput
              label="Deliverables requested"
              name="deliverables"
              value={values.deliverables}
              onChange={handleChange}
              error={errors.deliverables}
              placeholder="Structured report, founder lead list, permitted media, and follow-up recommendations."
            />
            <TextAreaInput
              label="Permitted media notes"
              name="permittedMediaNotes"
              value={values.permittedMediaNotes}
              onChange={handleChange}
              error={errors.permittedMediaNotes}
              placeholder="Collect permitted media only where event policy and consent allow."
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
            <h2 className="text-xl font-bold">Demo submission</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Submitting saves the request to this browser using localStorage.
              It does not create auth, database records, payments, or API calls.
            </p>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Submit coverage request
            </button>
          </Card>
        </aside>
      </form>
    </WorkspaceShell>
  );
}
