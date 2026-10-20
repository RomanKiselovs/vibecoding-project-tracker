import { formatShort } from '../lib/dates.js';

/** One task on the board. */
export default function TaskCard({ task, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="group w-full rounded-lg border border-stone-200 bg-surface-card p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
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
