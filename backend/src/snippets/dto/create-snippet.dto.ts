import { IsString, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import type { SnippetType } from '../snippets.types';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsEnum(['link', 'note', 'command'])
  type: SnippetType;
}