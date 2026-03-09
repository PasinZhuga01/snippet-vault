'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSnippet, deleteSnippet } from '@/lib/api';
import { ApiError } from '@/lib/api.errors';
import type { Snippet } from '@/lib/api.types';

import { PageProps } from './page.types'

export default function SnippetDetailPage({ params }: PageProps) {
  const { id } = React.use(params);

  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSnippet(id);
        setSnippet(data);
      } catch (e) {
        setError(e instanceof ApiError ? `Server error ${e.status}` : 'Network error or server is unavailable. Please check your connection or try again later');
      }
      setLoading(false);
    }

    load();
  }, [id]);

  async function handleDelete() {
    if (!snippet){
        return;
    }

    try {
      await deleteSnippet(snippet._id);
      router.push('/');
    } catch {
      setError('Failed to delete snippet. Please try again later');
    }
  }

  if (loading){
    return <div className="min-h-screen bg-zinc-950 text-zinc-500 font-mono p-8">Loading...</div>;
  }

  if (error){
    return <div className="min-h-screen bg-zinc-950 text-red-400 font-mono p-8">{error}</div>;
  }

  if (!snippet){
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      <header className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
          SNIPPET VAULT
        </Link>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet._id}/edit`} className="text-sm border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 px-3 py-1 rounded transition-colors">
            edit
          </Link>
          <button onClick={handleDelete} className="text-sm border border-red-900 text-red-500 hover:text-red-400 hover:border-red-700 px-3 py-1 rounded transition-colors">
            delete
          </button>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-2xl">

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 uppercase tracking-widest">
              {snippet.type}
            </span>
            <span className="text-xs text-zinc-600">
              created {new Date(snippet.createdAt).toLocaleDateString()}
            </span>
            <span className="text-xs text-zinc-600">
              updated {new Date(snippet.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-zinc-100 mb-4 leading-snug">
            {snippet.title}
          </h1>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 mb-6">
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap break-words leading-relaxed">
              {snippet.content}
            </pre>
          </div>

          {snippet.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {snippet.tags.map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-emerald-500">
                  #{t}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}