'use client'

import type { SearchBarProps } from './types';

export default function SearchBar({ q, tag, onQChange, onTagChange }: SearchBarProps) {
  return (
    <div className="flex gap-3 p-4 border-b border-zinc-800">
      <input
        className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
        placeholder="Search..."
        value={q}
        onChange={e => onQChange(e.target.value)}
      />
      <input
        className="w-36 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
        placeholder="Filter by tag"
        value={tag}
        onChange={e => onTagChange(e.target.value)}
      />
    </div>
  );
}