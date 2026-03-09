import type { Snippet } from '@/lib/api.types';

export interface SnippetListProps {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
  onPageChange: (page: number) => void;
}