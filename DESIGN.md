# Vibecoding Project Tracker — Design

**Status:** Hackathon starter design doc · filled in for `design-done`.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B, during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

One sentence that captures the feeling the tracker should leave you with.

A calm lab notebook at 11pm: warm paper, dark ink, and one signal-orange highlighter for the thing that needs you next.

Two or three references that capture the vibe (links to dribbble shots, screenshots of apps you admire, Pinterest boards — anything visual):

- Field Notes / Moleskine notebooks — warm off-white paper, confident ink.
- Linear's issue list — dense, quiet, no decoration that doesn't carry meaning.
- Teenage Engineering product pages — one loud accent colour on a neutral base.

Anti-references — what we are explicitly **not** trying to look like:

- Default Tailwind blue-on-white SaaS dashboards, gradients and drop-shadow stacks.

## 2. Color palette

These are the colors the build milestones will reference. Once chosen, paste the hex values into `tailwind.config.js` so the rest of the team can use Tailwind utility classes (e.g. `bg-brand-primary`, `border-due-warning`).

### Brand

| Token | Hex | Where it shows up |
|---|---|---|
| `brand-primary` | `#26233A` | Header, "+" button, focus rings |
| `brand-accent` | `#FF6B35` | Highlights, hover states, links |
| `surface-page` | `#F6F3EC` | Page background |
| `surface-card` | `#FFFFFF` | Card background |
| `text-primary` | `#1C1917` | Body text |
| `text-muted` | `#78716C` | Captions, dates, counts |

### Task type (M6 `tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `#0F9D8A` | Cards tagged `feature` (accent stripe + icon) |
| `type-bug` | `#E0245E` | Cards tagged `bug` (accent stripe + icon) |

### Due-date states (M8 `due-tint`)

| Token | Hex | When used |
|---|---|---|
| `due-safe` | `#3F9B5C` | More than 2 days out |
| `due-warning` | `#E8A317` | Less than 24 hours |
| `due-overdue` | `#D64045` | Past due |
| `due-neutral` | `#A8A29E` | Done (overrides date) |

## 3. Typography

| Role | Font | Why |
|---|---|---|
| Heading | Space Grotesk | Slightly quirky geometric shapes give the tool a personality without hurting legibility. |
| Body | Inter | Built for screens and stays readable at 12–14 px on dense cards. |
| Monospace (tags, badges, code) | JetBrains Mono | Prompts and tags look like code, which is exactly what they are. |

Suggested sizes (override only if the design demands it):

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** Paper-white on warm page, 1px stone border and a 4px left stripe in the task-type colour; lift slightly on hover.
- **Buttons:** Solid ink (`brand-primary`) fill, white text, rounded-lg, generous padding; the accent orange is reserved for the single primary action on screen.
- **Modal:** Centered, max-w-xl, ink backdrop at 50% opacity, sections separated by thin rules like notebook lines.
- **Empty states:** Dashed border, muted text, quietly encouraging, never sad.
- **Drag affordance (if used):** Native drag-and-drop between columns with a dashed accent outline on the target column; the status dropdown in the modal is the fallback.

## 5. Voice / microcopy

Three lines of microcopy that capture the tone of the product. Keep it short — these are the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
| "+" button label | + New task |
| Empty column placeholder | Nothing here yet — keep going. |
| Toast after "Copy as Prompt Context" | Copied. Paste it into your AI and keep vibing. |
| Confirm-delete message | Delete this task? This can't be undone. |
| Handoff toast (M7 `task-owner`) | Handed off to {name}. They've got it. |

## 6. Logo / wordmark

The tracker probably doesn't need a logo, but it does need a name and a wordmark style.

- **Product name:** VibeTrack
- **Wordmark style:** "Vibe" in ink + "Track" in signal orange, Space Grotesk bold, preceded by a small orange dot.

## 7. Out of scope (this hackathon)

To keep design tight, the following are explicitly not part of `design-done`:

- A dark mode toggle. Pick one mode and ship it.
- Multiple themes. One brand, applied consistently.
- Animations beyond a 200 ms fade on toast notifications.
- A custom icon set. Use [Lucide icons](https://lucide.dev) via Tailwind classes if you need any.

---

*DESIGN.md version: hackathon-starter v1*
