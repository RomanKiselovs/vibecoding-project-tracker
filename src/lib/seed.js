import { TEAM } from './constants.js';
import { daysFromToday } from './dates.js';

/**
 * Mock tasks shown on first load (M4 data-model). Dates are relative to
 * today so the board always looks alive.
 * @returns {import('../App.jsx').Task[]}
 */
export function seedTasks() {
  const [a, b, c] = TEAM;
  return [
    {
      id: 'seed-1',
      title: 'Scaffold the four-column board',
      description: 'Render To Do / In Progress / Review / Done from STAGES and drop tasks into the right column.',
      type: 'feature',
      status: 'done',
      assignee: a,
      dueDate: daysFromToday(-1),
      createdDate: daysFromToday(-2),
      context: "Built with one prompt in Claude:\n\"Render a 4-column Kanban from STAGES in App.jsx using Tailwind; tasks come from useLocalStorage.\"\nWorks. Columns are a CSS grid, empty state is a dashed box.",
      contextTool: 'Claude',
      contextUpdatedAt: new Date(Date.now() - 864e5).toISOString(),
    },
    {
      id: 'seed-2',
      title: 'Add / edit / delete modal',
      description: 'One modal for every Task field. Clicking a card opens it in edit mode.',
      type: 'feature',
      status: 'in-progress',
      assignee: a,
      dueDate: daysFromToday(0),
      createdDate: daysFromToday(-1),
      context: "Goal: one modal for add + edit.\nWorks: all fields render, Save writes to localStorage.\nPrompt that got us here: \"Build a TaskModal with every Task field; same component for new and edit.\"\nNext: Escape should close it; delete needs a confirm step.",
      contextTool: 'Cursor',
      contextUpdatedAt: new Date().toISOString(),
    },
    {
      id: 'seed-3',
      title: 'Cards forget their column after reload',
      description: 'Status changes are not written back to localStorage.',
      type: 'bug',
      status: 'review',
      assignee: b,
      dueDate: daysFromToday(-1),
      createdDate: daysFromToday(-1),
      context: "Repro: move a card to Review, reload — it jumps back.\nSuspect: setTasks called with a mutated array, so the effect never fires.\nNext: map to a new array instead of mutating.",
      contextTool: 'ChatGPT',
      contextUpdatedAt: new Date(Date.now() - 864e5).toISOString(),
    },
    {
      id: 'seed-4',
      title: '"Copy as Prompt Context" button',
      description: 'Serialize the task and its context into Markdown and put it on the clipboard.',
      type: 'feature',
      status: 'todo',
      assignee: c,
      dueDate: daysFromToday(4),
      createdDate: daysFromToday(0),
      context: '',
      contextTool: null,
      contextUpdatedAt: null,
    },
  ];
}
