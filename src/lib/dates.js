// Small date helpers. All task dates are ISO 'YYYY-MM-DD' strings (PRD §5).

/** Today as 'YYYY-MM-DD' in the user's local time zone. */
export function todayISO() {
  return toISO(new Date());
}

/** A Date → 'YYYY-MM-DD' (local time). */
export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Today + n days as 'YYYY-MM-DD'. */
export function daysFromToday(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
}

/** 'YYYY-MM-DD' → a short human label like "Tue 20 Oct". */
export function formatShort(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/** A unique-enough id for localStorage tasks. */
export function newId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
