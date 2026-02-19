import { Inject, Injectable } from '@nestjs/common';
import type { IGetCategoriesTreeRepository } from 'src/core/adapters/repositories/mercadolibre/categories/IGetCategoriesTreeRepository';
import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

@Injectable()
export class GetCategoriesTreeService {
  constructor(
    @Inject('IGetCategoriesTreeRepository')
    private readonly repo: IGetCategoriesTreeRepository,
  ) {}

  // 🔹 Devuelve solo categorías padre (nivel 1)
  async getRootCategories(): Promise<{ id: string; name: string }[]> {
    return this.repo.getRootCategories();
  }

  // 🔹 Devuelve categoría completa por ID
  async getCategoryById(categoryId: string): Promise<Category> {
    if (!categoryId) {
      throw new Error('CategoryId is required');
    }

    return this.repo.getCategoryById(categoryId);
  }
}
