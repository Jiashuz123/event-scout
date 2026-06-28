import type { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/investor", label: "Investor" },
  { href: "/scout", label: "Scout" },
  { href: "/bookings/demo", label: "Booking" },
  { href: "/admin", label: "Admin" },
];

type WorkspaceShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function WorkspaceShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: WorkspaceShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        <nav className="flex flex-col gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            EventScout
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-800 px-4 py-2 hover:border-slate-600 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <header className="grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {description}
            </p>
          </div>

          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </header>

        {children}
      </div>
    </main>
  );
}

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 ${className}`}>
      {children}
    </div>
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
};

export function SectionTitle({ eyebrow, title, action }: SectionTitleProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </Card>
  );
}

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "rose" | "slate";
};

const badgeTones = {
  blue: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  slate: "border-slate-700 bg-slate-800 text-slate-200",
};

export function Badge({ children, tone = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "bg-white text-slate-950 hover:bg-slate-200"
      : "border border-slate-700 text-white hover:bg-slate-900";

  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-3 text-sm font-semibold ${className}`}
    >
      {children}
    </Link>
  );
}

type FieldProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
};

export function Field({
  label,
  placeholder,
  defaultValue,
  type = "text",
}: FieldProps) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-400"
      />
    </label>
  );
}

type TextAreaProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
};

export function TextArea({
  label,
  placeholder,
  defaultValue,
  rows = 4,
}: TextAreaProps) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-400"
      />
    </label>
  );
}
