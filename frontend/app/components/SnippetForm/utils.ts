import { SNIPPET_TYPES } from "@/lib/api.constants";
import { SnippetType } from "@/lib/api.types";

import { SnippetFormInvalidTypeError } from "./errors";

export function parseTags(value: string): string[]{
  return value.split(',').map(t => t.trim()).filter(Boolean);
}

export function parseType(value: string): SnippetType{
  const type = SNIPPET_TYPES.find(t => t === value);

  if (type === undefined){
    throw new SnippetFormInvalidTypeError(value);
  }

  return type;
}