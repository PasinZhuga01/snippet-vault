'use client';

import { useState } from 'react';
import { SNIPPET_TYPES } from '@/lib/api.constants';
import { getApiErrorMessage } from '@/lib/api.utils';

import { DEFAULT_VALUES } from './constants';
import {parseTags, parseType} from './utils'
import type { SnippetFormProps, SnippetFormData } from './types';

export default function SnippetForm({ shouldResetOnSubmit, initialValues, onSubmit, submitLabel }: SnippetFormProps) {
  const [form, setForm] = useState(initialValues ?? DEFAULT_VALUES);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()){
        return setError('Title must not be empty');
    }

    if (!form.content.trim()){
        return setError('Content must not be empty');
    }

    const data: SnippetFormData = { ...form, tags: parseTags(form.tags)};

    setSubmitting(true);

    try {
      await onSubmit(data);

      if (shouldResetOnSubmit){
        setForm(DEFAULT_VALUES);
      }
    } catch (e) {
      setError(getApiErrorMessage(e));
    }

    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
      />
      <textarea
        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 resize-none h-28"
        placeholder="Content"
        value={form.content}
        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
      />
      <input
        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
      />
      <select
        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
        value={form.type}
        onChange={e => setForm(f => ({ ...f, type: parseType(e.target.value) }))}
      >
        {SNIPPET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded px-4 py-2 text-sm font-bold transition-colors"
      >
        {submitting ? 'Loading...' : submitLabel}
      </button>
    </form>
  );
}