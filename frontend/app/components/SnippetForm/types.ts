import type { SnippetType } from '@/lib/api.types';

export interface SnippetFormState {
  title: string;
  content: string;
  tags: string;
  type: SnippetType;
}

export interface SnippetFormData {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export interface SnippetFormProps {
  shouldResetOnSubmit?: boolean;
  initialValues?: SnippetFormState;
  onSubmit: (data: SnippetFormData) => Promise<void>;
  submitLabel: string;
}