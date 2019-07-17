import { Module } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { DatabaseModule } from '../database/database.module';
import { articlesProvider } from './articles.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ArticlesService, ...articlesProvider],
  controllers: [ArticlesController],
})
export class ArticlesModule {
}
