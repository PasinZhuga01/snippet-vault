'use client';

import { useState } from 'react';
import { createSnippet } from '@/lib/api';
import { ApiError } from '@/lib/api.errors';
import { SnippetType } from '@/lib/api.types';
import { SNIPPET_TYPES } from '@/lib/api.constants'

import type { SnippetCreateFormProps, SnippetCreateFormState } from './types';
import { SnippetCreateFormInvalidTypeError } from './errors';

export default function SnippetCreateForm({ onCreated }: SnippetCreateFormProps) {
  const [form, setForm] = useState<SnippetCreateFormState>({ title: '', content: '', tags: '', type: 'note' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function parseTags(value: string): string[]{
    return value.split(',').map(t => t.trim()).filter(Boolean);
  }

  function parseType(value: string): SnippetType{
    const type = SNIPPET_TYPES.find(t => t === value);

    if (type === undefined){
      throw new SnippetCreateFormInvalidTypeError(value);
    }

    return type;
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()){
      return setError('Title must not be empty');
    }
    else if (!form.content.trim()){
      return setError('Content must not be empty');
    }

    setSubmitting(true);

    try {
      await createSnippet({...form, tags: parseTags(form.tags) });
      setForm({ title: '', content: '', tags: '', type: 'note' });
      onCreated();
    } catch (e) {
      setError(e instanceof ApiError ? `Server error ${e.status}` : 'Network error or server is unavailable. Please check your connection or try again later');
    }

    setSubmitting(false);
  }

  return (
    <aside className="w-80 border-r border-zinc-800 p-5 flex flex-col gap-4 overflow-y-auto">
      <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">New Snippet</h2>
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
          {submitting ? 'Creating...' : '+ Create'}
        </button>
      </form>
    </aside>
  );
}