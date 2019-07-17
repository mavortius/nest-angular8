import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesProvider } from './articles.provider';

describe('Article', () => {
  let provider: ArticlesProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesProvider],
    }).compile();

    provider = module.get<ArticlesProvider>(ArticlesProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
