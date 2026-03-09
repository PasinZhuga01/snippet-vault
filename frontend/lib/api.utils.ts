import { ApiError } from './api.errors';

function formatApiErrorMessage(error: unknown, fallbackMessage: string): string{
  return error instanceof ApiError ? `Server error ${error.status}` : fallbackMessage;
}

export function getApiErrorMessage(error: unknown): string {
  return formatApiErrorMessage(error, 'Network error or server is unavailable. Please check your connection or try again later')
}

export function getDeleteSnippetApiErrorMessage(error: unknown): string {
  return formatApiErrorMessage(error, 'Failed to delete snippet. Please try again later')
}