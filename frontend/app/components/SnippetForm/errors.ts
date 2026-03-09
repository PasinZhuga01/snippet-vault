export class SnippetFormInvalidTypeError extends Error {
  constructor(type: string) {
    super(`Invalid snippet type "${type}"`);
    this.name = 'SnippetFormInvalidTypeError';
  }
}