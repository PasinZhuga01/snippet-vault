import { IsString, IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import type { SnippetType } from '../snippets.types';

export class UpdateSnippetDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(['link', 'note', 'command'])
  type?: SnippetType;
}