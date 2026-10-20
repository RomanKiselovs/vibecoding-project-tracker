// Shared constants (PRD §5, §7, §8). App.jsx re-exports these.

// The four columns of the board, in render order.
// Use these IDs everywhere — do not invent new ones.
export const STAGES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

// The three names from PRD §8. They are the only valid values for `Task.assignee`.
export const TEAM = ['Romans Kiselovs', 'Teammate B', 'Teammate C'];

export const TASK_TYPES = [
  { id: 'feature', label: 'Feature' },
  { id: 'bug', label: 'Bug' },
];

// M9 context: where the context block came from / is headed.
export const CONTEXT_TOOLS = ['Claude', 'ChatGPT', 'Cursor', 'Lovable', 'Replit', 'Other'];

export const STORAGE_KEYS = {
  tasks: 'vibetracker.tasks',
  anchors: 'vibetracker.anchors',
};
