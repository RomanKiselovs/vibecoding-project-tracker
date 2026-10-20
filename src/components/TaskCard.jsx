import { TEAM } from '../lib/constants.js';
import { formatShort } from '../lib/dates.js';
import { DUE_STYLE, dueLabel, dueState } from '../lib/due.js';
import Avatar from './Avatar.jsx';
import { BugIcon, ClockIcon, SparklesIcon } from './Icons.jsx';

// M6 tag-style: feature vs. bug visual distinction.
const TYPE_STYLE = {
  feature: { stripe: 'border-l-feature', badge: 'bg-feature/10 text-feature', Icon: SparklesIcon, label: 'feature' },
  bug: { stripe: 'border-l-bug', badge: 'bg-bug/10 text-bug', Icon: BugIcon, label: 'bug' },
};

/** One task on the board. */
export default function TaskCard({ task, onOpen, onHandoff }) {
  const type = TYPE_STYLE[task.type] ?? TYPE_STYLE.feature;
  const due = DUE_STYLE[dueState(task)]; // M8 due-tint
  const stop = (e) => e.stopPropagation();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(task)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(task))}
      className={`group w-full cursor-pointer rounded-lg border border-l-4 border-stone-200 ${type.stripe} ${due.card} p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary`}
    >
      <span
        className={`mb-2 inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[11px] font-medium ${type.badge}`}
      >
        <type.Icon width={12} height={12} />
        {type.label}
      </span>
      <h3 className="text-sm font-medium leading-snug text-ink">{task.title}</h3>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{task.description}</p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-ink-muted">
        {/* M7 task-owner: badge + one-dropdown handoff */}
        <label className="flex min-w-0 items-center gap-1.5" onClick={stop} title="Hand off to…">
          <Avatar name={task.assignee} />
          <select
            aria-label="Hand off to"
            value={task.assignee}
            onClick={stop}
            onKeyDown={stop}
            onChange={(e) => onHandoff(task, e.target.value)}
            className="min-w-0 cursor-pointer truncate rounded bg-transparent py-0.5 pr-1 text-xs text-ink-muted hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {TEAM.map((name) => (
              <option key={name} value={name}>
                {name === task.assignee ? name : `Hand off to ${name}`}
              </option>
            ))}
          </select>
        </label>
        {task.dueDate && (
          <span
            title={formatShort(task.dueDate)}
            className={`inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[11px] font-medium ${due.chip}`}
          >
            <ClockIcon width={11} height={11} />
            {dueLabel(task)}
          </span>
        )}
      </div>
    </article>
  );
}
