import { useState, useEffect } from 'react';
import { STAGES, TEAM, STORAGE_KEYS } from './lib/constants.js';
import { seedTasks } from './lib/seed.js';
import Board from './components/Board.jsx';
import TaskModal, { blankTask } from './components/TaskModal.jsx';
import Toast, { useToast } from './components/Toast.jsx';

/**
 * VibeTrack — Vibecoding Project Tracker.
 * Spec: PRD.md · Design: DESIGN.md
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee
 * @property {string|null} dueDate     ISO 'YYYY-MM-DD'
 * @property {string} createdDate      ISO 'YYYY-MM-DD'
 * @property {string} context          M9 — curated briefing for the next AI / teammate
 * @property {string|null} contextTool M9 — 'Claude' | 'ChatGPT' | 'Cursor' | 'Lovable' | 'Replit' | 'Other'
 * @property {string|null} contextUpdatedAt M9 — ISO timestamp, set on save
 */

export { STAGES, TEAM };

/**
 * A tiny localStorage hook — survives reloads, no library needed.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch {
      /* fall through to the initial value */
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private-mode error — silently ignore for hackathon */
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.tasks, seedTasks);
  // { task, isNew } while the modal is open, otherwise null.
  const [editing, setEditing] = useState(null);
  const [toast, showToast] = useToast();

  const openNew = (status = 'todo') => setEditing({ task: blankTask(status), isNew: true });
  const openEdit = (task) => setEditing({ task, isNew: false });
  const close = () => setEditing(null);

  const saveTask = (task) => {
    setTasks((all) =>
      all.some((t) => t.id === task.id)
        ? all.map((t) => (t.id === task.id ? task : t))
        : [...all, task]
    );
    close();
  };

  // M7 task-owner: hand a task to a teammate with one dropdown.
  const handoff = (task, name) => {
    if (name === task.assignee) return;
    setTasks((all) => all.map((t) => (t.id === task.id ? { ...t, assignee: name } : t)));
    showToast(`Handed off to ${name}. They've got it.`);
  };

  const deleteTask = (id) => {
    setTasks((all) => all.filter((t) => t.id !== id));
    close();
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-6">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-accent" />
            <span className="text-brand-primary">Vibe</span>
            <span className="-ml-2 text-brand-accent">Track</span>
          </h1>
          <p className="text-sm text-ink-muted">Vibecoding Project Tracker</p>
        </div>
        <button
          type="button"
          onClick={() => openNew()}
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          + New task
        </button>
      </header>

      <Board tasks={tasks} onOpen={openEdit} onHandoff={handoff} />

      {editing && (
        <TaskModal
          key={editing.task.id}
          task={editing.task}
          isNew={editing.isNew}
          onSave={saveTask}
          onDelete={deleteTask}
          onClose={close}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
