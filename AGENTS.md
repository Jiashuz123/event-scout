# AGENTS.md

## Project

This project is EventScout, a marketplace where angel investors and VCs can hire vetted scouts to attend startup events on their behalf.

Scouts produce structured investor-grade reports, collect permitted media, identify relevant people or companies, and optionally make permissioned warm introductions.

This is a fixed-fee research and event-coverage marketplace. Scouts should not receive success fees, negotiate investments, handle funds, or act as securities brokers.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Supabase later for auth, database, and storage
- Stripe Connect later for marketplace payments
- OpenAI later for report drafting and transcription

## Product Language

Use these terms:

- "Scout" instead of "attendant"
- "Coverage request" instead of "gig"
- "Structured report" instead of "notes"
- "Permitted media" instead of "recordings"
- "Investor" instead of "buyer"

## Code Rules

- Use strict TypeScript.
- Keep components small and readable.
- Prefer server components unless client interactivity is needed.
- Do not hardcode secrets.
- Use environment variables for API keys.
- Validate user input before saving or sending it.
- Do not add payment, auth, database, or AI features unless the task specifically asks for them.

## Security Rules

- Never trust client-side authorization.
- Investor data should only be visible to the correct investor.
- Scout assignment data should only be visible to the assigned scout and investor.
- Admin pages must require admin authorization.
- File uploads should eventually be private, not public.

## MVP Build Order

1. Landing page
2. Investor dashboard mock
3. Scout dashboard mock
4. Coverage request form
5. Scout onboarding form
6. Request detail page
7. Booking/deliverables page
8. Admin dashboard mock
9. Supabase auth and database
10. Payments
11. AI report assistant

## Commands

Use these commands to check work:

```bash
npm run lint
npm run build
npm run dev