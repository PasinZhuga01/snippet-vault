import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Snippet, SnippetSchema } from './snippets.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }])],
  controllers: [SnippetsController],
  providers: [SnippetsService]
})
export class SnippetsModule {}
