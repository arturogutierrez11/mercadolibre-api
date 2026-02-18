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

    const branches = await Promise.all(
      roots.map((root) =>
        this.meliHttpClient.get<any>(`/categories/${root.id}`),
      ),
    );

    return branches.map((branch) => this.mapCategory(branch));
  }

  async getBranchById(categoryId: string): Promise<Category> {
    return this.getFullBranch(categoryId);
  }

  private async getFullBranch(categoryId: string): Promise<Category> {
    const category = await this.meliHttpClient.get<any>(
      `/categories/${categoryId}`,
    );

    if (!category) {
      throw new Error(`Category ${categoryId} not found`);
    }

    const children: Category[] = [];

    for (const child of category.children_categories ?? []) {
      const fullChild = await this.getFullBranch(child.id);
      children.push(fullChild);
    }

    return {
      id: category.id,
      name: category.name,
      hasChildren: (category.children_categories ?? []).length > 0,
      children,
    };
  }

  private mapCategory(category: any): Category {
    const children = (category.children_categories ?? []).map((child: any) =>
      this.mapCategory(child),
    );

    return {
      id: category.id,
      name: category.name,
      hasChildren: children.length > 0,
      children,
    };
  }
}
