import { useState } from 'react';
import { STAGES } from '../lib/constants.js';
import TaskCard from './TaskCard.jsx';

/** The four-column Kanban board (M4 data-model). */
export default function Board({ tasks, onOpen, onHandoff, onCopyPrompt, onMove }) {
  // M12: drag a card to another column; the status dropdown in the modal is the fallback.
  const [dragOver, setDragOver] = useState(null);

  return (
    <main className="grid grid-cols-4 gap-4">
      {STAGES.map((stage) => {
        const items = tasks.filter((t) => t.status === stage.id);
        return (
          <section
            key={stage.id}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(stage.id);
            }}
            onDragLeave={(e) => !e.currentTarget.contains(e.relatedTarget) && setDragOver(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(null);
              const id = e.dataTransfer.getData('text/task-id');
              if (id) onMove(id, stage.id);
            }}
            className={`flex min-h-[24rem] flex-col rounded-xl p-3 transition ${
              dragOver === stage.id
                ? 'bg-brand-accent/10 outline-dashed outline-2 outline-brand-accent'
                : 'bg-stone-200/50'
            }`}
          >
            <header className="mb-3 flex items-center justify-between px-1">
              <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-ink">
                {stage.label}
              </h2>
              <span className="font-mono text-xs text-ink-muted">{items.length}</span>
            </header>
            <div className="flex flex-1 flex-col gap-2">
              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onOpen={onOpen}
                  onHandoff={onHandoff}
                  onCopyPrompt={onCopyPrompt}
                />
              ))}
              {items.length === 0 && (
                <p className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-stone-300 p-4 text-center text-xs text-ink-muted">
                  Nothing here yet — keep going.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
