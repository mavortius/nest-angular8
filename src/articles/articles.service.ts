import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Article } from './article.interface';
import { ArticleDto } from './article.dto';

@Injectable()
export class ArticlesService {
  constructor(@Inject('ARTICLE_MODEL') private readonly model: Model<Article>) {
  }

  async create(dto: ArticleDto): Promise<Article> {
    const createdArticle = new this.model(dto);
    return await createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return await this.model.find().exec();
  }

  async find(id: string): Promise<Article> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, dto: ArticleDto): Promise<Article> {
    return await this.model.findByIdAndUpdate(id, dto);
  }

  async delete(id): Promise<void> {
    await this.model.findOneAndRemove(id);
  }
}
