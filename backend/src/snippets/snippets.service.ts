import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Snippet, SnippetDocument } from './snippets.schema';
import type {SnippetFindAllQuery} from './snippets.types'

import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  public constructor(@InjectModel(Snippet.name) private readonly _snippetModel: Model<SnippetDocument>) {}

  public async create(createSnippetDto: CreateSnippetDto): Promise<SnippetDocument> {
    return (new this._snippetModel(createSnippetDto)).save();
  }

  public async findAll(page: number, limit: number, q?: string, tag?: string): Promise<{ data: SnippetDocument[], total: number }> {
    const query: SnippetFindAllQuery = {};

    if (q){
      query.$text = { $search: q };
    }

    if (tag){
      query.tags = tag;
    }

    const [data, total] = await Promise.all([
      this._snippetModel.find(query).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }).exec(),
      this._snippetModel.countDocuments(query)
    ]);

    return { data, total };
  }

  public async findOne(id: string): Promise<SnippetDocument> {
    const snippet = await this._snippetModel.findById(id).exec();

    if (!snippet){
      throw new NotFoundException(`Snippet with id "${id}" is not found`);
    }

    return snippet;
  }

  public async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<SnippetDocument> {
    const snippet = await this._snippetModel.findByIdAndUpdate(id, updateSnippetDto, { returnDocument: 'after' }).exec();

    if (!snippet){
      throw new NotFoundException(`Snippet with id "${id}" is not found`);
    }
    
    return snippet;
  }

  public async remove(id: string): Promise<void> {
    const result = await this._snippetModel.findByIdAndDelete(id).exec();

    if (!result){
      throw new NotFoundException(`Snippet with id "${id}" is not found`);
    }
  }
}