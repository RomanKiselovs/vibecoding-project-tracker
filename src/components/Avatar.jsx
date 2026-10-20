import { TEAM } from '../lib/constants.js';

// One stable colour per teammate (from the brand palette, not the type colours).
const PALETTE = ['bg-brand-primary', 'bg-brand-accent', 'bg-stone-500'];

export function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? '')).toUpperCase();
}

/** Small round assignee badge (M7 task-owner). */
export default function Avatar({ name, size = 'sm' }) {
  const idx = Math.max(0, TEAM.indexOf(name));
  const dims = size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs';
  return (
    <span
      title={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-mono font-semibold text-white ${dims} ${PALETTE[idx % PALETTE.length]}`}
    >
      {initials(name)}
    </span>
  );
}
