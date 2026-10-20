// M10 copy-prompt: serialise a task + its context into a paste-ready Markdown prompt.
import { STAGES } from './constants.js';
import { formatShort } from './dates.js';
import { dueLabel } from './due.js';

const stageLabel = (id) => STAGES.find((s) => s.id === id)?.label ?? id;

/** Build the Markdown block that goes on the clipboard. */
export function toPromptMarkdown(task) {
  const lines = [];
  lines.push(`# Task: ${task.title || 'Untitled task'}`);
  lines.push('');
  lines.push(`- **Type:** ${task.type}`);
  lines.push(`- **Status:** ${stageLabel(task.status)}`);
  lines.push(`- **Owner:** ${task.assignee}`);
  if (task.dueDate) lines.push(`- **Due:** ${formatShort(task.dueDate)} (${dueLabel(task)})`);
  if (task.contextTool) lines.push(`- **Last worked on in:** ${task.contextTool}`);
  lines.push('');

  if (task.description?.trim()) {
    lines.push('## Description');
    lines.push(task.description.trim());
    lines.push('');
  }

  lines.push('## Context so far');
  lines.push(task.context?.trim() || '_No context written yet._');
  if (task.contextUpdatedAt) {
    lines.push('');
    lines.push(`_Context last updated ${new Date(task.contextUpdatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}._`);
  }
  lines.push('');

  lines.push('## What I need from you');
  lines.push(
    task.type === 'bug'
      ? 'Help me find the root cause of this bug and propose the smallest fix. Ask me for the relevant code if you need it.'
      : 'Help me continue this task from where the context leaves off. Suggest the next concrete step first, then the code.'
  );
  lines.push('');
  lines.push('_Project: Vibecoding Project Tracker — React + Vite + Tailwind, state in localStorage._');
  return lines.join('\n');
}

/** Copy text to the clipboard, with a fallback for non-secure contexts. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }
}
