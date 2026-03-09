'use client'

import SnippetCard from '@/app/components/SnippetCard';

import type { SnippetListProps } from './types';

export default function SnippetList({ snippets, loading, error, page, totalPages, onDelete, onTagClick, onPageChange }: SnippetListProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        {loading && <p className="text-zinc-500 text-sm">Loading...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && !error && snippets.length === 0 && (
          <p className="text-zinc-500 text-sm">No snippets found.</p>
        )}
        <div className="flex flex-col gap-3">
          {snippets.map(snippet => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onDelete={onDelete}
              onTagClick={onTagClick}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 p-4 border-t border-zinc-800">
          <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="text-sm text-zinc-400 hover:text-zinc-100 disabled:opacity-30">← prev</button>
          <span className="text-sm text-zinc-500">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="text-sm text-zinc-400 hover:text-zinc-100 disabled:opacity-30">next →</button>
        </div>
      )}
    </div>
  );
}