import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ArticleDto } from './article.dto';
import { Article } from './article.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Article> {
    return this.service.find(id);
  }

  @Post()
  async create(@Body() dto: ArticleDto): Promise<Article> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ArticleDto): Promise<Article> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
