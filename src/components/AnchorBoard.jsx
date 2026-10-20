import { useState } from 'react';
import { LinkIcon } from './Icons.jsx';

/** The four pinned deliverable slots (PRD §5 Anchor). */
export const DEFAULT_ANCHORS = [
  { id: 'presentation', label: 'Presentation', url: null },
  { id: 'demo', label: 'Demo', url: null },
  { id: 'report', label: 'Report', url: null },
  { id: 'documentation', label: 'Documentation', url: null },
];

const HINT = {
  presentation: 'Slides for the 5-min pitch',
  demo: 'Live Vercel URL or video',
  report: 'Module 5 report',
  documentation: 'README / Vibe Coding History',
};

function normaliseUrl(raw) {
  const v = raw.trim();
  if (!v) return null;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function prettyHost(url) {
  try {
    const u = new URL(url);
    return u.host.replace(/^www\./, '') + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    return url;
  }
}

function AnchorSlot({ anchor, onChange }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(anchor.url ?? '');
  const filled = Boolean(anchor.url);

  const commit = () => {
    onChange({ ...anchor, url: normaliseUrl(value) });
    setEditing(false);
  };

  return (
    <div
      className={`flex min-h-[5.5rem] flex-col justify-between rounded-xl border p-3 transition ${
        filled ? 'border-brand-primary/20 bg-surface-card' : 'border-dashed border-stone-300 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-heading text-sm font-semibold text-ink">
          <span className={`h-2 w-2 rounded-full ${filled ? 'bg-due-safe' : 'bg-stone-300'}`} />
          {anchor.label}
        </span>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setValue(anchor.url ?? '');
              setEditing(true);
            }}
            className="rounded px-1.5 py-0.5 text-xs text-ink-muted hover:bg-stone-200"
          >
            {filled ? 'Edit' : '+ Add link'}
          </button>
        )}
      </div>

      {editing ? (
        <form
          className="mt-2 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            commit();
          }}
        >
          <input
            autoFocus
            type="text"
            inputMode="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
            placeholder="https://…"
            className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-2 py-1 text-xs focus:border-brand-primary focus:outline-none"
          />
          <button type="submit" className="rounded-md bg-brand-primary px-2 py-1 text-xs font-medium text-white">
            Save
          </button>
        </form>
      ) : filled ? (
        <a
          href={anchor.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 truncate font-mono text-xs text-brand-accent hover:underline"
        >
          <LinkIcon width={12} height={12} />
          <span className="truncate">{prettyHost(anchor.url)}</span>
        </a>
      ) : (
        <p className="mt-2 text-xs text-ink-muted">{HINT[anchor.id]}</p>
      )}
    </div>
  );
}

/** Deliverable Anchor Board pinned above the Kanban (M11). */
export default function AnchorBoard({ anchors, onChange }) {
  const done = anchors.filter((a) => a.url).length;
  return (
    <section className="mb-6">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-ink">
          Final deliverables
        </h2>
        <span className="font-mono text-xs text-ink-muted">
          {done}/{anchors.length} pinned
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {anchors.map((a) => (
          <AnchorSlot
            key={a.id}
            anchor={a}
            onChange={(next) => onChange(anchors.map((x) => (x.id === next.id ? next : x)))}
          />
        ))}
      </div>
    </section>
  );
}
