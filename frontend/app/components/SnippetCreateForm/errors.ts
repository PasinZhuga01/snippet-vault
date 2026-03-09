export class SnippetCreateFormInvalidTypeError extends Error {
  constructor(type: string) {
    super(`Invalid type "${type}"`);
    this.name = 'SnippetCreateFormInvalidTypeError';
  }
}