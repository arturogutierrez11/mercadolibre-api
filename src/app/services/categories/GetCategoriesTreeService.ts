import { Inject, Injectable } from '@nestjs/common';
import type { IGetCategoriesTreeRepository } from 'src/core/adapters/repositories/mercadolibre/categories/IGetCategoriesTreeRepository';
import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

@Injectable()
export class GetCategoriesTreeService {
  constructor(
    @Inject('IGetCategoriesTreeRepository')
    private readonly repo: IGetCategoriesTreeRepository,
  ) {}

  getTree(): Promise<Category[]> {
    return this.repo.getTree();
  }

  getBranchById(categoryId: string): Promise<Category> {
    return this.repo.getBranchById(categoryId);
  }
}
