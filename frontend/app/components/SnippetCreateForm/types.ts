import type { SnippetType } from '@/lib/api.types';

export interface SnippetCreateFormProps {
  onCreated: () => void;
}

export interface SnippetCreateFormState {
  title: string;
  content: string;
  tags: string;
  type: SnippetType;
}