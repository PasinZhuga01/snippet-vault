import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';

import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

import { ParseObjectIdPipe } from '../pipes/parse-object-id.pipe'

@Controller('snippets')
export class SnippetsController {
  public constructor(private readonly _snippetsService: SnippetsService) {}

  @Post()
  public create(@Body() createSnippetDto: CreateSnippetDto) {
    return this._snippetsService.create(createSnippetDto);
  }

  @Get()
  public findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('q') q?: string,
    @Query('tag') tag?: string,
  ) {
    return this._snippetsService.findAll(+page, +limit, q, tag);
  }

  @Get(':id')
  public findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this._snippetsService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this._snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this._snippetsService.remove(id);
  }
}