export type SnippetType = 'link' | 'note' | 'command';

export interface SnippetFindAllQuery {
  $text?: { $search: string };
  tags?: string;
}