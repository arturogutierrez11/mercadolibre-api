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

  // 🔥 Nivel 1 + Nivel 2
  async getTree(): Promise<Category[]> {
    const roots = await this.meliHttpClient.get<any[]>('/sites/MLA/categories');

    if (!roots) return [];

    const result: Category[] = [];

    for (const root of roots) {
      const rootData = await this.meliHttpClient.get<any>(
        `/categories/${root.id}`,
      );

      const level2Children =
        rootData.children_categories?.map((child: any) => ({
          id: child.id,
          name: child.name,
          hasChildren: true,
          children: [], // 🔥 dejamos vacío
        })) ?? [];

      result.push({
        id: rootData.id,
        name: rootData.name,
        hasChildren: level2Children.length > 0,
        children: level2Children,
      });
    }

    return result;
  }

  // 🔥 Solo baja profundo desde nivel 2
  async getBranchById(categoryId: string): Promise<Category> {
    return this.buildDeepBranch(categoryId);
  }

  private async buildDeepBranch(categoryId: string): Promise<Category> {
    const category = await this.meliHttpClient.get<any>(
      `/categories/${categoryId}`,
    );

    if (!category) {
      throw new Error(`Category ${categoryId} not found`);
    }

    const children: Category[] = [];

    for (const child of category.children_categories ?? []) {
      const fullChild = await this.buildDeepBranch(child.id);
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
