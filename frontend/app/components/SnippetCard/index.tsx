'use client'

import Link from 'next/link';

import { SnippetCardProps } from './types'

export default function SnippetCard({ snippet, onDelete, onTagClick }: SnippetCardProps) {
  return (
    <div className="border border-zinc-800 rounded p-4 hover:border-zinc-600 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/snippets/${snippet._id}`} className="font-bold text-zinc-100 hover:text-emerald-400 transition-colors">
          {snippet.title}
        </Link>
        <div className="flex gap-2 shrink-0">
          <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{snippet.type}</span>
          <button onClick={() => onDelete(snippet._id)} className="text-xs text-red-500 hover:text-red-400 transition-colors">delete</button>
        </div>
      </div>
      <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{snippet.content}</p>
      {snippet.tags.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {snippet.tags.map(t => (
            <button key={t} onClick={() => onTagClick(t)} className="text-xs text-emerald-600 hover:text-emerald-400">#{t}</button>
          ))}
        </div>
      )}
    </div>
  );
}