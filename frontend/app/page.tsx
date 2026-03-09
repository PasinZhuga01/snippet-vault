'use client';

import { useState, useEffect } from 'react';
import { getSnippets, deleteSnippet } from '@/lib/api';
import { Snippet } from '@/lib/api.types';
import { getApiErrorMessage, getDeleteSnippetApiErrorMessage } from '@/lib/api.utils';
import SnippetCreateForm from '@/app/components/SnippetCreateForm';
import SnippetList from '@/app/components/SnippetList';
import SnippetSearchBar from '@/app/components/SnippetSearchBar';

import { SNIPPETS_LIMIT } from './page.constants'

export default function HomePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(total / SNIPPETS_LIMIT);

  async function loadSnippets() {
    setLoading(true);
    setError(null);

    try {
      const res = await getSnippets(page, SNIPPETS_LIMIT, q || undefined, tag || undefined);
      setSnippets(res.data);
      setTotal(res.total);
    } catch (e) {
      setError(getApiErrorMessage(e));
    }

    setLoading(false);
  }

  useEffect(() => { loadSnippets(); }, [page, q, tag]);

  async function handleDelete(id: string) {
    try {
      await deleteSnippet(id);
      await loadSnippets();
    } catch (e) {
      setError(getDeleteSnippetApiErrorMessage(e));
    }
  }

  function handleTagClick(t: string) {
    setTag(t);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-xl font-bold tracking-widest text-emerald-400">SNIPPET VAULT</h1>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        <SnippetCreateForm onCreated={() => { setPage(1); loadSnippets(); }} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <SnippetSearchBar
            q={q}
            tag={tag}
            onQChange={v => { setQ(v); setPage(1); }}
            onTagChange={v => { setTag(v); setPage(1); }}
          />
          <SnippetList
            snippets={snippets}
            loading={loading}
            error={error}
            page={page}
            totalPages={totalPages}
            onDelete={handleDelete}
            onTagClick={handleTagClick}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}