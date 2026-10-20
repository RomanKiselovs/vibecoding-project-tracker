import { formatShort } from '../lib/dates.js';
import { BugIcon, SparklesIcon } from './Icons.jsx';

// M6 tag-style: feature vs. bug visual distinction.
const TYPE_STYLE = {
  feature: { stripe: 'border-l-feature', badge: 'bg-feature/10 text-feature', Icon: SparklesIcon, label: 'feature' },
  bug: { stripe: 'border-l-bug', badge: 'bg-bug/10 text-bug', Icon: BugIcon, label: 'bug' },
};

/** One task on the board. */
export default function TaskCard({ task, onOpen }) {
  const type = TYPE_STYLE[task.type] ?? TYPE_STYLE.feature;
  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className={`group w-full rounded-lg border border-l-4 border-stone-200 ${type.stripe} bg-surface-card p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary`}
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
      <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
        <span>{task.assignee}</span>
        {task.dueDate && <span>{formatShort(task.dueDate)}</span>}
      </div>
    </button>
  );
}
