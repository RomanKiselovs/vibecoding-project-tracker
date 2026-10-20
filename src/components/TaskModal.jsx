import { useEffect, useState } from 'react';
import { STAGES, TEAM, TASK_TYPES } from '../lib/constants.js';
import { newId, todayISO } from '../lib/dates.js';

const inputCls =
  'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-ink placeholder:text-stone-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20';
const labelCls = 'mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted';

/** A blank task for the "+ New task" flow. */
export function blankTask(status = 'todo') {
  return {
    id: newId(),
    title: '',
    description: '',
    type: 'feature',
    status,
    assignee: TEAM[0],
    dueDate: null,
    createdDate: todayISO(),
  };
}

/**
 * Add / edit / delete modal (M5 crud-modal).
 * `task` is the task being edited; `isNew` switches the copy and hides Delete.
 */
export default function TaskModal({ task, isNew, onSave, onDelete, onClose }) {
  const [draft, setDraft] = useState(task);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (field) => (e) => setDraft((d) => ({ ...d, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    onSave({ ...draft, title: draft.title.trim(), dueDate: draft.dueDate || null });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-brand-primary/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-xl animate-fadein overflow-y-auto rounded-2xl bg-surface-card shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-ink">
            {isNew ? 'New task' : 'Edit task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-ink-muted hover:bg-stone-100"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className={labelCls} htmlFor="title">Title</label>
            <input
              id="title"
              autoFocus
              required
              className={inputCls}
              value={draft.title}
              onChange={set('title')}
              placeholder="What needs doing?"
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              className={inputCls}
              value={draft.description}
              onChange={set('description')}
              placeholder="A sentence or two of detail"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="type">Type</label>
              <select id="type" className={inputCls} value={draft.type} onChange={set('type')}>
                {TASK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="status">Status</label>
              <select id="status" className={inputCls} value={draft.status} onChange={set('status')}>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="assignee">Assignee</label>
              <select id="assignee" className={inputCls} value={draft.assignee} onChange={set('assignee')}>
                {TEAM.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="date"
                className={inputCls}
                value={draft.dueDate ?? ''}
                onChange={set('dueDate')}
              />
            </div>
          </div>
          {/* MODAL_EXTRA_FIELDS */}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-stone-200 bg-stone-50 px-6 py-4">
          <div>
            {!isNew &&
              (confirmDelete ? (
                <span className="flex items-center gap-2 text-sm">
                  <span className="text-due-overdue">Delete this task? This can't be undone.</span>
                  <button
                    type="button"
                    onClick={() => onDelete(draft.id)}
                    className="rounded-md bg-due-overdue px-3 py-1.5 font-medium text-white hover:opacity-90"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-md px-2 py-1.5 text-ink-muted hover:bg-stone-200"
                  >
                    Keep
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-stone-200 hover:text-due-overdue"
                >
                  Delete
                </button>
              ))}
          </div>
          <div className="flex items-center gap-2">
            {/* MODAL_EXTRA_ACTIONS */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-ink-muted hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
            >
              {isNew ? 'Add task' : 'Save'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
