import { ApiError } from './api.errors';
import { Snippet, SnippetListResponse } from './api.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL){
    throw new Error('NEXT_PUBLIC_API_URL is not defined. Check .env file');
}

export async function getSnippets(page: number = 1, limit: number = 10, q?: string, tag?: string): Promise<SnippetListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });

  if (q){
    params.set('q', q);
  }

  if (tag){
    params.set('tag', tag);
  }

  const res = await fetch(`${API_URL}/snippets?${params}`);

  if (!res.ok){
    throw new ApiError(res.status, 'Failed to fetch snippets');
  }

  return res.json();
}

export async function getSnippet(id: string): Promise<Snippet> {
  const res = await fetch(`${API_URL}/snippets/${id}`);

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to fetch snippet');
  }

  return res.json();
}

export async function createSnippet(data: Omit<Snippet, '_id' | 'createdAt' | 'updatedAt'>): Promise<Snippet> {
  const res = await fetch(`${API_URL}/snippets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to create snippet');
  }

  return res.json();
}

export async function updateSnippet(id: string, data: Partial<Omit<Snippet, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Snippet> {
  const res = await fetch(`${API_URL}/snippets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to update snippet');
  }

  return res.json();
}

export async function deleteSnippet(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/snippets/${id}`, { method: 'DELETE' });

  if (!res.ok){
    throw new ApiError(res.status, 'Failed to delete snippet');
  }
}