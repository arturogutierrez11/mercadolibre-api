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

    if (!roots) return [];

    return roots.map((r) => ({
      id: r.id,
      name: r.name,
      hasChildren: true,
      children: [],
    }));
  }

  async getBranchById(categoryId: string): Promise<Category> {
    return this.buildFullBranch(categoryId);
  }

  private async buildFullBranch(categoryId: string): Promise<Category> {
    const category = await this.meliHttpClient.get<any>(
      `/categories/${categoryId}`,
    );

    if (!category) {
      throw new Error(`Category ${categoryId} not found`);
    }

    const children: Category[] = [];

    for (const child of category.children_categories ?? []) {
      const fullChild = await this.buildFullBranch(child.id);
      children.push(fullChild);
    }

    return {
      id: category.id,
      name: category.name,
      hasChildren: children.length > 0,
      children,
    };
  }
}
