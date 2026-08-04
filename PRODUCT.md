# Product

## Register

product

## Users

Prospective and existing Sahabat Insurance customers (and partner-network staff) looking up reference data: authorized garages by city, agent listings, branch office addresses. They arrive from the marketing site or a direct link, scan or search for their city/category, then act on a result (call a number, open a maps link). Low patience for friction — this is a lookup task, not a browsing session.

## Product Purpose

Data & Tabel pages (`/garage-list`, `/agent`, `/branch-office`, etc.) surface CMS-managed reference tables — partner garages, agents, branch offices — behind a shared search/filter UI. Success is finding the right row in a few seconds: search by name/city, filter by category, scan a clean table.

## Brand Personality

Trustworthy, clear, efficient. Corporate insurance tone — calm and credible, not flashy. Matches the existing navy (`#2887c1`) / indigo-accent (`#6366f1`) palette already established across the marketing site.

## Anti-references

Not a generic SaaS admin dashboard — no gray-on-gray card soup, no boxy filter toolbars bolted on as an afterthought. Filters and search should feel like part of the page, not a leftover admin-panel control bar.

## Design Principles

- Lookup speed over decoration — search/filter controls stay legible and immediate, never buried or ambiguous.
- One state, one meaning — a selected filter should visibly and unambiguously narrow the same result set the user sees (no silent double-filtering).
- Reuse the site's existing navy/accent system; don't introduce a parallel palette for "app" pages.
- Empty and zero-result states explain themselves plainly, in the same voice as the rest of the copy (Indonesian, direct, no jargon).

## Accessibility & Inclusion

WCAG 2.2 AA baseline: ≥4.5:1 body text contrast, visible focus states on all interactive controls (search input, select, filter pills), keyboard-operable filters, `prefers-reduced-motion` respected for any list/row animation.
