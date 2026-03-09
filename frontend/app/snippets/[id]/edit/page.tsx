'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSnippet, updateSnippet } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api.utils';
import SnippetForm from '@/app/components/SnippetForm';
import type { SnippetFormData } from '@/app/components/SnippetForm/types';

import type { PageProps } from './page.types';

export default function SnippetEditPage({ params }: PageProps) {
  const { id } = React.use(params);
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<SnippetFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const snippet = await getSnippet(id);

        setInitialValues({
            title: snippet.title,
            content: snippet.content,
            tags: snippet.tags,
            type: snippet.type
        });
      } catch (e) {
        setError(getApiErrorMessage(e));
      }

      setLoading(false);
    }

    load();
  }, [id]);

  async function handleSubmit(data: SnippetFormData) {
    await updateSnippet(id, data);
    router.push(`/snippets/${id}`);
  }

  if (loading) {
    return <p className="p-8 text-zinc-500">Loading...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-400">{error}</p>;
  }

  if (!initialValues) {
    return null;
  }

  return (
    <div className="px-8 py-12">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold tracking-widest text-zinc-100">EDIT SNIPPET</h1>
          <Link href={`/snippets/${id}`} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← back</Link>
        </div>
        <SnippetForm
          initialValues={{ ...initialValues, tags: initialValues.tags.join(', ') }}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}