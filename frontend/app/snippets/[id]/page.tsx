'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSnippet, deleteSnippet } from '@/lib/api';
import { getApiErrorMessage, getDeleteSnippetApiErrorMessage } from '@/lib/api.utils';
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
        setError(getApiErrorMessage(e));
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
    } catch (e) {
      setError(getDeleteSnippetApiErrorMessage(e));
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

        <div className="flex gap-3 mb-6">
          <Link href={`/snippets/${snippet._id}/edit`} className="text-sm border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 px-3 py-1 rounded transition-colors">
            edit
          </Link>
          <button onClick={handleDelete} className="text-sm border border-red-900 text-red-500 hover:text-red-400 hover:border-red-700 px-3 py-1 rounded transition-colors">
            delete
          </button>
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
  );
}