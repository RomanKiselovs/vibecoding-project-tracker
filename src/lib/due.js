// M8 due-tint: classify a task by how close its deadline is (DESIGN.md §2).
import { todayISO } from './dates.js';

const DAY = 24 * 60 * 60 * 1000;

function parse(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Whole days from today until `iso` (negative = past). */
export function daysUntil(iso) {
  return Math.round((parse(iso) - parse(todayISO())) / DAY);
}

/**
 * 'neutral' — done, or no due date (Done overrides the date)
 * 'overdue' — past due
 * 'warning' — due today (less than 24 h left)
 * 'soon'    — due in 1–2 days
 * 'safe'    — more than 2 days out
 */
export function dueState(task) {
  if (task.status === 'done' || !task.dueDate) return 'neutral';
  const days = daysUntil(task.dueDate);
  if (days < 0) return 'overdue';
  if (days === 0) return 'warning';
  if (days <= 2) return 'soon';
  return 'safe';
}

/** Short label for the due chip. */
export function dueLabel(task) {
  if (!task.dueDate) return '';
  const days = daysUntil(task.dueDate);
  if (task.status === 'done') return 'done';
  if (days < -1) return `${-days} days late`;
  if (days === -1) return '1 day late';
  if (days === 0) return 'due today';
  if (days === 1) return 'due tomorrow';
  return `in ${days} days`;
}

// Tailwind classes per state: card tint (solid, so it reads the same on any column) + chip.
export const DUE_STYLE = {
  neutral: { card: 'bg-surface-card', chip: 'bg-stone-100 text-due-neutral' },
  safe: { card: 'bg-surface-card', chip: 'bg-due-safe/10 text-due-safe' },
  soon: { card: 'bg-[#FEF9F0]', chip: 'bg-due-warning/15 text-[#9a6b0a]' },
  warning: { card: 'bg-[#FCF1DA]', chip: 'bg-due-warning text-white' },
  overdue: { card: 'bg-[#FBECEC]', chip: 'bg-due-overdue text-white' },
};
