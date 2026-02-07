import { Inject, Injectable } from '@nestjs/common';
import type { IGetCategoriesTreeRepository } from 'src/core/adapters/repositories/mercadolibre/categories/IGetCategoriesTreeRepository';

@Injectable()
export class GetCategoriesTreeService {
  constructor(
    @Inject('IGetCategoriesTreeRepository')
    private readonly repo: IGetCategoriesTreeRepository,
  ) {}

  getTree() {
    return this.repo.getTree();
  }
}
