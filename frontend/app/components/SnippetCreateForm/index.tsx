'use client';

import { createSnippet } from '@/lib/api';
import SnippetForm from '@/app/components/SnippetForm';
import type { SnippetFormData } from '@/app/components/SnippetForm/types';

import type { SnippetCreateFormProps } from './types';

export default function SnippetCreateForm({ onCreated }: SnippetCreateFormProps) {
  async function handleSubmit(data: SnippetFormData) {
    await createSnippet(data);
    onCreated();
  }

  return (
    <aside className="w-80 border-r border-zinc-800 p-5 flex flex-col gap-4 overflow-y-auto">
      <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">New Snippet</h2>
      <SnippetForm onSubmit={handleSubmit} shouldResetOnSubmit submitLabel="+ Create" />
    </aside>
  );
}