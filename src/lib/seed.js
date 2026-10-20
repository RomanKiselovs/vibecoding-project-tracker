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
    },
  ];
}
