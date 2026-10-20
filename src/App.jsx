import { useState, useEffect } from 'react';
import { STAGES, TEAM, STORAGE_KEYS } from './lib/constants.js';
import { seedTasks } from './lib/seed.js';
import AnchorBoard, { DEFAULT_ANCHORS } from './components/AnchorBoard.jsx';
import Board from './components/Board.jsx';
import TaskModal, { blankTask } from './components/TaskModal.jsx';
import Toast, { useToast } from './components/Toast.jsx';
import { copyText, toPromptMarkdown, toStandupMarkdown } from './lib/prompt.js';
import { MegaphoneIcon } from './components/Icons.jsx';

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
  const [anchors, setAnchors] = useLocalStorage(STORAGE_KEYS.anchors, DEFAULT_ANCHORS);
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

  // M10 copy-prompt
  const copyPrompt = async (task) => {
    const ok = await copyText(toPromptMarkdown(task));
    showToast(ok ? 'Copied. Paste it into your AI and keep vibing.' : "Couldn't reach the clipboard — try again.", 'accent');
  };

  // M12 secret-sauce: drag-and-drop + one-click standup for the whole team
  const moveTask = (id, status) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === status) return;
    setTasks((all) => all.map((t) => (t.id === id ? { ...t, status } : t)));
    const label = STAGES.find((s) => s.id === status)?.label;
    showToast(status === 'done' ? `Done: ${task.title}. Nice.` : `Moved to ${label}.`);
  };

  const copyStandup = async () => {
    const ok = await copyText(toStandupMarkdown(tasks, TEAM));
    showToast(ok ? 'Standup copied. Drop it in the team chat.' : "Couldn't reach the clipboard — try again.", 'accent');
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
        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copyStandup}
          title="Copy a per-teammate standup of the whole board"
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary/20 bg-surface-card px-3 py-2 text-sm font-medium text-brand-primary transition hover:border-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          <MegaphoneIcon />
          Copy standup
        </button>
        <button
          type="button"
          onClick={() => openNew()}
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          + New task
        </button>
        </div>
      </header>

      <AnchorBoard anchors={anchors} onChange={setAnchors} />

      <Board tasks={tasks} onOpen={openEdit} onHandoff={handoff} onCopyPrompt={copyPrompt} onMove={moveTask} />

      {editing && (
        <TaskModal
          key={editing.task.id}
          task={editing.task}
          isNew={editing.isNew}
          onSave={saveTask}
          onDelete={deleteTask}
          onClose={close}
          onCopyPrompt={copyPrompt}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
