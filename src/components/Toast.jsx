import { useCallback, useRef, useState } from 'react';

/** Minimal toast state: one message at a time, auto-hides. */
export function useToast(duration = 2600) {
  const [toast, setToast] = useState(null);
  const timer = useRef();
  const show = useCallback(
    (message, tone = 'default') => {
      clearTimeout(timer.current);
      setToast({ message, tone, key: Date.now() });
      timer.current = setTimeout(() => setToast(null), duration);
    },
    [duration]
  );
  return [toast, show];
}

/** Bottom-centre toast with a 200 ms fade (DESIGN.md §7). */
export default function Toast({ toast }) {
  if (!toast) return null;
  const tone =
    toast.tone === 'accent' ? 'border-brand-accent' : 'border-brand-primary';
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center" role="status">
      <div
        key={toast.key}
        className={`animate-fadein rounded-lg border-l-4 ${tone} bg-brand-primary px-4 py-3 text-sm text-white shadow-xl`}
      >
        {toast.message}
      </div>
    </div>
  );
}
