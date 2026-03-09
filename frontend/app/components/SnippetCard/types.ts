import type { Snippet } from '@/lib/api.types';

export interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}
