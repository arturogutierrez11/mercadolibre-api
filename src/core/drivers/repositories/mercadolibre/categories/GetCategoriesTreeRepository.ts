import { Inject, Injectable } from '@nestjs/common';
import type { IMeliHttpClient } from 'src/core/adapters/repositories/mercadolibre/http/IMeliHttpClient';
import { IGetCategoriesTreeRepository } from 'src/core/adapters/repositories/mercadolibre/categories/IGetCategoriesTreeRepository';
import { Category } from 'src/core/entitis/mercadolibre/categories/Category';

@Injectable()
export class GetCategoriesTreeRepository implements IGetCategoriesTreeRepository {
  constructor(
    @Inject('IMeliHttpClient')
    private readonly meliHttpClient: IMeliHttpClient,
  ) {}

  async getTree(): Promise<Category[]> {
    const roots = await this.meliHttpClient.get<any[]>('/sites/MLA/categories');

    if (!roots || !Array.isArray(roots)) {
      return [];
    }

    return Promise.all(roots.map((root) => this.getFullBranch(root.id)));
  }

  private async getFullBranch(categoryId: string): Promise<Category> {
    const category = await this.meliHttpClient.get<any>(
      `/categories/${categoryId}`,
    );

    if (!category) {
      throw new Error(`Category ${categoryId} not found`);
    }

    return this.mapCategory(category);
  }

  private mapCategory(category: any): Category {
    return {
      id: category.id,
      name: category.name,
      children: (category.children_categories ?? []).map((child: any) =>
        this.mapCategory(child),
      ),
    };
  }
}
