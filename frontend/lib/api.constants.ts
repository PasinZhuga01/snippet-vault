import { SnippetType } from "./api.types";

export const SNIPPET_TYPES = ['link', 'note', 'command'] as const satisfies SnippetType[];